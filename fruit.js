Status = "";
fruit_image = "";
objects="";

function preload(){
    fruit_image = loadImage("fruit.jpeg");
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.position(470,250);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(fruit_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(fruit_image,0,0,500,500);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x +50, objects[i].y+50 );
            noFill();
            stroke("#fc0303");
            rect(objects[i].x +50, objects[i].y +50, objects[i].width , objects[i].height );
        }
    }
}