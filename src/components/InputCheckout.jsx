function InputCheckout({ count, handleUpdate }) {
    const buttonTemplateFn = (text, params) => (
        <button type="button" onClick={() => handleUpdate(params)}>
            {text}
        </button>
    );
    const buttonDelete = buttonTemplateFn("Delete", false);
    const buttonMinus = buttonTemplateFn("-1", "minus");
    const buttonPlus = buttonTemplateFn("+1", "add");

    return (
        <>
            {count === 0 ? null : count === 1 ? buttonDelete : buttonMinus}
            <div>{count}</div>
            {buttonPlus}
        </>
    );
}

export default InputCheckout;
