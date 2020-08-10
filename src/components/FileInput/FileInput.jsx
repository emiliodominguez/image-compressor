import React, { useRef } from "react";
import useEventListener from "../../hooks/useEventListener";
import { imageIcon } from "../../constants/icons";
import styles from "./FileInput.module.scss";

const SUPPORTED_TYPES = [
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

const stylesState = {
    add: "ADD",
    remove: "REMOVE"
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

    useEventListener("dragover", e => toggleInputStyles(e, stylesState.add), input.current);
    useEventListener("dragleave", e => toggleInputStyles(e, stylesState.remove), input.current);
    useEventListener("drop", e => toggleInputStyles(e, stylesState.remove, true), input.current);

    return (
        <div className={styles.fileInput}>
            {noImages && imageIcon}

            <p>
                Drag your <b>images</b> to this box or click it to browse on your computer...
            </p>

            <input
                ref={input}
                type="file"
                accept={SUPPORTED_TYPES.join(",")}
                multiple
                onChange={handleInputChange}
            />
        </div>
    );
};

export default FileInput;
