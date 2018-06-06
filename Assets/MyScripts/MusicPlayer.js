#pragma strict
import System.IO;
import UnityEngine.UI;

var StartName:String;
var StartCode:String;
var UpdateName:String;
var UpdateCode:String;

var targetFilename : String;
var urlBase : String;
var MusicLength:float;

var clip : AudioClip;
private var message = "";

private function GetCachedFilePath() 
{
    return System.IO.Path.Combine(Application.temporaryCachePath, targetFilename);
}

private function TryLoadAndPlay() 
{
//	var cachePath=Application.dataPath + "/StreamingAssets/Music.ogg";
	var cachePath=Application.dataPath + "/StreamingAssets/"+ targetFilename;
	
    //message += "Checking cached file (" + cachePath + ")\n"; print(message);
    var www = WWW("file:" + cachePath);
    
    yield www;

    if (www.error) 
	{
		print("ooops");
    } 
	else 
	{
		clip = www.GetAudioClip(false, true);
		MusicLength=clip.length;
        while (true) 
		{
            GetComponent.<AudioSource>().PlayOneShot(clip);
            yield WaitForSeconds(clip.length);
        }
    }
}
function Start() 
{
	StartCode=ReadScript("MusicPlayerStart.txt");
	UpdateCode=ReadScript("MusicPlayerUpdate.txt");

	eval(StartCode);
    yield TryLoadAndPlay();
	print(urlBase + targetFilename);
    var www = WWW(urlBase + targetFilename);
    yield www;
    if (www.error) 
	{
    } 
	else 
	{
        System.IO.File.WriteAllBytes(GetCachedFilePath(), www.bytes);
        
        yield TryLoadAndPlay();
    }
}
function ReadScript(ScriptName:String):String
{
	var ScriptCode:String;
	var fn=Application.dataPath + "/StreamingAssets/"+ScriptName;
	if(System.IO.File.Exists(fn)){var sr0 = new StreamReader(fn);ScriptCode = sr0.ReadToEnd(); sr0.Close();}
	//print(ScriptCode);
	return ScriptCode;
}
