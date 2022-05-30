Status = "";
bed_image = "";
objects="";

function preload(){
    bed_image = loadImage("bed.jpeg");
}

function setup(){
    canvas = createCanvas(700,370);
    canvas.position(390,250);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(bed_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(bed_image,0,0,700,370);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

           fill("white");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x , objects[i].y );
            noFill();
            stroke("white");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height );
        }
    }
}