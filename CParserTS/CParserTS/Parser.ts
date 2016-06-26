
class Parser
{
    scanner: PrScanner = new PrScanner();
    debug_string: string;
    bError = false;
    ErrorMessage: StrBuilder = new StrBuilder();
}

function Parser_Init(parser: Parser, text: const_char)
{
    PrScanner_Init(parser.scanner, text);
    parser.bError = false;
    StrBuilder_Init(parser.ErrorMessage);
}

function Parser_Destroy(parser: Parser)
{
    PrScanner_Destroy(parser.scanner);
    StrBuilder_Destroy(parser.ErrorMessage);
}

type Result = number;
const RESULT_OK = 0;
const RESULT_EMPTY = 1;
const RESULT_FAIL = 2;
const RESULT_EOF = 3;

function Check(result: Result): boolean
{
    return result == RESULT_OK || result == RESULT_EMPTY;
}

function Failed(result: Result): boolean
{
    return result != RESULT_OK && result != RESULT_EMPTY;
}

function Match(parser: Parser): Result
{
    if (parser.bError)
        return RESULT_FAIL;

    var b = Next(parser);

    if (!b)
    {
        return RESULT_EOF;
    }

    return RESULT_OK;
}

function MatchAndGet(parser: Parser, scannerItem: ScannerItem): Result
{
    if (parser.bError)
        return RESULT_FAIL;

    ScannerItem_Swap(parser.scanner.scanner.currentItem, scannerItem);
    
    var b = Next(parser);

    if (!b)
    {
        return RESULT_EOF;
    }

    return RESULT_OK;
}

function MatchAndPush(parser: Parser, stack: ScannerItemStack): Result
{
    var item = new ScannerItem();
    ScannerItem_Init(item);
    var result = MatchAndGet(parser, item);
    ScannerItemStack_PushMove(stack, item);
    ScannerItem_Destroy(item);
    return result;    
}

function MatchToken(parser: Parser, tk: Tokens): Result
{
    if (parser.bError)
    {
        //nao acumula
        return RESULT_FAIL;
    }

    if (tk != parser.scanner.scanner.currentItem.token)
    {
        parser.bError = true;
        SetError(parser, "Unexpected token");
        return RESULT_FAIL;
    }

    var b = Next(parser);
        
    if (!b)
    {
        return RESULT_EOF;
    }
    return RESULT_OK;
}

function SetError(parser: Parser, message: const_char)
{
    if (!parser.bError)
    {
        parser.bError = true;
        StrBuilder_AppendInt(parser.ErrorMessage, PrScanner_Line(parser.scanner));
        StrBuilder_Append(parser.ErrorMessage, ", ");
        StrBuilder_AppendInt(parser.ErrorMessage, PrScanner_Col(parser.scanner));
        StrBuilder_Append(parser.ErrorMessage, " : ");
        StrBuilder_Append(parser.ErrorMessage, message);
    }
    else
    {
         //ja esta com erro entao eh ruido...
        parser.bError = true;
    }
}

function Lexeme(parser: Parser): const_char
{
    if (parser.bError)
    {
        return "";
    }

    return PrScanner_Lexeme(parser.scanner);
}

function IsToken(parser: Parser, tk: Tokens): boolean
{
    return PrScanner_IsToken(parser.scanner, tk);
}

function Token(parser: Parser): Tokens
{
    if (parser.bError)
    {
        return Tokens.Error;
    }

    return parser.scanner.scanner.currentItem.token;
}

function Next(parser: Parser): boolean
{
    if (parser.bError)
    {
        return false;
    }

    var b = PrScanner_Next(parser.scanner);
    parser.debug_string = parser.scanner.scanner.currentItem.lexeme.js_text;
    return b;
}

function GetErrorMessage(parser: Parser): const_char
{
    return StrBuilder_Str(parser.ErrorMessage);
}

function HasErrors(parser: Parser): boolean
{
    return parser.bError;
}

////////////////////////////////
