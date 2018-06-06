#pragma strict
import System.IO;

var Target : GameObject;
var StartName:String;
var StartCode:String;
var UpdateName:String;
var UpdateCode:String;

//var MyCamera:Camera;
var TIME:int;
var CamState:int;
var horizontalSpeed : float = 40.0;
var verticalSpeed : float = 40.0;
var minFov: float = 10f;
var maxFov: float = 90f;
var sensi1: float = 1f;
var sensi2: float = 10f;
var fov: float;
function Start () 
{
	TIME=0;
	StartName="Camera02Start.txt";
	StartCode=ReadScript(StartName);
	UpdateName="Camera02Update.txt";
	UpdateCode=ReadScript(UpdateName);

	eval(StartCode);
}

function Update () 
{
	eval(UpdateCode);
}
function ReadScript(ScriptName:String):String
{
	var ScriptCode:String;
	var fn=Application.dataPath + "/StreamingAssets/"+ScriptName;
	if(System.IO.File.Exists(fn)){var sr0 = new StreamReader(fn);ScriptCode = sr0.ReadToEnd(); sr0.Close();}
	//print(ScriptCode);
	return ScriptCode;
}
function cos(phi:float) : float
{
	return Mathf.Cos(phi);
}
function sin(phi:float) : float
{
	return Mathf.Sin(phi);
}
function atan(x:float,y:float) : float
{
	return Mathf.Atan2(x,y);
}
function abs(x:float) : float
{
	return Mathf.Abs(x);
}
function min(x:float,y:float) : float
{
	return Mathf.Min(x,y);
}
