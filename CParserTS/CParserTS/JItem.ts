
enum Jtype
{
    Number,
    String,
    Bool,
    Null,
    Object,
    Array
}

class JItem
{
    closed = false;
    jtype = Jtype.Null;
    text = new StrBuilder();
    bFirstItem = true;
}

function JItem_Init(jitem: JItem, jtype: Jtype)
{
    StrBuilder_Init(jitem.text);
    jitem.bFirstItem = true;
    jitem.closed = false;
    jitem.jtype = jtype;
    if (jtype == Jtype.Object)
    {
        StrBuilder_Append(jitem.text, "{\n");
    }
    else if (jtype == Jtype.Array)
    {
        StrBuilder_Append(jitem.text, "[\n");
    }
}

function JItem_Destroy(jitem: JItem)
{
}

function JItem_String(jitem: JItem): const_char
{
    if (!jitem.closed)
    {
        jitem.closed = true;
        if (jitem.jtype == Jtype.Object)
        {
            StrBuilder_Append(jitem.text, "}\n");
        }
        else if (jitem.jtype == Jtype.Array)
        {
            StrBuilder_Append(jitem.text, "]\n");
        }
    }
    return StrBuilder_Str(jitem.text);
}
function JItem_SetJItem(jitem: JItem,
    childName: const_char,
    value: JItem)
{
    if (!jitem.bFirstItem)
    {
        StrBuilder_Append(jitem.text, ",\n");
    }
    StrBuilder_Append(jitem.text, "\"");
    StrBuilder_Append(jitem.text, childName);
    StrBuilder_Append(jitem.text, "\":");
    StrBuilder_Append(jitem.text, JItem_String(value));
    jitem.bFirstItem = false;
}
function JItem_SetString(jitem: JItem,
    name: const_char,
    value: const_char)
{
    if (!jitem.bFirstItem)
    {
        StrBuilder_Append(jitem.text, ",\n");
    }
    StrBuilder_Append(jitem.text, "\"");
    StrBuilder_Append(jitem.text, name);
    StrBuilder_Append(jitem.text, "\":");
    StrBuilder_AppendJsonText(jitem.text, value);
    jitem.bFirstItem = false;
}

function JItem_PushJ(jitem: JItem,
    value: JItem)
{
    if (!jitem.bFirstItem)
    {
        StrBuilder_Append(jitem.text, ",\n");
    }

    StrBuilder_Append(jitem.text, JItem_String(value));
    jitem.bFirstItem = false;
}


function JItem_PushString(jitem: JItem,
    value: const_char)
{
    if (!jitem.bFirstItem)
    {
        StrBuilder_Append(jitem.text, ",\n");
    }

    StrBuilder_AppendJsonText(jitem.text, value);
    jitem.bFirstItem = false;
}




