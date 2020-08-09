import React, { useState } from "react";
import styles from "./ImageItem.module.scss";

const ImageItem = ({ src, name }) => {
    const [imageLoaded, toggleImageLoaded] = useState(false);

    return (
        <div className={[styles.image, imageLoaded ? styles.imageLoaded : ""].join(" ")}>
            {!imageLoaded && <div className="spinner" />}
            <img src={src} alt={name} onLoad={() => toggleImageLoaded(true)} />
            <img className={styles.preview} src={src} alt={name} />
        </div>
    );
};

export default ImageItem;
