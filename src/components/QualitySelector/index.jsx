import React from "react";
import { warningIcon } from "../../constants/icons";
import styles from "./QualitySelector.module.scss";

const QualitySelector = ({ quality, setQuality }) => (
    <div className={styles.qualitySelector}>
        <label htmlFor="quality-selector">Select compression quality</label>

        <div className={styles.inputWrapper}>
            <input
                type="range"
                name="quality-selector"
                min="0"
                max="1"
                step="0.1"
                value={quality}
                onChange={({ target }) => setQuality(target.value)}
            />

            <span>{quality}</span>
        </div>

        {quality < 0.5 && (
            <small>
                {warningIcon}
                You may get unexpected results from a value below <b>0.5</b>.
                <br />
                The one who warns doesn't betray.
            </small>
        )}
    </div>
);

export default QualitySelector;
