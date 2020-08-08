import React from "react";
// import styles from "./QualitySelector.module.scss";

const QualitySelector = ({ quality, setQuality }) => {
    const handleInputChange = ({ target }) => {
        setQuality(target.value);
    };

    return (
        <div>
            <label htmlFor="quality-selector">Select compression quality</label>

            <input
                type="range"
                name="quality-selector"
                min="0"
                max="1"
                step="0.1"
                value={quality}
                onChange={handleInputChange}
            />

            <span>{quality}</span>
        </div>
    );
};

export default QualitySelector;
