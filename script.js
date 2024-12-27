const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'), //smaller and quicker face detector which runs real time
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'), //register different parts of face such as eyebrows,mouth etc
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'), // helps api recognition face with a box around it
    faceapi.nets.faceExpressionNet.loadFromUri('/models'), // helps api recognize and distinghuish between different facial expressions -> happy/sad etc
]).then(startVideo)
function startVideo(){
    navigator.getUserMedia(
        {video:{}},
        stream => video.srcObject = stream,
        err=>console.error(err)
    )
}

video.addEventListener('play',()=>{
    console.log('running')
})