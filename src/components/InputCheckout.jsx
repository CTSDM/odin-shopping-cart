import styles from "./InputCheckout.module.css";

function InputCheckout({ count, handleUpdate }) {
    const buttonTemplateFn = (text, params) => (
        <button
            type="button"
            className={styles.button}
            onClick={() => handleUpdate(params)}
        >
            {text}
        </button>
    );
    const buttonDelete = buttonTemplateFn("Delete", false);
    const buttonMinus = buttonTemplateFn("-1", "minus");
    const buttonPlus = buttonTemplateFn("+1", "add");

    return (
        <div className={styles.input}>
            {count === 0 ? null : count === 1 ? null : buttonMinus}
            {buttonPlus}
            {buttonDelete}
        </div>
    );
}

export default InputCheckout;
