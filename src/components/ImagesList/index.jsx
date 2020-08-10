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
            {images.map(({ src, name, size, compressedSize }, i) => {
                const wasCompressed = compressedSize < size;

                return (
                    <tr key={i}>
                        <td>
                            <ImageItem {...{ src, name }} />
                        </td>

                        <td>
                            <p title={name}>{name}</p>
                        </td>

                        <td className={styles.size}>
                            {`${size} mb`}
                        </td>

                        {wasCompressed && (
                            <>
                                <td className={[ styles.size, wasCompressed ? styles.compressed : "" ].join(" ")}>
                                    {`${compressedSize} mb`}
                                </td>

                                <td className={[styles.size, wasCompressed ? styles.diff : ""].join(" ")}>
                                    {`${(size - compressedSize).toFixed(2)} mb`}
                                </td>

                                <td>
                                    <a href={src} download={name} title="Download">{downloadIcon}</a>
                                </td>
                            </>
                        )}

                        {!wasCompressed && <td colSpan={3}>The image wasn't compressed...</td>}
                    </tr>
                );
            })}
        </tbody>
    </table>
);

export default ImagesList;
