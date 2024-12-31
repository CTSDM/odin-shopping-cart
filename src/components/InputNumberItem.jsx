import { useState } from "react";
import { increaseProductCount } from "../products";

function InputNumberItem({ productId, increaseSelfProductCount, index }) {
    const [value, setValue] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputValue = +e.target.querySelector("input").value;
        increaseProductCount(productId, inputValue);
        increaseSelfProductCount(index, inputValue);
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

export default InputNumberItem;
