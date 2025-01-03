import { Link } from "react-router-dom";
import styles from "./CartEmpty.module.css";

function CartEmpty() {
    return (
        <div className={styles.container}>
            <div className={styles.disappointment}>
                You have no items in your cart... <span>ㅠㅠ</span>
            </div>
            <div className={styles.suggestion}>
                Consider heading to the <Link to="/shop">shop</Link> to buy
                wonderful products!
            </div>
        </div>
    );
}

export default CartEmpty;
