import React from "react";
import InputRange from "../shared/InputRange";
import styles from "./ScaleSelector.module.scss";

const ScaleSelector = ({ scale, setScale }) => (
    <div className={styles.scaleSelector}>
        <InputRange
            name="scale-selector"
            label="Scale value"
            value={scale}
            min="0.1"
            max="1"
            step="0.1"
            handleChange={({ target }) => setScale(target.value)}
        />
    </div>
);

export default ScaleSelector;
