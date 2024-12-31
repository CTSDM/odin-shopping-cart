import { useState, useEffect } from "react";

function Cart({ updating }) {
    const [itemNumber, setItemNumber] = useState(0);
    useEffect(() => {
        if (updating === true) setItemNumber(setItemNumber + 1);
    }, [updating]);

    return <div>Cart{itemNumber}</div>;
}

export default Cart;
