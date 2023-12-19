const ffmpeg = require("fluent-ffmpeg");
const path = require("node:path");

try {
  ffmpeg(path.join(__dirname, "/videoSrc/targetVideo.mp4"))
    .noAudio()
    .seek("2:07.000")
    .duration(30)
    .screenshots({
      count: 30,
      filename: "thumbnail-at-%s-seconds.png",
      folder: path.join(__dirname, "/imageOutputFromVideo"),
      size: "1280x700"
    });
} catch (e) {
  console.log(e.code);
  console.log(e.msg);
}
