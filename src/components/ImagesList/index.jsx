import React from "react";
import { downloadIcon } from "../../constants/icons";
import ImageItem from "./ImageItem";
import styles from "./ImagesList.module.scss";

const ImagesList = ({ images }) => (
    <table>
        <thead>
            <tr>
                <th>Thumbnail</th>
                <th>File name</th>
                <th>Original size</th>
                <th>Compressed size</th>
                <th>Diff size</th>
                <th>Download</th>
            </tr>
        </thead>

        <tbody>
            {images.map((image, i) => (
                <tr key={i}>
                    <td>
                        <ImageItem src={image.src} name={image.name} />
                    </td>

                    <td>
                        <p title={image.name}>{image.name}</p>
                    </td>

                    <td className={styles.size}>{`${image.size} mb`}</td>

                    <td className={[styles.size, styles.compressed].join(" ")}>
                        {`${image.compressedSize} mb`}
                    </td>

                    <td className={[styles.size, styles.diff].join(" ")}>
                        {`${(image.size - image.compressedSize).toFixed(2)} mb`}
                    </td>

                    <td>
                        <a href={image.src} download={image.name} title="Download">
                            {downloadIcon}
                        </a>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default ImagesList;
