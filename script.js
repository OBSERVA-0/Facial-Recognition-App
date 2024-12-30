const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),  //handles the detection of face
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'), // disntinguishes between different features of your face such as the nose, eyes, mouth etc
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'), // puts face in a box and tracks the movement at all times
    faceapi.nets.faceExpressionNet.loadFromUri('/models') //handles facial expressions and classifies them under emotions such as happy sad,etc
]).then(startVideo)

function startVideo(){
    navigator.getUserMedia(
        {video:{}},
        stream => video.srcObject = stream,
        err=>console.error(err)
    )
} // starts user's video on launch

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections) //detects face and puts it in a box
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections) // draws different facial features 
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections) // displays emotion
    }, 100)
  })
  // event listener for playing video and displaying on screen with emotional states potrayed along with the accuracy of it or how sure it is of that emotion
