#pragma strict
import System.IO;
import UnityEngine.UI;

var StartName:String;
var StartCode:String;
var UpdateName:String;
var UpdateCode:String;

var Drones:GameObject;
var DroneParams:DroneParams;

var Music:GameObject;
var MusicScript:MusicPlayer;
var MusicFile:String;
var MusicLength:float;

var Light00:GameObject;
var Light00PointLight:Light;
var Light01:GameObject;
var Light01PointLight:Light;
var Light02:GameObject;
var Light02PointLight:Light;
var Light03:GameObject;
var Light03PointLight:Light;
var Light04:GameObject;
var Light04PointLight:Light;

var Boids:GameObject[];
var Dancers:GameObject[];
var Dancer:GameObject;
var DanceParent:GameObject;
var DanceCenter:GameObject;
var agent: UnityEngine.AI.NavMeshAgent;
var NDancers:int;
var CNT:int;
var x0:float;
var z0:float;
private var n:int;

function Start()
{
	CNT=0;
	StartCode=ReadScript("MyControllerStart.txt");
	UpdateCode=ReadScript("MyControllerUpdate.txt");

	eval(StartCode);
}
function Update()
{
	print(Time.time);
	CNT=CNT+1;
	if(CNT==1)
	{
		Boids=GameObject.FindGameObjectsWithTag("Boid");
		NDancers=Boids.Length;
		for(n=0;n<NDancers;n++)
		{
			Dancers[n]=Instantiate(Dancer,Vector3(Random.Range(-30.0f,30.0f),20,Random.Range(-30.0f,30.0f)), Boids[n].transform.rotation);
			Dancers[n].transform.SetParent(DanceParent.transform);
		}
		Destroy(Dancer);
	}
	for(n=0;n<NDancers;n++)
	{
		var Target1=Vector3(Boids[n].transform.position.x,20,Boids[n].transform.position.z);
		Dancers[n].GetComponent.<UnityEngine.AI.NavMeshAgent>().SetDestination(Target1);
	}
	var NCen=1;
	x0=0;
	z0=0;
	for(n=0;n<NCen;n++)
	{
		x0=x0+Dancers[n].transform.position.x;
		z0=z0+Dancers[n].transform.position.z;
	}
	DanceCenter.transform.position=Vector3(x0/NCen,30,z0/NCen);

	MusicLength=MusicScript.MusicLength;
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
