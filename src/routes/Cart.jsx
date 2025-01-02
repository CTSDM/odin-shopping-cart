import { useOutletContext } from "react-router-dom";
import CardCheckout from "../components/CardCheckout";
import styles from "./Cart.module.css";

function Cart() {
    const [products, , handleCartUpdate] = useOutletContext();
    return (
        <div className={styles.container}>
            {products.map((product) =>
                product.count ? (
                    <CardCheckout
                        key={product.id}
                        item={product}
                        handleUpdate={handleCartUpdate}
                    />
                ) : null,
            )}
        </div>
    );
}

export default Cart;
