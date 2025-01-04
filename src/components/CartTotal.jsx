import styles from "./CartTotal.module.css";
import PropTypes from "prop-types";

function CartTotal({ cartCount, totalPrice }) {
    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <span>Total Items: </span>
                <span className={styles.content}>{cartCount}</span>
            </div>
            <div className={styles.price}>
                <span>Total:</span>{" "}
                {<span className={styles.content}>{totalPrice}</span>}$
            </div>
        </div>
    );
}

CartTotal.propTypes = {
    cartCount: PropTypes.number,
    totalPrice: PropTypes.number,
};

export default CartTotal;
