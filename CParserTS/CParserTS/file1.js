var Parser = (function () {
    function Parser() {
        this.scanner = new PrScanner();
    }
    return Parser;
})();
function Parser_Init(parser, text) {
    PrScanner_Init(parser.scanner, text);
}
function Parser_Destroy(parser) {
    PrScanner_Destroy(parser.scanner);
}
function Parser_Start(parser) {
    while (PrScanner_Next(parser.scanner)) {
        var tkstr = TokenToString(PrScanner_Token(parser.scanner));
        Write(tkstr);
        for (var i = tkstr.length; i < 20; i++) {
            Write(" ");
        }
        Write(": ");
        WriteLine(JSON.stringify(PrScanner_Lexeme(parser.scanner)));
    }
}
//# sourceMappingURL=file1.js.map