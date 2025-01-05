// this component is meant to replace the select element
// it receives two parameters: nameValues and handleChange
// nameValues is an array containing objects as {name: ..., text: ...}
// where name is the name of the option and text is the innerText of the option

import { useEffect } from "react";
import styles from "./SelectVimium.module.css";
import PropTypes from "prop-types";

const vimiumButtonClassName = "demo-button";
const activeStyle = styles.active + " " + vimiumButtonClassName;

function SelectVimium({ value, nameValues, handleChange }) {
    function handleOnClick(e) {
        const div = e.currentTarget;
        const optionValue = div.dataset.value;
        handleChange(optionValue);
    }

    function handleOnClickSelect() {
        hideShowOptions(true);
    }

    function handleOnKeyDown(e) {
        if (e.target.classList.contains(`${styles.select}`)) {
            if (e.code === "Escape") {
                if (!e.currentTarget.classList.contains(`${styles["no-show"]}`))
                    hideShowOptions(false);
            } else if (e.code === "Enter") {
                hideShowOptions(true);
            }
        }
    }

    function handleOptionEnterKey(e) {
        if (e.code === "Enter") {
            handleOnClick(e);
            hideShowOptions(true);
        }
        e.stopPropagation();
    }

    useEffect(() => {
        const onClickWindow = (e) => {
            const divSelect = document.querySelector(`.${styles.select}`);
            if (divSelect && !divSelect.contains(e.target))
                hideShowOptions(false);
        };
        window.addEventListener("click", onClickWindow);

        return () => {
            window.removeEventListener("click", onClickWindow);
        };
    }, []);

    const maxWidth = getMaxWidthOption(nameValues);

    return (
        <button
            className={styles.select}
            style={{ width: `${maxWidth}px` }}
            onClick={handleOnClickSelect}
            onKeyDown={handleOnKeyDown}
            name={"vimium"}
            tabIndex={0}
        >
            {value}
            <div
                className={`${styles["container-options"]} ${styles["no-show"]}`}
                style={{ width: `${maxWidth}px` }}
            >
                {nameValues.map((param) => {
                    return (
                        <div
                            key={param.name}
                            data-value={param.name}
                            className={activeStyle}
                            onClick={handleOnClick}
                            onKeyDown={handleOptionEnterKey}
                            tabIndex={0}
                        >
                            {param.text}
                        </div>
                    );
                })}
            </div>
        </button>
    );
}

SelectVimium.propTypes = {
    value: PropTypes.string,
    nameValues: PropTypes.array,
    handleChange: PropTypes.func,
};

function getMaxWidthOption(nameValues) {
    const divMockUpContainer = getDivMockup(nameValues);
    const maxWidth = [...divMockUpContainer.children].reduce((max, div) => {
        return div.clientWidth > max ? div.clientWidth : max;
    }, 0);

    removeDivMockUp();
    return maxWidth + 20;
}

function removeDivMockUp() {
    while (true) {
        const divMockup = document.querySelector(".mockup-container");
        if (!divMockup) return;
        document.body.removeChild(divMockup);
    }
}

function getDivMockup(nameValues) {
    const divMockupContainer = document.createElement("div");

    divMockupContainer.classList.add("mockup-container");
    nameValues.forEach((entry) => {
        const div = document.createElement("div");
        div.classList.add(styles.active);
        div.classList.add(styles.mockup);
        div.style.visibility = "hidden";
        div.position = "absolute";
        div.textContent = entry.text;
        divMockupContainer.appendChild(div);
    });

    document.body.appendChild(divMockupContainer);

    return divMockupContainer;
}

function hideShowOptions(action) {
    // if action is true the the style hidden is toggled
    // if action is false the style hidden is added
    const optionsContainer = document.querySelector(
        `div.${styles["container-options"]}`,
    );
    if (action) {
        optionsContainer.classList.toggle(`${styles["no-show"]}`);
    } else {
        optionsContainer.classList.add(`${styles["no-show"]}`);
    }
}

export default SelectVimium;
