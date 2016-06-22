
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

type Result = number;
const RESULT_OK = 0;
const RESULT_EMPTY = 1;
const RESULT_FAIL = 2;
const RESULT_EOF = 3;

//function Check(result: Result): boolean
//{
    //return result == RESULT_OK || result == RESULT_EMPTY;
//}

function Match(parser: Parser, tk: Tokens): Result
{
    if (tk != parser.scanner.scanner.token)
    {
        return RESULT_FAIL;
    }

    var b = PrScanner_Next(parser.scanner);
    
   
    if (!b)
    {
        return RESULT_EOF;
    }
    return RESULT_OK;
}


function Lexeme(parser: Parser): const_char
{
    return PrScanner_Lexeme(parser.scanner);
}

function IsToken(parser: Parser, tk: Tokens): boolean
{
    return PrScanner_IsToken(parser.scanner, tk);
}

function Token(parser: Parser): Tokens
{
    return parser.scanner.scanner.token;
}

function Next(parser: Parser): boolean
{
    return PrScanner_Next(parser.scanner);
}
////////////////////////////////
