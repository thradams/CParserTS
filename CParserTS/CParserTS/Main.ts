
function Main()
{
    console.log('Hello world');

    var stream = new Stream();
    Stream_Init(stream, "");
    while (Stream_Next(stream))
    {
        console.log('\'' + stream.currentChar + '\'');
    }

    Stream_Next(stream);

    Stream_Destroy(stream);

    var strBuilder = new StrBuilder();
    StrBuilder_Init(strBuilder);

    FileToStrBuilder("main.c", strBuilder);

    var scanner = new Scanner();
    Scanner_Init(scanner, StrBuilder_Str(strBuilder));
    while (Scanner_Next(scanner))
    {
        var tkstr = TokenToString(scanner.token);
        Write(tkstr);
        for (var i = tkstr.length; i < 20; i++)
        {
            Write(" ");
        
        }
        Write(": ");

        WriteLine(JSON.stringify(StrBuilder_Str(scanner.lexeme)));
    }
    Scanner_Destroy(scanner);
    StrBuilder_Destroy(strBuilder);

}


