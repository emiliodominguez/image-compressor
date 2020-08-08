import { getCompressedImageSize } from "../shared";

class AppImageCompressionService {
    constructor() {
        this.compress = this.compress.bind(this);
    }

    /**
     * Compresses an image using Canvas API
     *
     * @param {string} src     - The image source
     * @param {string} type    - The image type
     * @param {number} quality - The quality of the compression
     */
    compress = (src, type, quality = 0.5) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = document.createElement("img");

        img.src = src;

        return new Promise((resolve, reject) => {
            img.onload = () => {
                const width = img.width;
                const height = img.height;

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                const base64String = canvas
                    .toDataURL(type, quality)
                    .replace(type, "image/octet-stream");

                resolve({
                    compressedImage: base64String,
                    compressedSize: getCompressedImageSize(base64String),
                });
            };

            img.onerror = error => reject(error);
        });
    };
}

const ImageCompressionService = new AppImageCompressionService();
export default ImageCompressionService;
