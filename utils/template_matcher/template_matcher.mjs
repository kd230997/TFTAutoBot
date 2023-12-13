import Jimp from 'jimp';

async function processImage() {
    try {
        // Load a local image file with Jimp. It supports jpg, png, bmp, tiff, and gif:
        const jimpSrc = await Jimp.read('utils/template_matcher/images/lena.jpg');

        // Create a cv:Mat from the Jimp image data
        const src = cv.matFromImageData(jimpSrc.bitmap);

        // Following lines are a copy&paste of opencv.js dilate tutorial:
        const dst = new cv.Mat();
        const M = cv.Mat.ones(5, 5, cv.CV_8U);
        const anchor = new cv.Point(-1, -1);
        cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

        // Create a Jimp image from the cv:Mat data
        const jimpDst = new Jimp({
            width: dst.cols,
            height: dst.rows,
            data: Buffer.from(dst.data),
        });

        // Write the Jimp image to disk
        await jimpDst.writeAsync('images/output.png');

        // Clean up resources
        src.delete();
        dst.delete();
    } catch (error) {
        console.error('Error processing image:', error);
    }
}

export default processImage;