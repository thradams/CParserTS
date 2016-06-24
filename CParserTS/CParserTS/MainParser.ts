
function Expression(ctx: Parser)
{
    for (; ;)
    {
        if (HasErrors(ctx))
        {
            break;
        }
        if (Token(ctx) == Tokens.TK_SEMICOLON)
        {
            //termino de expressao
            break;
        }
        else if (Token(ctx) == Tokens.TK_LEFT_PARENTHESIS)
        {
            Match(ctx);
            //abre outra expressao
            Expression(ctx);
        }
        else if (Token(ctx) == Tokens.TK_RIGHT_PARENTHESIS)
        {
            //termino de expressao            
            break;
        }
        Match(ctx);
    }
}

function Expression_Statement(ctx: Parser)
{
    /*
      expression-statement:
      expressionopt;
     */

    if (Token(ctx) != Tokens.TK_SEMICOLON)
    {
        Expression(ctx);
    }
    MatchToken(ctx, Tokens.TK_SEMICOLON);
}

function Selection_Statement(ctx: Parser)
{
    /*
    selection-statement:
      if ( expression ) statement
      if ( expression ) statement else statement
      switch ( expression ) statement
    */
    switch (Token(ctx))
    {
        case Tokens.IF:
            Match(ctx);
            MatchToken(ctx, Tokens.TK_LEFT_PARENTHESIS);
            Expression(ctx);
            MatchToken(ctx, Tokens.TK_RIGHT_PARENTHESIS);
            Statement(ctx);
            if (Token(ctx) == Tokens.ELSE)
            {
                Match(ctx);
                Statement(ctx);
            }
            break;
        case Tokens.SWITCH:
            Match(ctx);
            MatchToken(ctx, Tokens.TK_LEFT_PARENTHESIS);
            Expression(ctx);
            MatchToken(ctx, Tokens.TK_RIGHT_PARENTHESIS);
            Statement(ctx);
            break;
    }
}

function Jump_Statement(ctx: Parser)
{
    /*
    jump-statement:
      goto identifier ;
      continue ;
      break ;
      return expressionopt ;
    */
    //jump-statement
    switch (Token(ctx))
    {
        case Tokens.GOTO:
            Match(ctx);
            MatchToken(ctx, Tokens.TK_identifier);
            break;
        case Tokens.CONTINUE:
            Match(ctx);
            MatchToken(ctx, Tokens.TK_SEMICOLON);
            break;
        case Tokens.BREAK:
            Match(ctx);
            MatchToken(ctx, Tokens.TK_SEMICOLON);
        case Tokens.RETURN:
            Match(ctx);
            if (Token(ctx) != Tokens.TK_SEMICOLON)
            {
                Expression(ctx);
            }
            MatchToken(ctx, Tokens.TK_SEMICOLON);
            break;
    }
}
function Iteration_Statement(ctx: Parser)
{
    /*
    iteration-statement:
    while ( expression ) statement
    do statement while ( expression ) ;
    for ( expressionopt ; expressionopt ; expressionopt ) statement
    for ( declaration expressionopt ; expressionopt ) statement
    */
    switch (Token(ctx))
    {
        case Tokens.WHILE:
            Match(ctx);
            MatchToken(ctx, Tokens.TK_LEFT_PARENTHESIS);
            Expression(ctx);
            MatchToken(ctx, Tokens.TK_RIGHT_PARENTHESIS);
            Statement(ctx);
            break;
        case Tokens.DO:
            Match(ctx);
            Statement(ctx)
            MatchToken(ctx, Tokens.WHILE);
            MatchToken(ctx, Tokens.TK_LEFT_PARENTHESIS);
            Expression(ctx);
            MatchToken(ctx, Tokens.TK_RIGHT_PARENTHESIS);
            MatchToken(ctx, Tokens.TK_SEMICOLON);
            break;
        case Tokens.FOR:
            Match(ctx);
            MatchToken(ctx, Tokens.TK_LEFT_PARENTHESIS);

            //primeira expressao do for
            if (Token(ctx) != Tokens.TK_SEMICOLON)
            {
                Expression(ctx);
            }
            MatchToken(ctx, Tokens.TK_SEMICOLON);

            //segudna expressao do for
            if (Token(ctx) != Tokens.TK_SEMICOLON)
            {
                Expression(ctx);
            }
            MatchToken(ctx, Tokens.TK_SEMICOLON);

            //terceira expressao do for
            if (Token(ctx) != Tokens.TK_RIGHT_PARENTHESIS)
            {
                Expression(ctx);
            }
            MatchToken(ctx, Tokens.TK_RIGHT_PARENTHESIS);
            Statement(ctx);
            break;
    }
}

function Labeled_Statement(ctx: Parser)
{
    /*
      labeled-statement:
       identifier : statement
       case constant-expression : statement
       default : statement
    */
    if (Token(ctx) == Tokens.TK_identifier)
    {
        //aqui nao eh um tipo
        Match(ctx);
        MatchToken(ctx, Tokens.TK_COLON);
        Statement(ctx);
    }
    else if (Token(ctx) == Tokens.TK_case)
    {
        Constant_Expression(ctx);
        MatchToken(ctx, Tokens.TK_COLON);
        Statement(ctx);
    }
    else if (Token(ctx) == Tokens.DEFAULT)
    {
        MatchToken(ctx, Tokens.TK_COLON);
        Statement(ctx);
    }

}

function Statement(ctx: Parser)
{
    var bResult = false;
    switch (Token(ctx))
    {
        //expression-statement        
        case Tokens.TK_LEFT_PARENTHESIS:
        case Tokens.TK_SEMICOLON:
        case Tokens.SIZEOF:
        case Tokens.PLUS_SIGN:
        case Tokens.TK_number:
        case Tokens.TK_string_literal:
            bResult = true;
            Expression_Statement(ctx);
            break;

        //compound-Statement
        case Tokens.TK_LEFT_CURLY_BRACKET:
            bResult = true;
            Compound_Statement(ctx);
            break;

        //labeled-statement
        case Tokens.TK_case:
        case Tokens.DEFAULT:
            bResult = true;
            Labeled_Statement(ctx);
            break;

        //labeled-statement
        case Tokens.TK_identifier:
            //se for seguido de :  eh label
            //label:
            bResult = true;
            Expression_Statement(ctx);
            //bResult = true;
            ///como sabe que nao eh expressao?
            //Labeled_Statement(ctx);
            break;

        //selection-statement
        case Tokens.SWITCH:
            bResult = true;
            Selection_Statement(ctx);
            break;

        case Tokens.IF:
            bResult = true;
            Selection_Statement(ctx);
            break;
                    
        case Tokens.ELSE:
            //Ele tem que estar fazendo os statement do IF!
            bResult = true;
            Match(ctx); //else
            //poderia retornar uma coisa so  p dizer q eh else
            //Statement(ctx);
            break;


        //iteration-statement
        case Tokens.WHILE:
        case Tokens.FOR:
        case Tokens.DO:
            bResult = true;
            Iteration_Statement(ctx);
            break;

        //jump-statement
        case Tokens.GOTO:
        case Tokens.CONTINUE:
        case Tokens.BREAK:
        case Tokens.RETURN:
            bResult = true;
            Jump_Statement(ctx);
            break;
    }
    return bResult;
}

function Block_Item(ctx: Parser)
{
    /*
      block-item: 
      declaration
      statement
    */

    if (Statement(ctx))
    {
        //retorna true e ja processou 
        //se era um statement
    }
    else
    {
        Declaration(ctx);
    }

}

function Block_Item_List(ctx: Parser)
{
    for (; ;)
    {
        Block_Item(ctx);
        if (Token(ctx) == Tokens.TK_RIGHT_CURLY_BRACKET)
        {
            //terminou
            break;
        }
        if (HasErrors(ctx))
            break;
    }
}

function Compound_Statement(ctx: Parser)
{
    /*
     compound-statement:
        { block-item-listopt }
    */
    MatchToken(ctx, Tokens.TK_LEFT_CURLY_BRACKET);

    if (Token(ctx) != Tokens.TK_LEFT_CURLY_BRACKET)
    {
        Block_Item_List(ctx);
    }

    MatchToken(ctx, Tokens.TK_RIGHT_CURLY_BRACKET);
}

function Struct_Or_Union(ctx: Parser)
{
    /*
      struct-or-union:
        struct
        union
    */
    switch (Token(ctx))
    {
        case Tokens.TK_struct:
        case Tokens.TK_union:
            Match(ctx);
            break;
        default:
            ASSERT(false);
            break;
    }
}

function Constant_Expression(ctx: Parser)
{
    //TODO por enquanto chama expression
    Expression(ctx);
}

function Static_Assert_Declaration(ctx: Parser)
{
    /*
        static_assert-declaration:
          _Static_assert ( constant-expression , string-literal ) ;
    */
    if (Token(ctx) == Tokens.TK__Static_assert)
    {
        Match(ctx);
        MatchToken(ctx, Tokens.TK_LEFT_PARENTHESIS);
        Constant_Expression(ctx);
        MatchToken(ctx, Tokens.TK_COMMA);
        MatchToken(ctx, Tokens.TK_string_literal);
        MatchToken(ctx, Tokens.TK_RIGHT_PARENTHESIS);
        MatchToken(ctx, Tokens.TK_SEMICOLON);
    }

}

function Specifier_Qualifier_List(ctx: Parser)
{
    /*specifier-qualifier-list:
      type-specifier specifier-qualifier-listopt
      type-qualifier specifier-qualifier-listopt
   */
    for (; ;)
    {
        if (Type_Specifier(ctx))
        {
        }
        else if (Type_Qualifier(ctx))
        {
        }
        else
        {
            break;
            //SetError(ctx, "expected type specifier or qualifier")
        }
    }
}

function Struct_Declarator(ctx: Parser)
{
    /**
    struct-declarator:
       declarator
       declaratoropt : constant-expression
    */

    if (Token(ctx) == Tokens.TK_COLON)
    {
        Match(ctx);
        Constant_Expression(ctx);
    }
    else
    {
        Declarator(ctx);
    }
}

function Struct_Declarator_List(ctx: Parser)
{
    /*
       struct-declarator-list:
         struct-declarator
         struct-declarator-list , struct-declarator
    */

    //tem 1 pelo menos
    Struct_Declarator(ctx);

    for (; ;)
    {
        if (Token(ctx) == Tokens.TK_COMMA)
        {
            //tem mais
            Match(ctx);
            Struct_Declarator_List(ctx);
        }
        else if (Token(ctx) == Tokens.TK_SEMICOLON)
        {
            //ok nao tem mais
            break;
        }
        else
        {
            SetError(ctx, "unexpected");
            ASSERT(false);
            break;
        }
    }
}

function Struct_Declaration(ctx: Parser)
{
    /**
     struct-declaration:
       specifier-qualifier-list struct-declarator-listopt ;
       static_assert-declaration
     */
    if (Token(ctx) != Tokens.TK__Static_assert)
    {
        //specifier
        Specifier_Qualifier_List(ctx);

        if (Token(ctx) != Tokens.TK_SEMICOLON)
        {
            //Eh estranho ser opcional
            //deve ser p atender o bit fields
            Struct_Declarator_List(ctx);
        }

        MatchToken(ctx, Tokens.TK_SEMICOLON);
    }
    else
    {
        Static_Assert_Declaration(ctx);
    }
}

function Struct_Declaration_List(ctx: Parser)
{
    /*
    struct-declaration-list:
       struct-declaration
       struct-declaration-list struct-declaration
    */
    for (; ;)
    {
        if (Token(ctx) == Tokens.TK_RIGHT_CURLY_BRACKET)
            break;
        if (HasErrors(ctx))
            break;
        Struct_Declaration(ctx);
    }
}

function Struct_Or_Union_Specifier(ctx: Parser)
{
    /*
     struct-or-union-specifier:
       struct-or-union identifieropt { struct-declaration-list }
       struct-or-union identifier
    */
    Struct_Or_Union(ctx);

    var tk = Token(ctx);
    Match(ctx);

    if (tk == Tokens.TK_identifier)
    {
        //ja foi feito match do identificador
        if (Token(ctx) == Tokens.TK_LEFT_CURLY_BRACKET)
        {
            Match(ctx);
            Struct_Declaration_List(ctx);
            MatchToken(ctx, Tokens.TK_RIGHT_CURLY_BRACKET);
        }
        else
        {
            //
        }
    }
    else if (tk == Tokens.TK_LEFT_CURLY_BRACKET)
    {
        //ja foi feito o Match do {
        Struct_Declaration_List(ctx);
        MatchToken(ctx, Tokens.TK_RIGHT_CURLY_BRACKET);
    }
    else
    {
        SetError(ctx, "expected name or {");
    }
}

function Enumeration_Constant(ctx: Parser)
{
    MatchToken(ctx, Tokens.TK_identifier);
}

function EnumeratorC(ctx: Parser)
{
    /*
      enumerator:
       enumeration-constant
       enumeration-constant = constant-expression
    */
    Enumeration_Constant(ctx);
    if (Token(ctx) == Tokens.TK_EQUALS_SIGN)
    {
        Match(ctx);
        Constant_Expression
    }
}

function Enumerator_List(ctx: Parser)
{
    /*
    enumerator-list:
    enumerator
    enumerator-list , enumerator
    */

    //pelo menos 1
    EnumeratorC(ctx);

    for (; ;)
    {
        if (Token(ctx) == Tokens.TK_COMMA)
        {
            //tem mais
            Match(ctx);

            //o enum aceita uma , no fim
            if (Token(ctx) != Tokens.TK_RIGHT_CURLY_BRACKET)
            {
                EnumeratorC(ctx);
            }
        }
        else
        {
            ASSERT(Token(ctx) == Tokens.TK_RIGHT_CURLY_BRACKET);
            //acabou
            break;
        }
    }
}
function Enum_Specifier(ctx: Parser)
{
    /*
    enum-specifier:
    enum identifieropt { enumerator-list }
    enum identifieropt { enumerator-list, }
    enum identifier
    */

    MatchToken(ctx, Tokens.TK_enum);

    var tk = Token(ctx);
    Match(ctx);

    if (tk == Tokens.TK_identifier)
    {
        //Ja fez Match do identifier        
        if (Token(ctx) == Tokens.TK_LEFT_CURLY_BRACKET)
        {
            Match(ctx);
            Enumerator_List(ctx);
            MatchToken(ctx, Tokens.TK_RIGHT_CURLY_BRACKET);
        }
        else
        {
            //enum identifier
            //                  ^
        }
    }
    else if (tk == Tokens.TK_LEFT_CURLY_BRACKET)
    {
        //ja foi feito o Match do {
        Enumerator_List(ctx);
        MatchToken(ctx, Tokens.TK_RIGHT_CURLY_BRACKET);
    }
    else
    {
        SetError(ctx, "expected enum name or {");
    }
}

function Function_Specifier(ctx: Parser): boolean
{
    /*
     function-specifier:
       inline
       _Noreturn
     */

    var bResult = false;
    switch (Token(ctx))
    {
        case Tokens.TK_inline:
        case Tokens.TK__Noreturn:
            Match(ctx);
            bResult = true;
            break;
    }
    return bResult;
}

function Storage_Class_Specifier(ctx: Parser): boolean
{
    /*
      storage - class-specifier:
        typedef
        extern
        static
        _Thread_local
        auto
        register
    */


    var bResult = false;
    switch (Token(ctx))
    {
        case Tokens.TK_typedef:
        case Tokens.TK_extern:
        case Tokens.TK_static:
        case Tokens.TK__Thread_local:
        case Tokens.TK_auto:
        case Tokens.TK_register:
            Match(ctx);
            bResult = true;
            break;
    }

    return bResult;
}

var s_out = "";

function Parameter_List(ctx: Parser)
{
    /*
      parameter-list:
        parameter-declaration
        parameter-list, parameter-declaration
    */

    if (Token(ctx) == Tokens.TK_RIGHT_PARENTHESIS)
    {
        //vazio
        return;
    }

    for (; ;)
    {
        //TODO se for ... para TODO

        Parameter_Declaration(ctx);
        if (Token(ctx) == Tokens.TK_COMMA)
        {
            Match(ctx);
            //tem mais
        }
        else
        {
            break;
        }
    }
}
function Parameter_Declaration(ctx: Parser)
{
    /*
     parameter-declaration:
       declaration-specifiers declarator
       declaration-specifiers abstract-declaratoropt
     */
    Declaration_Specifiers(ctx);
    Declarator(ctx);
    //TODO abstract-declaratoropt deve haver uma diferenca pequena
    //para declarator
}

function Parameter_Type_List(ctx: Parser)
{
    /*
    parameter-type-list:
      parameter-list
      parameter-list , ...
    */
    Parameter_List(ctx);
    //TODO pode ter um ... ainda
}

function Direct_Declarator(ctx: Parser)
{
    //
    //Referencia : The C Programming Language 2 edicao pag 122

    /*
    direct-declarator:
       identifier
       ( declarator )
       direct-declarator [ type-qualifier-listopt assignment-expressionopt ]
       direct-declarator [ static type-qualifier-listopt assignment-expression ]
       direct-declarator [ type-qualifier-list static assignment-expression ]
       direct-declarator [ type-qualifier-listopt * ]
       direct-declarator ( parameter-type-list )
       direct-declarator ( identifier-listopt )
    */

    if (Token(ctx) == Tokens.TK_LEFT_PARENTHESIS)
    {
        Match(ctx);
        Declarator(ctx);
        if (Token(ctx) != Tokens.TK_RIGHT_PARENTHESIS)
        {
            //erro
            SetError(ctx, "error: missing )");
        }
        Match(ctx);
    }
    else if (Token(ctx) == Tokens.TK_identifier)
    {
        Match(ctx);//nome
    }
    else
    {
        SetError(ctx, "error : expected name");
    }

    for (; ;)
    {
        if (Token(ctx) == Tokens.TK_LEFT_PARENTHESIS)
        {
            s_out += " function returning";

            Match(ctx);
            if (Token(ctx) != Tokens.TK_RIGHT_PARENTHESIS)
            {
                Parameter_Type_List(ctx);
            }
            MatchToken(ctx, Tokens.TK_RIGHT_PARENTHESIS);           
        }
        else if (Token(ctx) == Tokens.TK_LEFT_SQUARE_BRACKET)
        {
            //[
            Match(ctx);
            s_out += " Array";
            s_out += Lexeme(ctx);
            s_out += "] of";
            //]
            Match(ctx);
        }
        else
        {
            break;
        }
    }
}

function Type_Qualifier(ctx: Parser): boolean
{
    /*
     type-qualifier:
       const
       restrict
       volatile
       _Atomic
     */

    var bResult = false;

    if (Token(ctx) == Tokens.TK_const ||
        Token(ctx) == Tokens.TK_restrict ||
        Token(ctx) == Tokens.TK_volatile ||
        Token(ctx) == Tokens.TK__Atomic)
    {
        Match(ctx);
        bResult = true;
    }
    return bResult;
}

function Type_Qualifier_ListOpt(ctx: Parser)
{
    /*
       type-qualifier-list:
          type-qualifier
          type-qualifier-list type-qualifier
    */
    while (Type_Qualifier(ctx))
    {
    }
}

function PointerOpt(ctx: Parser): number
{
    /*
    pointer:
       * type-qualifier-listopt
       * type-qualifier-listopt pointer
    */
    var ns = 0;

    //Empilha pointer to
    while (Token(ctx) == Tokens.TK_ASTERISK)
    {
        Match(ctx);
        Type_Qualifier_ListOpt(ctx);
        ns++;
    }

    //Retorna numero de items empilhados
    return ns;
}

//pag 123 C
function Declarator(ctx: Parser)
{
    /*
    declarator:
       pointeropt direct-declarator
    */

    //Aqui tem que empilhar os ponteiros
    //pois o significado do apontado-para vem no fim 
    //na hora de desempilhar
    //retorna o numero de items empilhados
    var ns = PointerOpt(ctx);

    Direct_Declarator(ctx);

    //desempilhar apontado para
    while (ns--)
    {
        s_out += " pointer to";
    }
}

function Alignment_Specifier(ctx: Parser)
{
    var bResult = false;

    /*
       alignment - specifier:
         _Alignas(type - name)
         _Alignas(constant - expression)
    */
    if (Token(ctx) == Tokens.TK__Alignas)
    {
        MatchToken(ctx, Tokens.TK_LEFT_PARENTHESIS);
        ASSERT(false);//TODO
        MatchToken(ctx, Tokens.TK_RIGHT_PARENTHESIS);
        var bResult = true;
    }
    return bResult;
}

function Type_Specifier(ctx: Parser): boolean
{
    /*
     type-specifier:
       void
       char
       short
       int
       long
       float
       double
       signed
       unsigned
       _Bool
       _Complex
       atomic-type-specifier
       struct-or-union-specifier
       enum-specifier
       typedef-name
     */

    var bResult = false;
    switch (Token(ctx))
    {
        //type - specifier
        case Tokens.TK_void:
        case Tokens.TK_char:
        case Tokens.TK_short:
        case Tokens.TK_int:
        case Tokens.TK_long:
        case Tokens.TK_float:
        case Tokens.TK_double:
        case Tokens.TK_signed:
        case Tokens.TK_unsigned:
        case Tokens.TK__Bool:
        case Tokens.TK__Complex:
            bResult = true;
            Match(ctx);
            break;

        //atomic-type-specifier
        case Tokens.TK_struct:
        case Tokens.TK_union:
            bResult = true;
            Struct_Or_Union_Specifier(ctx);
            break;

        case Tokens.TK_enum:
            bResult = true;
            Enum_Specifier(ctx);
            //TODO
            break;

        case Tokens.TK_identifier:
            //se for um tipo conhecido retorna true senao false
            bResult = false;
            //TYPEDEF NAME
            break;
    }
    return bResult;
}

function Declaration_Specifiers(ctx: Parser)
{
    /*
     declaration-specifiers:
        storage-class-specifier declaration-specifiersopt
        type-specifier          declaration-specifiersopt
        type-qualifier          declaration-specifiersopt
        function-specifier      declaration-specifiersopt
        alignment-specifier     declaration-specifiersopt
    */

    for (; ;)
    {
        if (Storage_Class_Specifier(ctx) ||
            Type_Specifier(ctx) ||
            Type_Qualifier(ctx) ||
            Function_Specifier(ctx) ||
            Alignment_Specifier(ctx))
        {
            continue;
        }
        else
        {
            break;
        }
    }

    //TODO verificar constrains
}


function Assignment_Expression(ctx: Parser)
{
    //mesmo que expression por enquanto
    Expression(ctx);
}


function Initializer(ctx: Parser)
{
    /*
    initializer:
       assignment-expression
       { initializer-list }
       { initializer-list , }
    */
    if (Token(ctx) == Tokens.TK_LEFT_CURLY_BRACKET)
    {
        Match(ctx);
        Initializer_List(ctx);
        MatchToken(ctx, Tokens.TK_RIGHT_CURLY_BRACKET);
    }
    else
    {
        Assignment_Expression(ctx);
    }

}



function Initializer_List(ctx: Parser)
{
    /*
    initializer-list:
      designationopt initializer
      initializer-list , designationopt initializer
    */
    for (; ;)
    {
        if (Token(ctx) == Tokens.TK_LEFT_SQUARE_BRACKET ||
            Token(ctx) == Tokens.FULL_STOP)
        {
            Designation(ctx);
        }
        Initializer(ctx);
        if (Token(ctx) == Tokens.TK_COMMA)
        {
            Match(ctx);
            //tem mais
        }
        else
        {
            break;
        }
    }

}
function Designation(ctx: Parser)
{
    /*
    designation:
      designator-list =
    */
    Designator_List(ctx);
    MatchToken(ctx, Tokens.TK_EQUALS_SIGN);
}
function Designator_List(ctx: Parser)
{
    /*
    designator-list:
    designator
    designator-list designator
    */
    Designator(ctx);
    for (; ;)
    {
        if (Token(ctx) == Tokens.TK_LEFT_SQUARE_BRACKET ||
            Token(ctx) == Tokens.FULL_STOP)
        {
            Designator(ctx);
        }
        else
        {
            break;
        }
    }
}

function Designator(ctx: Parser)
{
    /*
    designator:
    [ constant-expression ]
    . identifier
    */
    if (Token(ctx) == Tokens.TK_LEFT_SQUARE_BRACKET)
    {
        Match(ctx);
        Constant_Expression(ctx);
        MatchToken(ctx, Tokens.TK_RIGHT_SQUARE_BRACKET);
    }
    else if (Token(ctx) == Tokens.FULL_STOP)
    {
        Match(ctx);
        MatchToken(ctx, Tokens.TK_identifier);
    }
}

function Init_Declarator(ctx: Parser)
{
    /*
      init-declarator:
        declarator
        declarator = initializer
    */
    Declarator(ctx);

    if (Token(ctx) == Tokens.TK_EQUALS_SIGN)
    {
        Match(ctx);
        Initializer(ctx);
    }
}

function Init_Declarator_List(ctx: Parser)
{
    /*
       init-declarator-list:
         init-declarator
         init-declarator-list , init-declarator
    */

    Init_Declarator(ctx);

    for (; ;)
    {
        if (Token(ctx) == Tokens.TK_SEMICOLON)
        {
            //terminou
            break;
        }
        else if (Token(ctx) == Tokens.TK_LEFT_CURLY_BRACKET)
        {
            //terminou
            break;
        }
        else if (Token(ctx) == Tokens.TK_COMMA)
        {
            Match(ctx);
            Init_Declarator(ctx);
        }
        else
        {
            //quando coloca o corpo da funcao
            //ele cai aqui..isso nao eh erro tem que ter uma forma de informar.
            SetError(ctx, "?");
            break;
        }
    }
}

function Declaration(ctx: Parser)
{
    /*
     declaration:
        declaration-specifiers init-declarator-listopt ;
        static_assert-declaration
    */

    if (Token(ctx) == Tokens.TK__Static_assert)
    {
        Static_Assert_Declaration(ctx);
    }
    else
    {
        Declaration_Specifiers(ctx);
        if (Token(ctx) == Tokens.TK_SEMICOLON)
        {
            //terminou
            Match(ctx);
        }
        else
        {
            Init_Declarator_List(ctx);
            if (Token(ctx) == Tokens.TK_LEFT_CURLY_BRACKET)
            {
                //significa que eh uma funcao
                Compound_Statement(ctx);
            }
        }
    }
}

function Parse_Declarations(ctx: Parser)
{
    for (; ;)
    {
        Declaration(ctx);

        if (Token(ctx) == Tokens.EOF)
        {
            break;
        }

        if (HasErrors(ctx))
            break;
    }
}

function Main_Main(ctx: Parser)
{
    Parse_Declarations(ctx);
}
