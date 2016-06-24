
function Parse_Storage_SpecifierOpt(ctx: Parser): Result
{
    var result = RESULT_OK;
    var token = Token(ctx);
    switch (token)
    {
        case Tokens.TK_typedef:
        case Tokens.TK_extern:
        case Tokens.TK_static:
        case Tokens.TK__Thread_local:
        case Tokens.TK_auto:
        case Tokens.TK_register:
            result = Match(ctx);
            break;
        default:
            result = RESULT_EMPTY;
    }

    return result;
}


function Parse_Type(ctx: Parser): Result
{
    var result = RESULT_OK;

    for (; ;)
    {
        var token = Token(ctx);
        switch (token)
        {
            case Tokens.TK_const:
            case Tokens.TK_restrict:
            case Tokens.TK_volatile:
            case Tokens.TK__Atomic:
                result = Match(ctx);
                break;

            case Tokens.TK_void:
            case Tokens.TK_short:
            case Tokens.TK_int:
            case Tokens.TK_long:
            case Tokens.TK_float:
            case Tokens.TK_signed:
            case Tokens.TK_unsigned:
            case Tokens.TK__Bool:
            case Tokens.TK__Complex:
                result = Match(ctx);
                break;

            case Tokens.TK_struct:
            case Tokens.TK_union:
                break;



            case Tokens.TK_ASTERISK:
                //tem que ter um tipo antes pelo menos
                //nao pode ser o primeiro a aparecer
                result = Match(ctx);
                break;

            case Tokens.TK_enum:
                break;


            case Tokens.TK_LEFT_PARENTHESIS:
                //aqui eh um tipo + uma variavel
                //void (*f)(int) = NULL;
                //     ^
                result = RESULT_EMPTY;
                break;
            case Tokens.TK_identifier:
                //Vamos ver se e um tipo
                //Se nao for entao eh o idenficador apos o tipo

                //unknown type name 'coisa'
                result = RESULT_EMPTY
                break;

            default:
                //que isso?
                result = RESULT_FAIL;
        }

        if (result == RESULT_EMPTY ||
            result == RESULT_FAIL)
        {
            break;
        }
    }

    return result;
}

function Parse_FunctionArguments(ctx: Parser): Result
{

    var result = RESULT_OK;
    var token = Token(ctx);
    if (token == Tokens.TK_LEFT_PARENTHESIS)
    {
        Match(ctx);

        token = Token(ctx);
        if (token == Tokens.TK_RIGHT_PARENTHESIS)
        {
            //sem nenhum argumento
        }

        for (; ;)
        {
            result = Parse_Type(ctx)
            if (Failed(result))
                break;

            token = Token(ctx);

            if (token == Tokens.TK_identifier)
            {
                //Este eh o nome do argumento
                result = Match(ctx);
                token = Token(ctx);
            }
            else if (token == Tokens.TK_LEFT_PARENTHESIS)
            {
                //int (*F)
                //    ^ 
                //fica ate aqui so com o tipo de retorno
                result = RESULT_EMPTY;
            }
            else
            {
                //erro
                break;
            }

            if (token == Tokens.TK_RIGHT_PARENTHESIS)
            {
                break;
            }
            else if (token == Tokens.TK_COMMA)
            {
                result = Match(ctx);
            }
            else
            {
                //unexpected
                result = RESULT_FAIL;
            }

            if (Failed(result))
                break;
        }
    }
    else
    {
        //ops!
        result = RESULT_FAIL;
    }

    return result;
}


function Parse_Declaration(ctx: Parser): Result
{
    var result = RESULT_OK;
    var token = Token(ctx);

    //{typedef, extern, static, __Thread_local, auto, register}     inline?
    result = Parse_Storage_SpecifierOpt(ctx);

    if (Check(result))
    {
        //const int, char*, unsigned int**, ...
        result = Parse_Type(ctx);
        if (Check(result))
        {
            token = Token(ctx);
            if (token == Tokens.TK_identifier)
            {
                //int var_or_func
                result = Match(ctx);
                if (Check(result))
                {
                    token = Token(ctx);
                    if (token == Tokens.TK_LEFT_PARENTHESIS)
                    {
                        //int func(
                        //        ^
                        result = Parse_FunctionArguments(ctx);
                        if (Check(result))
                        {
                            Match(ctx);// )
                            token = Token(ctx);
                            if (token == Tokens.TK_SEMICOLON)
                            {
                                //terminou a declaracao da funcao
                                Match(ctx);
                            }
                            else if (token == Tokens.TK_LEFT_CURLY_BRACKET)
                            {
                                //comeca o corpo da funcao
                                ASSERT(false); //TODO
                            }
                            else
                            {
                                //ops!
                                result = RESULT_FAIL;
                            }
                        }
                    }
                    else if (token == Tokens.TK_SEMICOLON)
                    {
                        //int var;                      
                        result = Match(ctx);
                        token = Token(ctx);
                    }
                    else if (token == Tokens.TK_EQUALS_SIGN)
                    {
                        //int var =                       
                        result = Match(ctx);
                        token = Token(ctx);
                    }
                    else if (token == Tokens.TK_LEFT_SQUARE_BRACKET)
                    {
                        //int var[
                        result = Match(ctx);
                        token = Token(ctx);
                    }
                    else
                    {
                        //oops 
                        result = RESULT_FAIL;
                    }
                }

            }
            else if (token == Tokens.TK_LEFT_PARENTHESIS)
            {
                result = Match(ctx);
                //int (*F) ()
                //     ^ 
                if (Check(result)) result = MatchToken(ctx, Tokens.TK_ASTERISK);
                if (Check(result)) result = MatchToken(ctx, Tokens.TK_identifier);
                if (Check(result)) result = MatchToken(ctx, Tokens.TK_RIGHT_PARENTHESIS);
                //if (Check(result)) result = MatchToken(ctx, Tokens.TK_LEFT_PARENTHESIS);
                if (Check(result)) result = Parse_FunctionArguments(ctx);
                if (Check(result)) result = MatchToken(ctx, Tokens.TK_RIGHT_PARENTHESIS);
            }
            else
            {
                //oops
                result = RESULT_FAIL;
            }
        }
    }
    else
    {
        //oops
        result = RESULT_FAIL;
    }

    return result;
}

function Parse_Declarations(ctx: Parser): Result
{
    var result = RESULT_OK;
    for (; ;)
    {
        result = Parse_Declaration(ctx);
        if (Check(result))
        {
            if (Token(ctx) == Tokens.EOF)
                break;
        }
        else
        {
            break;
        }
    }
    return result;
}


function Main_Main(ctx: Parser): Result
{
    return Parse_Declarations(ctx);
}
