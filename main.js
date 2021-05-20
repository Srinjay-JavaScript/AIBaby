status = "";
buzzer = "";
object = [];
function preload(){buzzer = loadSound("buzz.mp3");}
function setup(){canvas = createCanvas(650, 400);canvas.center();video = createCapture(VIDEO);video.center();video.hide();
    objectDetector = ml5.objectDetector('cocossd', loaded);
    document.getElementById("d1-status").innerHTML = "Status: Detecting Object";
}
function draw(){
    image(video, 0, 0, 650, 400);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotObject);
        for( i = 0; i < object.length; i++){
            fill(r, g, b);
            x = object[i].x;
            y = object[i].y;
            w = object[i].width;
            h = object[i].height;
            percentage = Math.floor(object[i].confidence * 100);
            if(object[i].label == "person"){
                buzzer.stop();
               text("Person" + " " + percentage + "%", x+10, y+20);
               textStyle(BOLD);
               textSize(20);
               stroke(r, g, b);
               noFill();
               rect(x, y, w, h);
               document.getElementById("d2-result").innerHTML = "Baby Detected";
            }
            else{
                buzzer.play();
                
                document.getElementById("d2-result").innerHTML = "Baby not found";
            }
            document.getElementById("d1-status").innerHTML = "Status: Object Detected";
           
    
        }
    }
 
}
function loaded(){
    console.log("Cocossd is loaded.");
    status = true;   
}
function gotObject(error, results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
    
}
