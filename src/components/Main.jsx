import React, { Component } from "react";
import ImageCompressionService from "../services/CompressionService";
import { convertBytesToMb } from "../shared";
import FileInput from "./FileInput/FileInput";
import QualitySelector from "./QualitySelector";
import ImagesList from "./ImagesList";
import styles from "./Main.module.scss";

class Main extends Component {
    state = {
        compressedImages: [],
        quality: 0.5,
    };

    setImages = images => {
        const { quality } = this.state;
        const { compress } = ImageCompressionService;

        images.forEach(image => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.onloadend = async () => {
                const { compressedImage, compressedSize } = await compress(
                    fileReader.result,
                    image.type,
                    quality
                );

                this.setState(prevState => ({
                    compressedImages: [
                        ...prevState.compressedImages,
                        {
                            src: compressedImage,
                            name: image.name,
                            type: image.type,
                            size: convertBytesToMb(image.size),
                            compressedSize,
                        },
                    ],
                }));
            };
        });
    };

    setQuality = value => {
        let quality = parseFloat(value);

        if (quality > 1) quality = 1;
        else if (quality < 0) quality = 0;

        this.setState({ quality });
    };

    downloadAllImages = () => {
        const { compressedImages } = this.state;

        if (compressedImages.length === 0) return;

        let images = [];
        let link = document.createElement("a");

        compressedImages.forEach(({ src, name }) => images.push({ name, src }));

        for (let { name, src } of images) {
            link.setAttribute("download", name);
            link.setAttribute("href", src);
            link.click();
        }
    };

    resetApp = () => {
        this.setState({
            compressedImages: [],
            quality: 0.5,
        });
    };

    render() {
        const { compressedImages, quality } = this.state;

        return (
            <div className={styles.mainWrapper}>
                <QualitySelector quality={quality} setQuality={this.setQuality} />
                <FileInput noImages={compressedImages.length === 0} setImages={this.setImages} />

                {compressedImages.length > 0 && (
                    <>
                        <ImagesList images={compressedImages} quality={quality} />

                        <div className={styles.actionsWrapper}>
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
