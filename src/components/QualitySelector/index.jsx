import React from "react";
import { warningIcon } from "../../constants/icons";
import InputRange from "../shared/InputRange";
import styles from "./QualitySelector.module.scss";

const QualitySelector = ({ quality, setQuality }) => (
    <div className={styles.qualitySelector}>
        <InputRange
            name="quality-selector"
            label="Compression quality"
            value={quality}
            min="0"
            max="1"
            step="0.1"
            handleChange={({ target }) => setQuality(target.value)}
        />

        {quality < 0.5 && (
            <div className={styles.warningTooltip}>
                <button>{warningIcon}</button>

                <small>
                    You may get unexpected results from a value below <b>0.5</b>.
                    <br />
                    The one who warns doesn't betray.
                </small>
            </div>
        )}
    </div>
);

export default QualitySelector;
