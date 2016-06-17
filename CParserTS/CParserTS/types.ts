
type int = number;
type const_char = string;
type wchar_t = string;


class StrBuilder
{
    text: string;
}

function StrBuilder_Init(pStrBuilder: StrBuilder)
{
    pStrBuilder.text = "";
}

function StrBuilder_AppendWChar(pStrBuilder: StrBuilder, ch: wchar_t)
{
    pStrBuilder.text += ch;
}

function StrBuilder_Clear(pStrBuilder: StrBuilder)
{
    pStrBuilder.text = "";
}

function StrBuilder_Str(pStrBuilder: StrBuilder) :  string{
    return pStrBuilder.text;
}


function StrBuilder_Destroy(pStrBuilder: StrBuilder)
{    
}
