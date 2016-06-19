
type int = number;
type const_char = string;
type wchar_t = string;

function ASSERT(x: boolean)
{
    if (!x)
    {
        alert("assert");
    } 
}

function GetCharCode(ch: wchar_t): int
{
    ASSERT(ch.length == 1);
    return ch.charCodeAt(0);
}

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

function StrCmp(t1: const_char, t2: const_char) : boolean
{
    return t1 == t2;
}
