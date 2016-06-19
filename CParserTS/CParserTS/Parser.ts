
class Parser
{
    scanner: PrScanner = new PrScanner();
}

function Parser_Init(parser: Parser, text: const_char)
{
    PrScanner_Init(parser.scanner, text);
}

function Parser_Destroy(parser: Parser)
{
    PrScanner_Destroy(parser.scanner);
}

function ParseTypeModifierOpt(parser: Parser)
{
    //vai ficar aqui e recolher toda informacao
    if (PrScanner_IsToken(parser.scanner, Tokens.ASTERISK))
    {
        PrScanner_Next(parser.scanner);
    }
    else if (PrScanner_IsToken(parser.scanner, Tokens.CONST))
    {
        PrScanner_Next(parser.scanner);
    }
    //todo continuar vendo se eh ***
}

function Match(parser: Parser): boolean
{
    var b = PrScanner_Next(parser.scanner);
    while (PrScanner_IsToken2(parser.scanner,
        Tokens.SPACES,
        Tokens.BREAKLINE))
    {
        PrScanner_Next(parser.scanner);
    }
    return b;
}


function Lexeme(parser: Parser): const_char
{
    return PrScanner_Lexeme(parser.scanner);
}

function IsToken(parser: Parser, tk: Tokens): boolean
{
    return PrScanner_IsToken(parser.scanner, tk);
}

function Next(parser: Parser): boolean
{
    return PrScanner_Next(parser.scanner);
}


function ParseType(parser: Parser, jitem: JItem)
{
    //verifica modificador no inicio
    if (IsToken(parser, Tokens.CONST))
    {
        //ok anota
        Match(parser);
        JItem_SetString(jitem, "modifier", "const");
    }

    if (IsToken(parser, Tokens.STRUCT) ||
        IsToken(parser, Tokens.UNION))
    {
    }
    else if (IsToken(parser, Tokens.ENUM))
    {
    }
    else if (IsToken(parser, Tokens.INT) ||
        IsToken(parser, Tokens.VOID) ||
        IsToken(parser, Tokens.DOUBLE) ||
        IsToken(parser, Tokens.CHAR) ||
        IsToken(parser, Tokens.FLOAT) ||
        IsToken(parser, Tokens.UNSIGNED) ||
        IsToken(parser, Tokens.LONG)) //etc
    {
        JItem_SetString(jitem, "type", Lexeme(parser));
        Match(parser);
    }
  

    //verifica modificadores depois do tipo
    if (IsToken(parser, Tokens.ASTERISK))
    {
        var ptrs = new JItem();
        JItem_Init(ptrs, Jtype.Array);

        while (IsToken(parser, Tokens.ASTERISK))
        {
            //anota
            Match(parser);

            //modificador do ponteiro
            if (IsToken(parser, Tokens.CONST))
            {
                //ok anota
                Match(parser);
                JItem_PushString(ptrs, "const");
            }
            else
            {
                JItem_PushString(ptrs, "*");
            }
        }

        JItem_SetJItem(jitem, "ptrs", ptrs);
        JItem_Destroy(ptrs);
    }


    if (IsToken(parser, Tokens.SEMICOLON))
    {
        Match(parser);
        
        //terminou a declaracao do tipo sem variavel
        //pode ser declaracao de struct, enum uinon
    }
    else if (IsToken(parser, Tokens.IDENTIFIER))
    {
        //aqui vem nome da variavel 1que eh funcao ou variavel
        //anota
        
    }
    
    //vai sair daqui com o tipo, os modificadores 
    // o nome da variavel ou funcao sai opcional
}

function ParseTypeAndVarOpt(parser: Parser, jitem: JItem)
{
    //o output tem que ser um json
    if (IsToken(parser, Tokens.INT) ||
        IsToken(parser, Tokens.STATIC) ||
        IsToken(parser, Tokens.VOID) ||
        IsToken(parser, Tokens.CONST))
    {
       
        //verifica se tem uma informacao
        //de storage
        //em parametros de funcao nao tem isso
        if (IsToken(parser, Tokens.STATIC))
        {
            //ok anota
            Match(parser);
            JItem_SetString(jitem, "storage_modifier", "static");
        }
        ParseType(parser, jitem);
        return true;
    }
    return false;
}

function ParseFunctionDeclarationArgs(parser: Parser, arguments: JItem)
{
    //
    while (!IsToken(parser, Tokens.RIGHT_PARENTHESIS))
    {
        var jargument = new JItem();
        JItem_Init(jargument, Jtype.Object);


        var jtype = new JItem();
        JItem_Init(jtype, Jtype.Object);
        ParseType(parser, jtype);

        JItem_SetJItem(jargument, "type", jtype);
        JItem_Destroy(jtype);

        if (IsToken(parser, Tokens.IDENTIFIER))
        {
            JItem_SetString(jargument, "name", Lexeme(parser));
            //nome do parametro
            Match(parser);
        }

        JItem_PushJ(arguments, jargument);

        JItem_Destroy(jargument);
        if (IsToken(parser, Tokens.COMMA))
        {
            Match(parser);
        }
        else if (IsToken(parser, Tokens.RIGHT_PARENTHESIS))
        {
            Match(parser);
            break;
        }
        else
        {
            //oops
            break;
        }
    }

}

function ParseBlock(parser: Parser)
{
    for (; ;)
    {
        if (IsToken(parser, Tokens.LEFT_CURLY_BRACKET))
        {
            Match(parser);
            ParseBlock(parser);
        }
        else if (IsToken(parser, Tokens.RIGHT_CURLY_BRACKET))
        {
            Match(parser);
            break;
        }
        else if (IsToken(parser, Tokens.EOF))
        {
            //ops
            break;
        }
        Match(parser);
    }


}
function Parser_Start(parser: Parser)
{
    var symbols = new JItem();
    JItem_Init(symbols, Jtype.Array);

    var jitem = new JItem();
    JItem_Init(jitem, Jtype.Object);

    while (Next(parser))
    {
        //https://www.lysator.liu.se/c/ANSI-C-grammar-y.html#declarator
        if (ParseTypeAndVarOpt(parser, jitem))
        {
            var jitem2 = new JItem();
            JItem_Init(jitem2, Jtype.Object);

        

            //fez o parser de um tipo que esta em jitem
            if (IsToken(parser, Tokens.IDENTIFIER))
            {
                //nome da variavel
                JItem_SetString(jitem2, "name", Lexeme(parser));
                Match(parser);

                if (IsToken(parser, Tokens.SEMICOLON))
                {
                    JItem_SetString(jitem2, "type", "variable");
                    JItem_SetJItem(jitem2, "vartype", jitem);
                    //terminou a declaracao da variavel

                    //Vai para um mapa de funcoes
                    JItem_PushJ(symbols, jitem2);


                    Match(parser);
                }
                else if (IsToken(parser, Tokens.LEFT_PARENTHESIS))
                {
                    JItem_SetString(jitem2, "type", "function");
                    JItem_SetJItem(jitem2, "return", jitem);

                    //comecou a funcao
                    Match(parser);
                    var arguments = new JItem();
                    JItem_Init(arguments, Jtype.Array);
                    ParseFunctionDeclarationArgs(parser, arguments);
                    //JItem_SetJItem(jitem, "return"

                    JItem_SetJItem(jitem2, "arguments", arguments);
                    JItem_Destroy(arguments);
                    
                    //Vai para um mapa de funcoes
                    JItem_PushJ(symbols, jitem2);

                    if (IsToken(parser, Tokens.SEMICOLON))
                    {
                        //apenas declaracao da funcao
                        Match(parser);
                    }
                    else if (IsToken(parser, Tokens.LEFT_CURLY_BRACKET))
                    {
                        //comeca implementacao
                        Match(parser);
                        ParseBlock(parser);
                    }
                }
            }

            JItem_Destroy(jitem2);
        }

        WriteLine(JSON.stringify(PrScanner_Lexeme(parser.scanner)));
    }

    JItem_Destroy(jitem);
    JItem_Destroy(symbols);
}
