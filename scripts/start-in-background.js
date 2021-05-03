var WshShell = WScript.CreateObject("WScript.Shell");
var exeStr = "npm start";
var windowStyle = 1;
var WshProcessEnv = WshShell.Environment("PROCESS");

WshShell.Run(exeStr, windowStyle, false);