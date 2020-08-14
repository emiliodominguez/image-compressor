import React, { Component } from "react";
import ImageCompressionService from "../services/CompressionService";
import { convertBytesToMb } from "../shared";
import FileInput from "./FileInput/FileInput";
import QualitySelector from "./QualitySelector";
import ImagesList from "./ImagesList";
import styles from "./Main.module.scss";
import ScaleSelector from "./ScaleSelector";

const INITIAL_STATE = {
    compressedImages: [],
    quality: 0.5,
    scale: 1
};

class Main extends Component {
    state = INITIAL_STATE;

    resetApp = () => {
        this.setState(INITIAL_STATE);
    };

    setImages = images => {
        images.forEach(image => this.compressImage(image));
    };

    setQuality = value => {
        let quality = this.checkRanges(value, 0, 1);
        this.setState({ quality });
    };

    setScale = value => {
        let scale = this.checkRanges(value, 0.1, 1);
        this.setState({ scale });
    };

    compressImage = image => {
        const { quality, scale } = this.state;
        const { compress } = ImageCompressionService;

        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onloadend = async () => {
            const isGif = image.type.split("/")[1] === "gif";

            if (isGif) {
                alert("GIF unsupported 🤷‍♂️");
            } else {
                const params = [fileReader.result, image.type, quality, scale];
                const { compressedImage, compressedSize } = await compress(...params);

                this.setState(prevState => ({
                    compressedImages: [
                        ...prevState.compressedImages,
                        {
                            src: compressedImage,
                            name: image.name,
                            type: image.type,
                            size: convertBytesToMb(image.size),
                            compressedSize
                        }
                    ]
                }));
            }
        };
    };

    downloadAllImages = () => {
        const { compressedImages } = this.state;

        if (compressedImages.length === 0) return;

        let images = [];
        let link = document.createElement("a");

        compressedImages.forEach(({ src, name, size, compressedSize }) => {
            if (compressedSize < size) images.push({ name, src });
        });

        for (let { name, src } of images) {
            link.setAttribute("download", name);
            link.setAttribute("href", src);
            link.click();
        }
    };

    checkRanges = (value, min, max) => {
        switch (value) {
            case value > max:
                return max;
            case value < min:
                return min;
            default:
                return parseFloat(value);
        }
    };

    render() {
        const { compressedImages, quality, scale } = this.state;

        return (
            <div className={styles.mainWrapper}>
                <div className={styles.inputsControlGroup}>
                    <QualitySelector quality={quality} setQuality={this.setQuality} />
                    <ScaleSelector scale={scale} setScale={this.setScale} />
                </div>

                <FileInput noImages={compressedImages.length === 0} setImages={this.setImages} />

                {compressedImages.length > 0 && (
                    <>
                        <ImagesList images={compressedImages} />

                        <div className={styles.actionsControlGroup}>
                            <button onClick={this.downloadAllImages}>Download all</button>
                            <button onClick={this.resetApp}>Reset</button>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default Main;
