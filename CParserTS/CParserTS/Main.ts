
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

    var scanner = new Scanner();
    Scanner_Init(scanner, "teste");
    //while (Scanner_Next(scanner))
    //{
    //    console.log('\'' + stream.currentChar + '\'');
    //}
    Scanner_Destroy(scanner);
}


