import React from "react";
import { imageIcon } from "../../constants/icons";
import styles from "./FileInput.module.scss";

const FileInput = ({ noImages, setImages }) => (
    <div className={styles.fileInput}>
        {noImages && imageIcon}

        <p>
            Click here to browse <b>images</b>
            <small>Drag and Drop coming soon</small>
        </p>

        <input
            type="file"
            accept="image/*"
            multiple
            onChange={({ target }) => {
                setImages([...target.files]);
                target.value = null;
            }}
        />
    </div>
);

export default FileInput;
