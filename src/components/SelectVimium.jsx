import { useState } from "react";
import styles from "./SelectVimium.module.css";

const vimiumButtonClassName = "demo-button";
const activeStyle = styles.active + " " + vimiumButtonClassName;

function SelectVimium({ params, handleChange }) {
    const [value, setValue] = useState(Object.values(params[0])[0]);

    function handleOnClick(e) {
        const div = e.currentTarget;
        const innerText = div.innerText;
        const optionValue = div.dataset.value;
        handleChange(optionValue);
        setValue(innerText);
    }

    function handleOnClickSelect() {
        const optionsContainer = document.querySelector(
            `div.${styles["container-options"]}`,
        );
        if (optionsContainer.classList.contains(`${styles.hidden}`)) {
            optionsContainer.classList.remove(`${styles.hidden}`);
        } else optionsContainer.classList.add(`${styles.hidden}`);
    }

    const maxWidth = getMaxWidthOption(params);

    return (
        <div
            className={styles.select}
            style={{ width: `${maxWidth}px` }}
            onClick={handleOnClickSelect}
            tabIndex={0}
        >
            <span className={vimiumButtonClassName}>{value}</span>
            <div
                className={`${styles["container-options"]} ${styles.hidden}`}
                style={{ width: `${maxWidth}px` }}
            >
                {params.map((param) => {
                    return (
                        <div
                            key={Object.keys(param)[0]}
                            data-value={Object.keys(param)[0]}
                            className={activeStyle}
                            onClick={handleOnClick}
                            tabIndex={0}
                        >
                            {Object.values(param)[0]}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function getMaxWidthOption(params) {
    const divMockUpContainer = getDivMockup(params);
    const maxWidth = [...divMockUpContainer.children].reduce((max, div) => {
        return div.clientWidth > max ? div.clientWidth : max;
    }, 0);

    removeDivMockUp();
    return maxWidth + 10;
}

function removeDivMockUp() {
    const root = document.querySelector("#root");
    while (true) {
        const divMockup = document.querySelector(".mockup-container");
        if (!divMockup) return;
        root.removeChild(divMockup);
    }
}

function getDivMockup(params) {
    const divMockupContainer = document.createElement("div");

    divMockupContainer.classList.add("mockup-container");
    params.forEach((entry) => {
        const div = document.createElement("div");
        div.classList.add(styles.active);
        div.classList.add(styles.mockup);
        // div.style.visibility = "hidden";
        // div.position = "absolute";
        div.textContent = Object.values(entry)[0];
        divMockupContainer.appendChild(div);
    });

    const root = document.querySelector("#root");
    root.appendChild(divMockupContainer);

    return divMockupContainer;
}

export default SelectVimium;
