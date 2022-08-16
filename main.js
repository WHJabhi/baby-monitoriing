status = "";
song = "";
objects = [];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}

function modelLoded(){
    console.log("Model Loaded");
    status = true;
}

function gotresult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function preload(){
    song = loadSound('friend.mp3');
}
function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video,gotresult);
        console.log(objects);

        for(var i = 0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("no_of_objects").innerHTML = "person found";
                song.stop();
            }
            else{
                document.getElementById("no_of_objects").innerHTML = "person not found";
                song.play();
            }
            if(objects.length == 0){
                document.getElementById("no_of_objects").innerHTML = "person not found";
                song.play();
            }
        }
    }
}