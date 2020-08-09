import React, { useRef, useCallback } from "react";
import useEventListener from "../../hooks/useEventListener";
import "./FileInput.module.scss";

const FileInput = ({ images, setImages }) => {
    const fileInput = useRef();

    const handleInputChange = useCallback(
        ({ target }) => {
            [...target.files].forEach(file => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onloadend = () => {
                    setImages(fileReader.result, file);
                    target.value = null;
                };
            });
        },
        [setImages]
    );

    useEventListener("change", handleInputChange, fileInput.current);

    return (
        <div>
            <input ref={fileInput} type="file" accept="image/*" multiple />
        </div>
    );
};

export default FileInput;
