

enum Tokens
{
    NONE,
    EOF,
    LINE_COMMENT,
    COMMENT,
    LITERALSTR,
    IDENTIFIER,
    SPACES,
    NUMBER,
    REAL,
    BREAKLINE,
    CHAR1, // '/' ,

    CHARACTER_TABULATION,// = '\t';
     
    EXCLAMATION_MARK,// = '!';
    QUOTATION_MARK,// = '\"';
    NUMBER_SIGN,// = '#';
    DOLLAR_SIGN,// = '$';
    PERCENT_SIGN,// = '%';
    AMPERSAND,// = '&';
    APOSTROPHE,// = '\'';
    LEFT_PARENTHESIS,// = '(';
    RIGHT_PARENTHESIS,// = ')';
    ASTERISK,// = '*';
    PLUS_SIGN,// = '+';
    COMMA,// = ',';
    HYPHEN_MINUS,// = '-';
    FULL_STOP,// = '.';
    SOLIDUS,// = '/';
    COLON,// = ':';
    SEMICOLON,// = ';';
    LESS_THAN_SIGN,// = '<';
    EQUALS_SIGN,// = '=';
    GREATER_THAN_SIGN,// = '>';
    QUESTION_MARK,// = '\?';
    COMMERCIAL_AT,// = '@';
    LEFT_SQUARE_BRACKET,// = '[';
    REVERSE_SOLIDUS,// = '\\';
    RIGHT_SQUARE_BRACKET,// = ']';
    CIRCUMFLEX_ACCENT,// = '^';
    LOW_LINE,// = '_';
    GRAVE_ACCENT,// = '`';
    LEFT_CURLY_BRACKET,// = '{';
    VERTICAL_LINE,// = '|';
    RIGHT_CURLY_BRACKET,// = '}';

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
};

function Scanner_Init(pScanner: Scanner, text: const_char)
{
    pScanner.token = Tokens.NONE;
    Stream_Init(pScanner.stream, text);
    StrBuilder_Init(pScanner.lexeme);
}

function Scanner_Destroy(pScanner: Scanner)
{
    Stream_Destroy(pScanner.stream);
    StrBuilder_Destroy(pScanner.lexeme);
}

function Scanner_Next(pScanner: Scanner): boolean
{
    var bResult = false;
    var ch: wchar_t = '\0';
    StrBuilder_Clear(pScanner.lexeme);

    ch = pScanner.stream.currentChar;
    
    //Identificador
    if ((ch >= 'a' && ch <= 'z') ||
        (ch >= 'A' && ch <= 'Z') ||
        ch == '_')
    {
        StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
        pScanner.token = Tokens.IDENTIFIER;
        while (Stream_Next(pScanner.stream))
        {
            ch = pScanner.stream.currentChar;
            if ((ch >= 'a' && ch <= 'z') ||
                (ch >= 'A' && ch <= 'Z') ||
                (ch >= '0' && ch <= '9') ||
                ch == '_')
            {
                StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
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
        StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
        pScanner.token = Tokens.NUMBER;
        while (Stream_Next(pScanner.stream))
        {
            ch = pScanner.stream.currentChar;
            if ((ch >= '0' && ch <= '9'))
            {
                StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
            }
            else
            {
                //Stream_PutBack(pScanner.stream);
                break;
            }
        }

        if (pScanner.stream.currentChar == '.')
        {
            StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
            pScanner.token = Tokens.REAL;
            while (Stream_Next(pScanner.stream))
            {
                ch = pScanner.stream.currentChar;
                if ((ch >= '0' && ch <= '9'))
                {
                    StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
                }
                else
                {
                    //Stream_PutBack(pScanner.stream);
                    break;
                }
            }
        }

        if (pScanner.stream.currentChar == 'e' ||
            pScanner.stream.currentChar == 'E')
        {
            StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);

            Stream_Next(pScanner.stream);
            if (pScanner.stream.currentChar == '-' ||
                pScanner.stream.currentChar == '+')
            {
                StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
            }
            else
            {
                Stream_PutBack(pScanner.stream);
            }

            while (Stream_Next(pScanner.stream))
            {
                ch = pScanner.stream.currentChar;
                if ((ch >= '0' && ch <= '9'))
                {
                    StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
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
        pScanner.token = Tokens.LITERALSTR;
        while (Stream_Next(pScanner.stream))
        {
            if (pScanner.stream.currentChar == '\"')
            {
                Stream_Next(pScanner.stream);
                break;
            }
            else if (pScanner.stream.currentChar == '\\')
            {
                StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
                if (!Stream_Next(pScanner.stream))
                {
                    //ops
                    pScanner.token = Tokens.EOF;
                }
                else
                {
                    StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
                }
                //se terminar ehh erro
            }
            else
            {
                StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
            }
        }
        bResult = true;
    }
    //espacos
    else if (ch == ' ' || ch == '\t') 
    {
        StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
        pScanner.token = Tokens.SPACES;
        while (Stream_Next(pScanner.stream))
        {
            ch = pScanner.stream.currentChar;
            if (ch == ' ' || ch == 'z')
            {
                StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
            }
            else
            {
                //Stream_PutBack(pScanner.stream);
                break;
            }
        }

        bResult = true;
    }
    //comentario de linha
    else if (ch == '/')
    {
        Stream_Next(pScanner.stream);

        if (pScanner.stream.currentChar == '/')
        {
            while (Stream_Next(pScanner.stream))
            {
                if (pScanner.stream.currentChar == '\n' ||
                    pScanner.stream.currentChar == '\0')
                {
                    break;
                }
                //comentario de linha
                StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
            }
            pScanner.token = Tokens.LINE_COMMENT;
        }
        else
        {
            //nao eh comentario de linha eh /
            pScanner.token = Tokens.CHAR1;
            Stream_PutBack(pScanner.stream);
        }

        bResult = true;
    }
    //comentario de linha   
    else if (ch == '\n')
    {
        StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
        pScanner.token = Tokens.BREAKLINE;
        Stream_Next(pScanner.stream);
        bResult = true;
    }
    //comentario c
    else if (ch == '/')
    {
        //olha um adiante
        Stream_Next(pScanner.stream);
        ch = pScanner.stream.currentChar;
        if (ch == '*')
        {
            pScanner.token = Tokens.COMMENT;
            while (Stream_Next(pScanner.stream))
            {
                //Stream_Next(pScanner.stream);
                if (pScanner.stream.currentChar == '*')
                {
                    Stream_Next(pScanner.stream);

                    if (pScanner.stream.currentChar == '/')
                    {   
                        //terminou
                        Stream_Next(pScanner.stream);
                        break;
                    }
                    else
                    {
                        StrBuilder_AppendWChar(pScanner.lexeme, '*');
                        Stream_PutBack(pScanner.stream);
                        //StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
                    }
                }
                else
                {
                    //StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
                    StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
                }
            }

            bResult = true;
        }
        else
        {
            StrBuilder_AppendWChar(pScanner.lexeme, '/');
            pScanner.token = Tokens.CHAR1;
            bResult = true;
        }
    }
    else if (ch == '#')
    {
        pScanner.token = Tokens.NUMBER_SIGN;
        Stream_Next(pScanner.stream);
        bResult = true;
    }
    else if (ch == '$')
    {
        pScanner.token = Tokens.DOLLAR_SIGN;
        Stream_Next(pScanner.stream);
        bResult = true;
    }

    return bResult;
}


