const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");
const mobilenet = require("@tensorflow-models/mobilenet");

async function loadImages(directory) {
  const images = [];
  const labels = [];
  const categories = fs.readdirSync(directory);

  categories.forEach((category, index) => {
    const dir = path.join(directory, category);
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const imgBuffer = fs.readFileSync(path.join(dir, file));
      const imgTensor = tf.node
        .decodeImage(imgBuffer)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();
      images.push(imgTensor);
      labels.push(index);
    });
  });

  return {
    images: tf.concat(images),
    labels: tf.oneHot(tf.tensor1d(labels, "int32"), categories.length),
  };
}

function createModel(numClasses) {
  const model = tf.sequential();
  model.add(
    tf.layers.conv2d({
      inputShape: [224, 224, 3],
      filters: 32,
      kernelSize: 3,
      activation: "relu",
    })
  );
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(
    tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: "relu" })
  );
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 128, activation: "relu" }));
  model.add(tf.layers.dense({ units: numClasses, activation: "softmax" }));

  return model;
}

async function predict(imageTensor, model) {
  const prediction = await model.predict(imageTensor);
  // Process the prediction results as needed
  console.log(prediction);

  return prediction;
}

function getPath(filePath) {
  return path.join(__dirname, filePath);
}

(async () => {
  const imagePath = getPath(
    "/data/labeledImage/YasouTrueDamage/4fd1e25787428b847cce09e84ff61582.jpg"
  ); // Replace with your image path
  const imageTensor = await loadImage(imagePath);
  const model = await loadModel();

  const predictResult = await model.classify(imageTensor);

  console.log(predictResult);
})();
