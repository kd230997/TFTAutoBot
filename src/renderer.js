import cv from "@techstark/opencv-js";

(async () => {
  //#region Get Camera Devices
  const videoSource = document.getElementById("videoInput");
  let cap;
  let frame, dst;
  const FPS = 30;

  const stream = await navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .catch(function (err) {
      console.log(err);
    });

  videoSource.srcObject = stream;
  videoSource.play();
  //#endregion

  videoSource.addEventListener("loadedmetadata", function () {
    // Now the video's metadata is loaded
    // We can now access video's width and height
    videoSource.width = videoSource.videoWidth;
    videoSource.height = videoSource.videoHeight;
    cap = new cv.VideoCapture(videoSource);
    frame = new cv.Mat(
      videoSource.videoHeight,
      videoSource.videoWidth,
      cv.CV_8UC4
    );
    dst = new cv.Mat(
      videoSource.videoHeight,
      videoSource.videoWidth,
      cv.CV_8UC1
    );

    // Start the video processing after the metadata is loaded
    startVideoProcessing();
  });

  function startVideoProcessing() {
    if (typeof cap !== "undefined" && cap !== null) {
      // Processing logic goes here
      processVideo();
    }
  }

  function processVideo() {
    try {
      let begin = Date.now();
      // start processing.
      cap.read(frame);
      cv.cvtColor(frame, dst, cv.COLOR_RGBA2GRAY);
      cv.imshow("canvasOutput", dst);
      // schedule the next one.
      let delay = 1000 / FPS - (Date.now() - begin);
      setTimeout(processVideo, delay);
    } catch (err) {
      throw err;
    }
  }

  // schedule the first one.
})();
