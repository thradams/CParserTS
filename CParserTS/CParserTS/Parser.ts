
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

function MatchAndSkip(parser: Parser): boolean
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


function IsToken(parser: Parser, tk: Tokens): boolean
{
    return PrScanner_IsToken(parser.scanner, tk);
}

function Next(parser: Parser): boolean
{
    return PrScanner_Next(parser.scanner);
}

function ParseTypeAndVarOpt(parser: Parser)
{
    //o output tem que ser um json

    //verifica se tem uma informacao
    //de storage
    //em parametros de funcao nao tem isso
    if (IsToken(parser, Tokens.STATIC))
    {
        //ok anota
        MatchAndSkip(parser);
    }

    //verifica modificador no inicio
    if (IsToken(parser, Tokens.CONST))
    {
        //ok anota
        MatchAndSkip(parser);
    }

    if (IsToken(parser, Tokens.STRUCT) ||
        IsToken(parser, Tokens.UNION))
    {
    }
    else if (IsToken(parser, Tokens.ENUM))
    {
    }
    else if (IsToken(parser, Tokens.INT)) //etc
    {
    }
    else if (IsToken(parser, Tokens.VOID)) //etc
    {
    }

    //verifica modificadores depois do tipo
    if (IsToken(parser, Tokens.ASTERISK))
    {
        //anota
        MatchAndSkip(parser);
        //TODO tem mais ponteiror?
    }

    
    if (IsToken(parser, Tokens.SEMICOLON))
    {
        MatchAndSkip(parser);
        
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

function Parser_Start(parser: Parser)
{
    while (Next(parser))
    {
        //https://www.lysator.liu.se/c/ANSI-C-grammar-y.html#declarator
        ParseTypeAndVarOpt(parser);

        WriteLine(JSON.stringify(PrScanner_Lexeme(parser.scanner)));
    }
}
