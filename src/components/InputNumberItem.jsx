import { useState } from "react";
import PropTypes from "prop-types";

function InputNumberItem({ increaseSelfProductCount, id }) {
    const [value, setValue] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputValue = +e.target.querySelector("input").value;
        increaseSelfProductCount(id, inputValue);
    };

    const handleOnChange = (e) => {
        const currentValue = e.currentTarget.value;
        setValue(currentValue);
    };

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="quantity"
                    value={value}
                    onChange={handleOnChange}
                />
                <button type="submit">Add</button>
            </form>
        </>
    );
}

InputNumberItem.propTypes = {
    increaseSelfProductCount: PropTypes.func,
    id: PropTypes.number,
};

export default InputNumberItem;
