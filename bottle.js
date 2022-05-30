Status = "";
bottle_image = "";
objects="";

function preload(){
    bottle_image = loadImage("bottle.jpeg");
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.position(450,250);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(bottle_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(bottle_image,0,0,500,500);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

           fill("white");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x -200, objects[i].y-300 );
            noFill();
            stroke("white");
            rect(objects[i].x -200, objects[i].y-300 , objects[i].width-100 , objects[i].height -500);
        }
    }
}