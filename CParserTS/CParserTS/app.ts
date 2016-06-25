var s_files = {};

function FileToStrBuilder(fileName: string, strBuilder: StrBuilder)
{
    strBuilder.js_text = s_files[fileName];
}
var s_WriteOutputString = "";
function Write(s: string)
{
    s_WriteOutputString += s;
}
function WriteLine(s: string)
{
    s_WriteOutputString += s + "\n";
}


function ButtonClick()
{
    s_WriteOutputString = "";
    s_files["main.c"] = (<HTMLInputElement> document.getElementById("InputText")).value;
    Main();
    (<HTMLInputElement> document.getElementById("OuputText")).value = s_WriteOutputString;
}

window.onload = () => {
   
};