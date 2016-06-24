

enum Tokens
{
    NONE = 0,
    EOF = 1,
    TK_EndMark = 1,
    LINE_COMMENT = 2,
    COMMENT = 3,
    TK_string_literal = 4,
    TK_identifier = 5,
    SPACES = 6,
    TK_number = 7,
    REAL = 8,
    BREAKLINE = 9,
    CHAR1 = 10, // '/' ,
    CHARACTER_TABULATION = 11,// = '\t';
    PREPROCESSOR = 12,
    Error = 13, //reservado para erro
    

    //
    EXCLAMATION_MARK = 33,// = '!';
    QUOTATION_MARK = 34,// = '\"';
    NUMBER_SIGN = 35,// = '#';
    
    DOLLAR_SIGN = 36,// = '$';
    PERCENT_SIGN = 37,// = '%';
    AMPERSAND = 38,// = '&';
    APOSTROPHE = 39,// = '\'';
    TK_LEFT_PARENTHESIS = 40,// = '(';
    TK_RIGHT_PARENTHESIS = 41,// = ')';
    TK_ASTERISK = 42,// = '*';
    PLUS_SIGN = 43,// = '+';
    TK_COMMA = 44,// = ',';
    HYPHEN_MINUS = 45,// = '-';
    FULL_STOP = 46,// = '.';
    SOLIDUS = 47,// = '/';

    TK_COLON = 58,// = ':';
    TK_SEMICOLON = 59,// = ';';
    LESS_THAN_SIGN = 60,// = '<';
    TK_EQUALS_SIGN = 61,// = '=';
    GREATER_THAN_SIGN = 62,// = '>';
    QUESTION_MARK = 63,// = '\?';
    COMMERCIAL_AT = 64,// = '@';

    TK_LEFT_SQUARE_BRACKET = 91,// = '[';
    REVERSE_SOLIDUS = 92,// = '\\';
    TK_RIGHT_SQUARE_BRACKET = 93,// = ']';
    CIRCUMFLEX_ACCENT = 94,// = '^';
    LOW_LINE = 95,// = '_';
    GRAVE_ACCENT = 96,// = '`';

    TK_LEFT_CURLY_BRACKET = 123,// = '{';
    VERTICAL_LINE = 124,// = '|';
    TK_RIGHT_CURLY_BRACKET = 125,// = '}';
    TILDE = 126, // ~

    ////////////////////////////////////////

    TK_auto = 200,
    BREAK = 201,
    TK_case = 202,
    TK_char = 203,
    TK_const = 204,
    CONTINUE = 205,
    DEFAULT = 206,
    DO = 207,
    TK_double = 208,
    ELSE = 209,
    TK_enum = 210,
    TK_extern = 211,
    TK_float = 212,
    FOR = 213,
    GOTO = 214,
    IF = 215,
    TK_int = 216,
    TK_long = 217,
    TK_register = 218,
    RETURN = 219,
    TK_short = 220,
    TK_signed = 221,
    SIZEOF = 222,
    TK_static = 223,
    TK_struct = 224,
    SWITCH = 225,
    TK_typedef = 226,
    TK_union = 227,
    TK_unsigned = 228,
    TK_void = 229,
    TK_volatile = 230,
    WHILE = 231,
    TK__Thread_local = 232,
    TK__Bool = 233,
    TK__Complex = 234,
    TK__Atomic = 235,
    TK_restrict = 236,
    TK__Static_assert = 237,
    TK_inline = 238,
    TK__Noreturn = 239,
    TK__Alignas = 240,
}

function TokenToString(tk: Tokens)
{
    switch (tk)
    {
        case Tokens.NONE: return "None";
        case Tokens.EOF: return "Eof";
        case Tokens.LINE_COMMENT: return "LINE_COMMENT";

        case Tokens.COMMENT: return "COMMENT";
        case Tokens.TK_string_literal: return "LITERALSTR";
        case Tokens.TK_identifier: return "IDENTIFIER";
        case Tokens.SPACES: return "SPACES";
        case Tokens.TK_number: return "NUMBER";
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
        case Tokens.TK_LEFT_PARENTHESIS: return "(";//,// = '(';
        case Tokens.TK_RIGHT_PARENTHESIS: return ")";//,// = ')';
        case Tokens.TK_ASTERISK: return "*";//,// = '*';
        case Tokens.PLUS_SIGN: return "+";//,// = '+';
        case Tokens.TK_COMMA: return ",";//,// = ',';
        case Tokens.HYPHEN_MINUS: return "-";//,// = '-';
        case Tokens.FULL_STOP: return ".";//,// = '.';
        case Tokens.SOLIDUS: return "/";//,// = '/';
        case Tokens.TK_COLON: return ":";//,// = ':';
        case Tokens.TK_SEMICOLON: return ";";//,// = ';';
        case Tokens.LESS_THAN_SIGN: return "<";//,// = '<';
        case Tokens.TK_EQUALS_SIGN: return "=";//,// = '=';
        case Tokens.GREATER_THAN_SIGN: return ">";//,// = '>';
        case Tokens.QUESTION_MARK: return "?";//,// = '\?';
        case Tokens.COMMERCIAL_AT: return "@";//,// = '@';
        case Tokens.TK_LEFT_SQUARE_BRACKET: return "[";//,// = '[';
        case Tokens.REVERSE_SOLIDUS: return "\\";//,// = '\\';
        case Tokens.TK_RIGHT_SQUARE_BRACKET: return "]";//,// = ']';
        case Tokens.CIRCUMFLEX_ACCENT: return "^";// = '^';
        case Tokens.LOW_LINE: return "_";//,// = '_';
        case Tokens.GRAVE_ACCENT: return "`";//,// = '`';
        case Tokens.TK_LEFT_CURLY_BRACKET: return "{";//,// = '{';
        case Tokens.VERTICAL_LINE: return "|";//,// = '|';
        case Tokens.TK_RIGHT_CURLY_BRACKET: return "}";//,// = '}';



        case Tokens.TK_auto: return "AUTO";
        case Tokens.BREAK: return "BREAK";
        case Tokens.TK_case: return "CASE";
        case Tokens.TK_char: return "CHAR";
        case Tokens.TK_const: return "CONST";
        case Tokens.CONTINUE: return "CONTINUE";
        case Tokens.DEFAULT: return "DEFAULT";
        case Tokens.DO: return "DO";
        case Tokens.TK_double: return "DOUBLE";
        case Tokens.ELSE: return "ELSE";
        case Tokens.TK_enum: return "ENUM";
        case Tokens.TK_extern: return "EXTERN";
        case Tokens.TK_float: return "FLOAT";
        case Tokens.FOR: return "FOR";
        case Tokens.GOTO: return "GOTO";
        case Tokens.IF: return "IF";
        case Tokens.TK_int: return "INT";
        case Tokens.TK_long: return "LONG";
        case Tokens.TK_register: return "REGISTER";
        case Tokens.RETURN: return "RETURN";
        case Tokens.TK_short: return "SHORT";
        case Tokens.TK_signed: return "SIGNED";
        case Tokens.SIZEOF: return "SIZEOF";
        case Tokens.TK_static: return "STATIC";
        case Tokens.TK_struct: return "STRUCT";
        case Tokens.SWITCH: return "SWITCH";
        case Tokens.TK_typedef: return "TYPEDEF";
        case Tokens.TK_union: return "UNION";
        case Tokens.TK_unsigned: return "UNSIGNED";
        case Tokens.TK_void: return "VOID";
        case Tokens.TK_volatile: return "VOLATILE";
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
        scanner.token = Tokens.TK_identifier;
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
        scanner.token = Tokens.TK_number;
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
        scanner.token = Tokens.TK_string_literal;
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
    else if (ch == '\0')
    {
        scanner.token = Tokens.EOF;        
        bResult = false;     
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

    if (scanner.token == Tokens.TK_identifier)
    {
        //Verifica keywords
        //AUTO = 200,        
        if (Scanner_IsLexeme(scanner, "auto"))
        {
            scanner.token = Tokens.TK_auto;
        }
        else if (Scanner_IsLexeme(scanner, "break"))
        {
            scanner.token = Tokens.BREAK;
        }
        else if (Scanner_IsLexeme(scanner, "caser"))
        {
            scanner.token = Tokens.TK_case;
        }
        else if (Scanner_IsLexeme(scanner, "char"))
        {
            scanner.token = Tokens.TK_char;
        }
        else if (Scanner_IsLexeme(scanner, "const"))
        {
            scanner.token = Tokens.TK_const;
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
            scanner.token = Tokens.TK_double;
        }
        else if (Scanner_IsLexeme(scanner, "else"))
        {
            scanner.token = Tokens.ELSE;
        }
        else if (Scanner_IsLexeme(scanner, "enum"))
        {
            scanner.token = Tokens.TK_enum;
        }
        else if (Scanner_IsLexeme(scanner, "extern"))
        {
            scanner.token = Tokens.TK_extern;
        }
        else if (Scanner_IsLexeme(scanner, "float"))
        {
            scanner.token = Tokens.TK_float;
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
            scanner.token = Tokens.TK_int;
        }
        else if (Scanner_IsLexeme(scanner, "long"))
        {
            scanner.token = Tokens.TK_long;
        }
        else if (Scanner_IsLexeme(scanner, "register"))
        {
            scanner.token = Tokens.TK_register;
        }
        else if (Scanner_IsLexeme(scanner, "return"))
        {
            scanner.token = Tokens.RETURN;
        }
        else if (Scanner_IsLexeme(scanner, "short"))
        {
            scanner.token = Tokens.TK_short;
        }
        else if (Scanner_IsLexeme(scanner, "signed"))
        {
            scanner.token = Tokens.TK_signed;
        }
        else if (Scanner_IsLexeme(scanner, "sizeof"))
        {
            scanner.token = Tokens.SIZEOF;
        }
        else if (Scanner_IsLexeme(scanner, "static"))
        {
            scanner.token = Tokens.TK_static;
        }
        else if (Scanner_IsLexeme(scanner, "struct"))
        {
            scanner.token = Tokens.TK_struct;
        }
        else if (Scanner_IsLexeme(scanner, "switch"))
        {
            scanner.token = Tokens.SWITCH;
        }
        else if (Scanner_IsLexeme(scanner, "typedef"))
        {
            scanner.token = Tokens.TK_typedef;
        }
        else if (Scanner_IsLexeme(scanner, "union"))
        {
            scanner.token = Tokens.TK_union;
        }
        else if (Scanner_IsLexeme(scanner, "unsigned"))
        {
            scanner.token = Tokens.TK_unsigned;
        }
        else if (Scanner_IsLexeme(scanner, "void"))
        {
            scanner.token = Tokens.TK_void;
        }
        else if (Scanner_IsLexeme(scanner, "volatile"))
        {
            scanner.token = Tokens.TK_volatile;
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
        else if (PrScanner_Top(pPrScanner).token == Tokens.TK_identifier)
        {
            //ver se eh macro
            break;
        }
        else if (PrScanner_IsToken(pPrScanner, Tokens.SPACES) ||
                 PrScanner_IsToken(pPrScanner, Tokens.BREAKLINE) ||
                 PrScanner_IsToken(pPrScanner, Tokens.COMMENT) ||
                  PrScanner_IsToken(pPrScanner, Tokens.LINE_COMMENT))
        {
            Scanner_Next(pPrScanner.scanner);
        }
        else
        {
            break;
        }
    }

    return bResult;
}



function PrScanner_IsToken(pPrScanner: PrScanner, tk: Tokens): boolean
{
    return pPrScanner.scanner.token == tk;
}

function PrScanner_IsToken2(pPrScanner: PrScanner, tk1: Tokens, tk2: Tokens): boolean
{
    return pPrScanner.scanner.token == tk1 ||
        pPrScanner.scanner.token == tk2;
}


function PrScanner_Token(pPrScanner: PrScanner): Tokens
{
    return pPrScanner.scanner.token;
}

function PrScanner_Lexeme(pPrScanner: PrScanner): const_char
{
    return StrBuilder_Str(pPrScanner.scanner.lexeme);
}

