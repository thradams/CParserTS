



class Stream
{
    text: string;
    previousCol: number;
 
    //public
    position: int;
    currentChar: wchar_t;
    currentLine: int;
    currentCol: int;
};

function Stream_Init(pStream: Stream, text: const_char)
{
    pStream.currentLine = 1;
    pStream.currentCol = 1;
    pStream.previousCol = 0; //nao tem

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
    if (pStream.position > 0 &&
        pStream.position != pStream.text.length + 1)
    {
        if (pStream.currentChar == '\n')
        {
            //volta para linha anterior
            pStream.currentLine--;

            //volta para a coluna anterior
            pStream.currentCol = pStream.previousCol;
        }

        pStream.position--;

        //corrige o caracter atual
        pStream.currentChar = pStream.text.charAt(pStream.position);
    }
}

function Stream_Next(pStream: Stream): boolean
{
    if (pStream.position >= pStream.text.length)
    {
        return false;
    }
    pStream.currentCol++;
    pStream.position++;
    if (pStream.position == pStream.text.length)
    {
        pStream.currentChar = '\0';
    }
    else
    {

      pStream.currentChar = pStream.text.charAt(pStream.position);
    }

    if (pStream.currentChar == '\n')
    {
        pStream.currentLine++;
        pStream.previousCol = pStream.currentCol;
        pStream.currentCol = 0;
    }
    return true;
}

