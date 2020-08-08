import React from "react";
import styles from "./ImagesList.module.scss";

const ImagesList = ({ images }) => {
    return (
        <ul>
            {images?.map((image, i) => (
                <li key={i}>
                    <img src={image.src} alt={image.name} />
                    <span>{image.name}</span>
                    <em>{`${image.size} MB`}</em>
                    {image.compressedSize && <em>{`${image.compressedSize} MB`}</em>}
                </li>
            ))}
        </ul>
    );
};

export default ImagesList;
