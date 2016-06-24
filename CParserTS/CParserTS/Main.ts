
function PrintTokens(text: const_char)
{
    var scanner = new Scanner();
    Scanner_Init(scanner, text);
    while (Scanner_Next(scanner))
    {
        var tkstr = TokenToString(Scanner_Token(scanner));
        Write(tkstr);
        for (var i = tkstr.length; i < 20; i++)
        {
            Write(" ");
        }
        Write(": ");

        WriteLine(JSON.stringify(Scanner_Lexeme(scanner)));
    }
    Scanner_Destroy(scanner);
}

function PrintTokensPre(text: const_char)
{
    var scanner = new PrScanner();
    PrScanner_Init(scanner, text);
    while (PrScanner_Next(scanner))
    {
        var tkstr = TokenToString(PrScanner_Token(scanner));
        Write(tkstr);
        for (var i = tkstr.length; i < 20; i++)
        {
            Write(" ");
        }
        Write(": ");

        WriteLine(JSON.stringify(PrScanner_Lexeme(scanner)));
    }
    PrScanner_Destroy(scanner);
}

function Main()
{
    var strBuilder = new StrBuilder();
    StrBuilder_Init(strBuilder);

    FileToStrBuilder("main.c", strBuilder);
    //PrintTokens(StrBuilder_Str(strBuilder));
    //WriteLine("-------------------------------------");

    PrintTokensPre(StrBuilder_Str(strBuilder));

    var parser = new Parser();
    Parser_Init(parser, StrBuilder_Str(strBuilder));
    Next(parser);
    var result = Main_Main(parser);

    if (HasErrors(parser))
    {
        WriteLine("Error : ");
        WriteLine(GetErrorMessage(parser));
    }
    else
    {
        WriteLine("Succeeded");
    }

    Parser_Destroy(parser);
    StrBuilder_Destroy(strBuilder);
}


