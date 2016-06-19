var s_files = {};

function FileToStrBuilder(fileName: string, strBuilder: StrBuilder)
{
    strBuilder.js_text = s_files[fileName];
}
var s_out = "";
function Write(s: string)
{
    s_out += s;
}
function WriteLine(s: string)
{
    s_out += s + "\n";
}


function ButtonClick()
{
    s_out = "";
    s_files["main.c"] = (<HTMLInputElement> document.getElementById("InputText")).value;
    Main();
    (<HTMLInputElement> document.getElementById("OuputText")).value = s_out;
}

window.onload = () => {
   
};