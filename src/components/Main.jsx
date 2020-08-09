import React, { Component } from "react";
import ImageCompressionService from "../services/CompressionService";
import { convertBytesToMb } from "../shared";
import FileInput from "./FileInput/FileInput";
import QualitySelector from "./QualitySelector";
import ImagesList from "./ImagesList";
import styles from "./Main.module.scss";

class Main extends Component {
    state = {
        images: [],
        quality: 0.5,
    };

    setImages = async (src, image) => {
        const { quality } = this.state;
        const { compress } = ImageCompressionService;
        const { compressedImage, compressedSize } = await compress(src, image.type, quality);

        this.setState(prevState => ({
            images: [
                ...prevState.images,
                {
                    src: compressedImage,
                    name: image.name,
                    type: image.type,
                    size: convertBytesToMb(image.size),
                    compressedSize: compressedSize,
                },
            ],
        }));
    };

    setQuality = value => {
        let quality = parseFloat(value);

        if (quality > 1) quality = 1;
        else if (quality < 0) quality = 0;

        this.setState({ quality });
    };

    resetApp = () => {
        this.setState({
            images: [],
            quality: 0.5,
        });
    };

    render() {
        const { images, quality } = this.state;

        return (
            <div className={styles.mainWrapper}>
                <QualitySelector quality={quality} setQuality={this.setQuality} />
                <FileInput images={images} setImages={this.setImages} />
                <ImagesList images={images} />

                {images.length > 0 && <button onClick={this.resetApp}>Clear list</button>}
            </div>
        );
    }
}

export default Main;
