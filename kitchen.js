Status = "";
kitchen_image = "";
objects="";

function preload(){
    kitchen_image = loadImage("kitchen.jpeg");
}

function setup(){
    canvas = createCanvas(700,500);
    canvas.position(390,250);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(kitchen_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(kitchen_image,0,0,700,500);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("black");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x , objects[i].y );
    noFill();
            stroke("black");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height );
        }
    }
}