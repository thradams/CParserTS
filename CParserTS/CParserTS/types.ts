
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
   js_text: string;
}

function StrBuilder_Init(pStrBuilder: StrBuilder)
{
    pStrBuilder.js_text = "";
}

function StrBuilder_AppendWChar(pStrBuilder: StrBuilder, ch: wchar_t)
{
    ASSERT(ch.length == 1);
    pStrBuilder.js_text += ch;
}

function StrBuilder_Size(pStrBuilder: StrBuilder): number
{
    return pStrBuilder.js_text.length;

}
function StrBuilder_Append(pStrBuilder: StrBuilder, text: wchar_t)
{
    pStrBuilder.js_text += text;
}

function StrBuilder_AppendInt(pStrBuilder: StrBuilder, n: int)
{
    pStrBuilder.js_text += n;
}


function StrBuilder_Clear(pStrBuilder: StrBuilder)
{
    return pStrBuilder.js_text = "";

}

function StrBuilder_AppendJsonText(pStrBuilder: StrBuilder, text: wchar_t)
{
    pStrBuilder.js_text += JSON.stringify(text);
}

function StrBuilder_Str(pStrBuilder: StrBuilder) :  string{
    return pStrBuilder.js_text;
}


function StrBuilder_Destroy(pStrBuilder: StrBuilder)
{    
}

function StrCmp(t1: const_char, t2: const_char) : boolean
{
    return t1 == t2;
}
