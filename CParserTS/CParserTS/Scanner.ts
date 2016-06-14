
enum Tokens
{
   NONE,
   LINE_COMMENT,
   COMMENT,
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
    var ch: wchar_t = '\0';
    

    if (Stream_Next(pScanner.stream))
    {
        ch = pScanner.stream.currentChar;
    }

    if ((ch >= 'a' && ch <= 'z') || 
        (ch >= 'A' && ch <= 'Z') || 
         ch == '_')
    {
       //identificador
    }

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
    }

    return true;
}


