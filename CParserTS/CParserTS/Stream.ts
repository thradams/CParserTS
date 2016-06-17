



class Stream
{
    text: string;
    position: int;
    currentChar: wchar_t;
};

function Stream_Init(pStream: Stream, text: const_char)
{
    pStream.position = 0;
    pStream.text = text;
    if (text.length > 0)
    {
        pStream.currentChar = text.charAt(0);
    }
    else
    {
        pStream.currentChar = '\0';
    }
}

function Stream_Destroy(pStream: Stream)
{
}

function Stream_PutBack(pStream: Stream)
{
    if (pStream.position > 0 && pStream.position != pStream.text.length +1)
    {
        pStream.position--;
        pStream.currentChar = pStream.text.charAt(pStream.position);
    }
}

function Stream_Next(pStream: Stream): boolean
{
    if (pStream.position >= pStream.text.length)
    {
        return false;
    }

    pStream.position++;
    pStream.currentChar = pStream.text.charAt(pStream.position);

    return true;
}


function AppendUntil(pStream: Stream, ch: wchar_t, str : StrBuilder)
{
    if (Stream_Next(pStream))
    {
        if (pStream.currentChar == ch)
        {
            return true;
        }
        StrBuilder_AppendWChar(str, ch);
    }

    return false;
}