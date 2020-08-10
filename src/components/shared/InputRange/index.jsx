import React from "react";
import styles from "./InputRange.module.scss";

const InputRange = ({ name, label, value, min, max, step, handleChange }) => (
    <div className={styles.inputRange}>
        <label htmlFor={name}>{label}</label>

        <div className={styles.inputRangeControlGroup}>
            <input
                type="range"
                name={name}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
            />

            <span>{value}</span>
        </div>
    </div>
);

export default InputRange;
