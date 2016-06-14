﻿



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
    pStream.currentChar = '\0';
}

function Stream_Destroy(pStream: Stream)
{
}

function Stream_PutBack(pStream: Stream)
{
}

function Stream_Next(pStream: Stream): boolean
{
    if (pStream.position >= pStream.text.length)
    {
        return false;
    }
    pStream.currentChar = pStream.text.charAt(pStream.position);
    pStream.position++;
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