import React, { Component } from "react";
import { convertBytesToMb } from "../shared";
import FileInput from "./FileInput/FileInput";
import styles from "./Main.module.scss";
import QualitySelector from "./QualitySelector";
import ImagesList from "./ImagesList";
import ImageCompressionService from "../services/CompressionService";

class Main extends Component {
    state = {
        images: [],
        // quality: 0.5,
    };

    setImages = async (src, image) => {
        // const { quality } = this.state;
        const { compress } = ImageCompressionService;
        const { compressedImage, compressedSize } = await compress(src, image.type /* quality */);

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

    // setQuality = quality => {
    //     this.setState({ quality });
    // };

    resetApp = () => {
        this.setState({
            images: [],
            // quality: 0.5,
        });
    };

    render() {
        const { images /* quality */ } = this.state;

        return (
            <div className={styles.mainWrapper}>
                {/* <QualitySelector quality={quality} setQuality={this.setQuality} /> */}
                <FileInput setImages={this.setImages} />
                <ImagesList images={images} />

                <button onClick={this.resetApp}>Clear list</button>
            </div>
        );
    }
}

export default Main;
