import React, { useRef } from "react";
import { imageIcon } from "../../constants/icons";
import styles from "./FileInput.module.scss";

const SUPPORTED_TYPES = [
    "image/apng",
    "image/bmp",
    "image/jpeg",
    "image/jpg",
    "image/pjpeg",
    "image/png",
    "image/tiff",
    "image/webp",
];

const stylesState = {
    add: "ADD",
    remove: "REMOVE",
};

const FileInput = ({ noImages, setImages }) => {
    const input = useRef();

    const handleInputChange = ({ target }) => {
        setImages([...target.files]);
        target.value = null;
    };

    const toggleInputStyles = (e, state, isDrop = false) => {
        if (!isDrop) e.preventDefault();
        e.stopPropagation();

        const { parentElement } = input.current;

        if (state === stylesState.add) parentElement.classList.add(styles.isActive);
        if (state === stylesState.remove) parentElement.classList.remove(styles.isActive);
    };

    const handleInputTrigger = ({ key }) => {
        if (key === "Enter" || key === " ") input.current.click();
    };

    return (
        <button className={styles.fileInput} onKeyPress={handleInputTrigger}>
            {noImages && imageIcon}

            <p>
                Drag your <b>images</b> to this box or click it to browse on your computer...
            </p>

            <input
                ref={input}
                type="file"
                accept={SUPPORTED_TYPES.join(", ")}
                multiple
                onChange={handleInputChange}
                onDragOver={e => toggleInputStyles(e, stylesState.add)}
                onDragLeave={e => toggleInputStyles(e, stylesState.remove)}
                onDrop={e => toggleInputStyles(e, stylesState.remove, true)}
            />
        </button>
    );
};

export default FileInput;
