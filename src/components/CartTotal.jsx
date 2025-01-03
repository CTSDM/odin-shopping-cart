import styles from "./CartTotal.module.css";

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

export default CartTotal;
