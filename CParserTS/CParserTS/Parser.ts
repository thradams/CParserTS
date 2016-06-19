
class Parser
{
    scanner: PrScanner = new PrScanner();
}

function Parser_Init(parser: Parser, text: const_char)
{
    PrScanner_Init(parser.scanner, text);
}

function Parser_Destroy(parser: Parser)
{
    PrScanner_Destroy(parser.scanner);
}

function Parser_Start(parser: Parser)
{
    while (PrScanner_Next(parser.scanner))
    {
        var tkstr = TokenToString(PrScanner_Token(parser.scanner));
        Write(tkstr);
        for (var i = tkstr.length; i < 20; i++)
        {
            Write(" ");

        }
        Write(": ");

        WriteLine(JSON.stringify(PrScanner_Lexeme(parser.scanner)));
    }
}
