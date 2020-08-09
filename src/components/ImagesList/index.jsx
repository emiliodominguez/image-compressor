import React from "react";
import "./ImagesList.module.scss";

const ImagesList = ({ images }) => {
    return (
        images.length > 0 && (
            <table>
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>File name</th>
                        <th>Initial size</th>
                        <th>Compressed size</th>
                        <th>Diff size</th>
                        <th>Download</th>
                    </tr>
                </thead>

                <tbody>
                    {images.map((image, i) => (
                        <tr key={i}>
                            <td>
                                <img src={image.src} alt={image.name} />
                            </td>
                            <td>{image.name}</td>
                            <td>{`${image.size} MB`}</td>
                            <td>{`${image.compressedSize} MB`}</td>
                            <td>{`${(image.size - image.compressedSize).toFixed(2)} MB`}</td>
                            <td>
                                <a href={image.src} download={image.name}>
                                    Download
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    );
};

export default ImagesList;
