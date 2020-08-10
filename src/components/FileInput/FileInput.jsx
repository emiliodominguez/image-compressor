import React from "react";
import { imageIcon } from "../../constants/icons";
import styles from "./FileInput.module.scss";

const FileInput = ({ noImages, setImages }) => {
    const fileTypes = [
        // "image/gif",
        "image/apng",
        "image/bmp",
        "image/jpeg",
        "image/jpg",
        "image/pjpeg",
        "image/png",
        "image/tiff",
        "image/webp"
    ];

    const handleInputChange = ({ target }) => {
        setImages([...target.files]);
        target.value = null;
    };

    return (
        <div className={styles.fileInput}>
            {noImages && imageIcon}

            <p>
                Click here to browse <b>images</b>
                <small>Drag and Drop coming soon</small>
            </p>

            <input type="file" accept={fileTypes.join(",")} multiple onChange={handleInputChange} />
        </div>
    );
};

export default FileInput;
