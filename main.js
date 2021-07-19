song = "";
function preload() {
    song = loadSound("music.mp3");
}
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded() {
    console.log("Posenet is initialized");
}
function gotPoses(results) {
    if (results.length > 0) {

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        removeDecimals = floor(InNumberleftWristY);
        volume  = removeDecimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}
