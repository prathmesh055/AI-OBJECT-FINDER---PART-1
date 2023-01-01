status="";
objects =[];

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}


function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name=document.getElementById("object_name").value;
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for (i =0; i< objects.lenght; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Deteched";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+ objects.lenght;

            FileList("FF0000");
            percent = floor(objects[i].confidence * 100);
            Text(objects[i].label +""+percent + "%",objects[i].x +15, objects[i].y +15);
            nofill();
            stroke("#ff0000");
            Reflect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}

function gotResult(error, results)
  {
    if(error)
    {
        console.log(error);
   }
   console.log(results);
   objects = results;
  }