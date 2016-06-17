
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
    BREAKLINE
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
        case Tokens.BREAKLINE: return "BREAKLINE";
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

    //if (Stream_Next(pScanner.stream))
    //{
    ch = pScanner.stream.currentChar;
    //}

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
                Stream_PutBack(pScanner.stream);
                break;
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
    else if (ch == '//')
    {
        if (Stream_Next(pScanner.stream))
        {
            var ch2: wchar_t = pScanner.stream.currentChar;
            if (ch2 == '//')
            {
                //comentario de linha
                AppendUntil(pScanner.stream, '\n', pScanner.lexeme);
                pScanner.token = Tokens.LINE_COMMENT;
            }
            else
            {
                //nao eh comentario de linha eh /
                Stream_PutBack(pScanner.stream);
            }
        }
        else
        {
            //poe eof de volta
            Stream_PutBack(pScanner.stream);
        }
        bResult = true;
    }
    else if (ch == '\n')
    {
        StrBuilder_AppendWChar(pScanner.lexeme, pScanner.stream.currentChar);
        pScanner.token = Tokens.BREAKLINE;
        Stream_Next(pScanner.stream);
        bResult = true;
    }

    return bResult;
}


