

enum Tokens
{
    NONE =0,
    EOF = 1,
    LINE_COMMENT = 2,
    COMMENT = 3,
    LITERALSTR = 4,
    IDENTIFIER = 5,
    SPACES = 6,
    NUMBER = 7,
    REAL = 8,
    BREAKLINE = 9,
    CHAR1 = 10, // '/' ,
    CHARACTER_TABULATION = 11,// = '\t';
    PREPROCESSOR = 12,
    
    //
    EXCLAMATION_MARK = 33,// = '!';
    QUOTATION_MARK = 34,// = '\"';
    NUMBER_SIGN = 35,// = '#';
    
    DOLLAR_SIGN = 36,// = '$';
    PERCENT_SIGN = 37,// = '%';
    AMPERSAND = 38,// = '&';
    APOSTROPHE = 39,// = '\'';
    LEFT_PARENTHESIS = 40,// = '(';
    RIGHT_PARENTHESIS = 41,// = ')';
    ASTERISK = 42,// = '*';
    PLUS_SIGN = 43,// = '+';
    COMMA = 44,// = ',';
    HYPHEN_MINUS = 45,// = '-';
    FULL_STOP = 46,// = '.';
    SOLIDUS = 47,// = '/';

    COLON = 58,// = ':';
    SEMICOLON = 59,// = ';';
    LESS_THAN_SIGN = 60,// = '<';
    EQUALS_SIGN = 61,// = '=';
    GREATER_THAN_SIGN = 62,// = '>';
    QUESTION_MARK = 63,// = '\?';
    COMMERCIAL_AT = 64,// = '@';

    LEFT_SQUARE_BRACKET = 91,// = '[';
    REVERSE_SOLIDUS = 92,// = '\\';
    RIGHT_SQUARE_BRACKET = 93,// = ']';
    CIRCUMFLEX_ACCENT = 94,// = '^';
    LOW_LINE = 95,// = '_';
    GRAVE_ACCENT = 96,// = '`';

    LEFT_CURLY_BRACKET = 123,// = '{';
    VERTICAL_LINE = 124,// = '|';
    RIGHT_CURLY_BRACKET = 125,// = '}';
    TILDE = 126 // ~
}

function TokenToString(tk: Tokens)
{
    switch (tk)
    {
        case Tokens.NONE: return "None";
        case Tokens.EOF: return "Eof";
        case Tokens.LINE_COMMENT: return "LINE_COMMENT";

        case Tokens.COMMENT: return "COMMENT";
        case Tokens.LITERALSTR: return "LITERALSTR";
        case Tokens.IDENTIFIER: return "IDENTIFIER";
        case Tokens.SPACES: return "SPACES";
        case Tokens.NUMBER: return "NUMBER";
        case Tokens.REAL: return "REAL";
        case Tokens.BREAKLINE: return "BREAKLINE";
        case Tokens.PREPROCESSOR: return "PREPROCESSOR";

        case Tokens.CHARACTER_TABULATION: return "CHARACTER_TABULATION";

        case Tokens.EXCLAMATION_MARK: return "!";// = '!';
        case Tokens.QUOTATION_MARK: return "\"";//,// = '\"';
        case Tokens.NUMBER_SIGN: return "#";//,// = '#';
        case Tokens.DOLLAR_SIGN: return "$";//,// = '$';
        case Tokens.PERCENT_SIGN: return "%";//,// = '%';
        case Tokens.AMPERSAND: return "&";//,// = '&';
        case Tokens.APOSTROPHE: return "'";//,// = '\'';
        case Tokens.LEFT_PARENTHESIS: return "(";//,// = '(';
        case Tokens.RIGHT_PARENTHESIS: return ")";//,// = ')';
        case Tokens.ASTERISK: return "*";//,// = '*';
        case Tokens.PLUS_SIGN: return "+";//,// = '+';
        case Tokens.COMMA: return ",";//,// = ',';
        case Tokens.HYPHEN_MINUS: return "-";//,// = '-';
        case Tokens.FULL_STOP: return ".";//,// = '.';
        case Tokens.SOLIDUS: return "/";//,// = '/';
        case Tokens.COLON: return ":";//,// = ':';
        case Tokens.SEMICOLON: return ";";//,// = ';';
        case Tokens.LESS_THAN_SIGN: return "<";//,// = '<';
        case Tokens.EQUALS_SIGN: return "=";//,// = '=';
        case Tokens.GREATER_THAN_SIGN: return ">";//,// = '>';
        case Tokens.QUESTION_MARK: return "?";//,// = '\?';
        case Tokens.COMMERCIAL_AT: return "@";//,// = '@';
        case Tokens.LEFT_SQUARE_BRACKET: return "[";//,// = '[';
        case Tokens.REVERSE_SOLIDUS: return "\\";//,// = '\\';
        case Tokens.RIGHT_SQUARE_BRACKET: return "]";//,// = ']';
        case Tokens.CIRCUMFLEX_ACCENT: return "^";// = '^';
        case Tokens.LOW_LINE: return "_";//,// = '_';
        case Tokens.GRAVE_ACCENT: return "`";//,// = '`';
        case Tokens.LEFT_CURLY_BRACKET: return "{";//,// = '{';
        case Tokens.VERTICAL_LINE: return "|";//,// = '|';
        case Tokens.RIGHT_CURLY_BRACKET: return "}";//,// = '}';

    }
    return "?";
}
class Scanner
{
    stream = new Stream();
    lexeme = new StrBuilder();
    token: Tokens;

    //true antes do 1 token de cada linha
    bLineStart: boolean;
};

function Scanner_Init(pScanner: Scanner, text: const_char)
{
    pScanner.bLineStart = true;
    pScanner.token = Tokens.NONE;
    Stream_Init(pScanner.stream, text);
    StrBuilder_Init(pScanner.lexeme);
}

function Scanner_Create(text: const_char): Scanner
{
    var p = new Scanner();
    Scanner_Init(p, text);
    return p;
}

function Scanner_Destroy(pScanner: Scanner)
{
    Stream_Destroy(pScanner.stream);
    StrBuilder_Destroy(pScanner.lexeme);
}

function Scanner_Delete(pScanner: Scanner)
{
    Scanner_Destroy(pScanner);
}

function Scanner_Next(scanner: Scanner): boolean
{
    var bLineStart = scanner.bLineStart;
    scanner.bLineStart = false;

    var bResult = false;
    var ch: wchar_t = '\0';
    StrBuilder_Clear(scanner.lexeme);

    ch = scanner.stream.currentChar;
    
    //Identificador
    if ((ch >= 'a' && ch <= 'z') ||
        (ch >= 'A' && ch <= 'Z') ||
        ch == '_')
    {
        StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
        scanner.token = Tokens.IDENTIFIER;
        while (Stream_Next(scanner.stream))
        {
            ch = scanner.stream.currentChar;
            if ((ch >= 'a' && ch <= 'z') ||
                (ch >= 'A' && ch <= 'Z') ||
                (ch >= '0' && ch <= '9') ||
                ch == '_')
            {
                StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
            }
            else
            {
                break;
            }
        }
        //Stream_PutBack(pScanner.stream);
        bResult = true;
    }
    //numero
    else if ((ch >= '0' && ch <= '9') || ch == '-' || ch == '+')
    {
        StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
        scanner.token = Tokens.NUMBER;
        while (Stream_Next(scanner.stream))
        {
            ch = scanner.stream.currentChar;
            if ((ch >= '0' && ch <= '9'))
            {
                StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
            }
            else
            {
                //Stream_PutBack(pScanner.stream);
                break;
            }
        }

        if (scanner.stream.currentChar == '.')
        {
            StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
            scanner.token = Tokens.REAL;
            while (Stream_Next(scanner.stream))
            {
                ch = scanner.stream.currentChar;
                if ((ch >= '0' && ch <= '9'))
                {
                    StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
                }
                else
                {
                    //Stream_PutBack(pScanner.stream);
                    break;
                }
            }
        }

        if (scanner.stream.currentChar == 'e' ||
            scanner.stream.currentChar == 'E')
        {
            StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);

            Stream_Next(scanner.stream);
            if (scanner.stream.currentChar == '-' ||
                scanner.stream.currentChar == '+')
            {
                StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
            }
            else
            {
                Stream_PutBack(scanner.stream);
            }

            while (Stream_Next(scanner.stream))
            {
                ch = scanner.stream.currentChar;
                if ((ch >= '0' && ch <= '9'))
                {
                    StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
                }
                else
                {
                    //Stream_PutBack(pScanner.stream);
                    break;
                }
            }
        }
        bResult = true;
    }
    //literal
    else if (ch == '"')
    {
        // StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
        scanner.token = Tokens.LITERALSTR;
        while (Stream_Next(scanner.stream))
        {
            if (scanner.stream.currentChar == '\"')
            {
                Stream_Next(scanner.stream);
                break;
            }
            else if (scanner.stream.currentChar == '\\')
            {
                StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
                if (!Stream_Next(scanner.stream))
                {
                    //ops
                    scanner.token = Tokens.EOF;
                }
                else
                {
                    StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
                }
                //se terminar ehh erro
            }
            else
            {
                StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
            }
        }
        bResult = true;
    }
    //espacos
    else if (ch == ' ' || ch == '\t') 
    {
        StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
        scanner.token = Tokens.SPACES;
        while (Stream_Next(scanner.stream))
        {
            ch = scanner.stream.currentChar;
            if (ch == ' ' || ch == 'z')
            {
                StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
            }
            else
            {
                //Stream_PutBack(pScanner.stream);
                break;
            }
        }

        if (scanner.stream.currentChar == '#')
        {
            if (bLineStart)
            {
                StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
                scanner.token = Tokens.PREPROCESSOR;
                Stream_Next(scanner.stream);
            }
        }

        bResult = true;
    }
    //comentario de linha
    else if (ch == '/')
    {
        Stream_Next(scanner.stream);

        if (scanner.stream.currentChar == '/')
        {
            while (Stream_Next(scanner.stream))
            {
                if (scanner.stream.currentChar == '\n' ||
                    scanner.stream.currentChar == '\0')
                {
                    break;
                }
                //comentario de linha
                StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
            }
            scanner.token = Tokens.LINE_COMMENT;
        }
        else
        {
            //nao eh comentario de linha eh /
            scanner.token = Tokens.CHAR1;
            Stream_PutBack(scanner.stream);
        }

        bResult = true;
    }
    //comentario de linha   
    else if (ch == '\n')
    {
        StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
        scanner.token = Tokens.BREAKLINE;
        Stream_Next(scanner.stream);
        bResult = true;
        scanner.bLineStart = true; 
    }
    //comentario c
    else if (ch == '/')
    {
        //olha um adiante
        Stream_Next(scanner.stream);
        ch = scanner.stream.currentChar;
        if (ch == '*')
        {
            scanner.token = Tokens.COMMENT;
            while (Stream_Next(scanner.stream))
            {
                //Stream_Next(pScanner.stream);
                if (scanner.stream.currentChar == '*')
                {
                    Stream_Next(scanner.stream);

                    if (scanner.stream.currentChar == '/')
                    {   
                        //terminou
                        Stream_Next(scanner.stream);
                        break;
                    }
                    else
                    {
                        StrBuilder_AppendWChar(scanner.lexeme, '*');
                        Stream_PutBack(scanner.stream);
                        //StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
                    }
                }
                else
                {
                    //StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
                    StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
                }
            }

            bResult = true;
        }
        else
        {
            StrBuilder_AppendWChar(scanner.lexeme, '/');
            scanner.token = Tokens.CHAR1;
            bResult = true;
        }
    }
    else if (ch == '#')
    {
        StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
        if (bLineStart)
        {
            scanner.token = Tokens.PREPROCESSOR;
        }
        else
        {
            scanner.token = Tokens.NUMBER_SIGN;
        }
        Stream_Next(scanner.stream);
        bResult = true;
    }
    else
    {
        if (scanner.stream.currentChar != '\0')
        {
            StrBuilder_AppendWChar(scanner.lexeme, scanner.stream.currentChar);
            scanner.token = <Tokens> GetCharCode(scanner.stream.currentChar);
            Stream_Next(scanner.stream);
            bResult = true;
        }
    }
   
   
    return bResult;
}




class PrScanner
{
    scanner: Scanner = new Scanner();
    constructor()
    {

    }
}

function PrScanner_Init(pPrScanner: PrScanner, text: const_char)
{
    Scanner_Init(pPrScanner.scanner, text);
    //pPrScanner.token = Tokens.NONE;
    //StrBuilder_Init(pPrScanner.lexeme);
}

function PrScanner_Destroy(pPrScanner: PrScanner)
{
    Scanner_Destroy(pPrScanner.scanner);
    //StrBuilder_Destroy(pPrScanner.lexeme);

}

function PrScanner_Top(pPrScanner: PrScanner): Scanner
{
    return pPrScanner.scanner;
}

function PrScanner_Next(pPrScanner: PrScanner): boolean
{
    var bResult = Scanner_Next(PrScanner_Top(pPrScanner));
    for (; ;)
    {
        if (PrScanner_Top(pPrScanner).token == Tokens.PREPROCESSOR)
        {
            while (Scanner_Next(PrScanner_Top(pPrScanner)))
            {
                if (PrScanner_Top(pPrScanner).token == Tokens.BREAKLINE)
                {
                    Scanner_Next(PrScanner_Top(pPrScanner));
                    break;
                }
            }

        }
        else if (PrScanner_Top(pPrScanner).token == Tokens.IDENTIFIER)
        {
            //ver se eh macro
            break;
        }
        else
        {
            break;
        }
    }

    return bResult;
}

function PrScanner_Token(pPrScanner: PrScanner): Tokens
{
    return pPrScanner.scanner.token;
}

function PrScanner_Lexeme(pPrScanner: PrScanner): const_char
{
    return StrBuilder_Str(pPrScanner.scanner.lexeme);
}


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

function Parser_Start(parser: Parser)
{
    while (PrScanner_Next(parser.scanner))
    {
        var tkstr = TokenToString(PrScanner_Token(parser.scanner));
        Write(tkstr);
        for (var i = tkstr.length; i < 20; i++)
        {
            Write(" ");

        }
        Write(": ");

        WriteLine(JSON.stringify(PrScanner_Lexeme(parser.scanner)));
    }
}
