

enum Tokens
{
    NONE = 0,
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
    TILDE = 126, // ~

    ////////////////////////////////////////

    AUTO = 200,
    BREAK = 201,
    CASE = 202,
    CHAR = 203,
    CONST = 204,
    CONTINUE = 205,
    DEFAULT = 206,
    DO = 207,
    DOUBLE = 208,
    ELSE = 209,
    ENUM = 210,
    EXTERN = 211,
    FLOAT = 212,
    FOR = 213,
    GOTO = 214,
    IF = 215,
    INT = 216,
    LONG = 217,
    REGISTER = 218,
    RETURN = 219,
    SHORT = 220,
    SIGNED = 221,
    SIZEOF = 222,
    STATIC = 223,
    STRUCT = 224,
    SWITCH = 225,
    TYPEDEF = 226,
    UNION = 227,
    UNSIGNED = 228,
    VOID = 229,
    VOLATILE = 230,
    WHILE = 231
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



        case Tokens.AUTO: return "AUTO";
        case Tokens.BREAK: return "BREAK";
        case Tokens.CASE: return "CASE";
        case Tokens.CHAR: return "CHAR";
        case Tokens.CONST: return "CONST";
        case Tokens.CONTINUE: return "CONTINUE";
        case Tokens.DEFAULT: return "DEFAULT";
        case Tokens.DO: return "DO";
        case Tokens.DOUBLE: return "DOUBLE";
        case Tokens.ELSE: return "ELSE";
        case Tokens.ENUM: return "ENUM";
        case Tokens.EXTERN: return "EXTERN";
        case Tokens.FLOAT: return "FLOAT";
        case Tokens.FOR: return "FOR";
        case Tokens.GOTO: return "GOTO";
        case Tokens.IF: return "IF";
        case Tokens.INT: return "INT";
        case Tokens.LONG: return "LONG";
        case Tokens.REGISTER: return "REGISTER";
        case Tokens.RETURN: return "RETURN";
        case Tokens.SHORT: return "SHORT";
        case Tokens.SIGNED: return "SIGNED";
        case Tokens.SIZEOF: return "SIZEOF";
        case Tokens.STATIC: return "STATIC";
        case Tokens.STRUCT: return "STRUCT";
        case Tokens.SWITCH: return "SWITCH";
        case Tokens.TYPEDEF: return "TYPEDEF";
        case Tokens.UNION: return "UNION";
        case Tokens.UNSIGNED: return "UNSIGNED";
        case Tokens.VOID: return "VOID";
        case Tokens.VOLATILE: return "VOLATILE";
        case Tokens.WHILE: return "WHILE";

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
        else if (scanner.stream.currentChar == '*')
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

            //nao eh comentario de linha eh /
            //scanner.token = Tokens.CHAR1;
            //Stream_PutBack(scanner.stream);
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

    if (scanner.token == Tokens.IDENTIFIER)
    {
        //Verifica keywords
        //AUTO = 200,        
        if (Scanner_IsLexeme(scanner, "auto"))
        {
            scanner.token = Tokens.AUTO;
        }
        else if (Scanner_IsLexeme(scanner, "break"))
        {
            scanner.token = Tokens.BREAK;
        }
        else if (Scanner_IsLexeme(scanner, "caser"))
        {
            scanner.token = Tokens.CASE;
        }
        else if (Scanner_IsLexeme(scanner, "char"))
        {
            scanner.token = Tokens.CHAR;
        }
        else if (Scanner_IsLexeme(scanner, "const"))
        {
            scanner.token = Tokens.CONST;
        }
        else if (Scanner_IsLexeme(scanner, "continue"))
        {
            scanner.token = Tokens.CONTINUE;
        }
        else if (Scanner_IsLexeme(scanner, "default"))
        {
            scanner.token = Tokens.DEFAULT;
        }
        else if (Scanner_IsLexeme(scanner, "do"))
        {
            scanner.token = Tokens.DO;
        }
        else if (Scanner_IsLexeme(scanner, "double"))
        {
            scanner.token = Tokens.DOUBLE;
        }
        else if (Scanner_IsLexeme(scanner, "else"))
        {
            scanner.token = Tokens.ELSE;
        }
        else if (Scanner_IsLexeme(scanner, "enum"))
        {
            scanner.token = Tokens.ENUM;
        }
        else if (Scanner_IsLexeme(scanner, "extern"))
        {
            scanner.token = Tokens.EXTERN;
        }
        else if (Scanner_IsLexeme(scanner, "float"))
        {
            scanner.token = Tokens.FLOAT;
        }
        else if (Scanner_IsLexeme(scanner, "for"))
        {
            scanner.token = Tokens.FOR;
        }
        else if (Scanner_IsLexeme(scanner, "goto"))
        {
            scanner.token = Tokens.GOTO;
        }
        else if (Scanner_IsLexeme(scanner, "if"))
        {
            scanner.token = Tokens.IF;
        }
        else if (Scanner_IsLexeme(scanner, "int"))
        {
            scanner.token = Tokens.INT;
        }
        else if (Scanner_IsLexeme(scanner, "long"))
        {
            scanner.token = Tokens.LONG;
        }
        else if (Scanner_IsLexeme(scanner, "register"))
        {
            scanner.token = Tokens.REGISTER;
        }
        else if (Scanner_IsLexeme(scanner, "return"))
        {
            scanner.token = Tokens.RETURN;
        }
        else if (Scanner_IsLexeme(scanner, "short"))
        {
            scanner.token = Tokens.SHORT;
        }
        else if (Scanner_IsLexeme(scanner, "signed"))
        {
            scanner.token = Tokens.SIGNED;
        }
        else if (Scanner_IsLexeme(scanner, "sizeof"))
        {
            scanner.token = Tokens.SIZEOF;
        }
        else if (Scanner_IsLexeme(scanner, "static"))
        {
            scanner.token = Tokens.STATIC;
        }
        else if (Scanner_IsLexeme(scanner, "struct"))
        {
            scanner.token = Tokens.STRUCT;
        }
        else if (Scanner_IsLexeme(scanner, "switch"))
        {
            scanner.token = Tokens.SWITCH;
        }
        else if (Scanner_IsLexeme(scanner, "typedef"))
        {
            scanner.token = Tokens.TYPEDEF;
        }
        else if (Scanner_IsLexeme(scanner, "union"))
        {
            scanner.token = Tokens.UNION;
        }
        else if (Scanner_IsLexeme(scanner, "unsigned"))
        {
            scanner.token = Tokens.UNSIGNED;
        }
        else if (Scanner_IsLexeme(scanner, "void"))
        {
            scanner.token = Tokens.VOID;
        }
        else if (Scanner_IsLexeme(scanner, "volatile"))
        {
            scanner.token = Tokens.VOLATILE;
        }
        else if (Scanner_IsLexeme(scanner, "while"))
        {
            scanner.token = Tokens.WHILE;
        }
    }

    return bResult;
}


function Scanner_Token(scanner: Scanner): Tokens
{
    return scanner.token;
}

function Scanner_Lexeme(scanner: Scanner): const_char
{
    return StrBuilder_Str(scanner.lexeme);
}

function Scanner_IsLexeme(scanner: Scanner, psz: const_char): boolean
{
    return StrCmp(StrBuilder_Str(scanner.lexeme), psz);
}

//////////////////////////////////////////////

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
}

function PrScanner_Destroy(pPrScanner: PrScanner)
{
    Scanner_Destroy(pPrScanner.scanner);
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

