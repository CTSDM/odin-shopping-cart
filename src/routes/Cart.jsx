import { useOutletContext } from "react-router-dom";
import CardCheckout from "../components/CardCheckout";
import styles from "./Cart.module.css";
import CartEmpty from "../components/CartEmpty.jsx";
import { getCartCount } from "../utils/utilFunctions.js";

function Cart() {
    const [products, , handleCartUpdate] = useOutletContext();
    return (
        <div className={styles.container}>
            {getCartCount(products) ? (
                products.map((product) =>
                    product.count ? (
                        <CardCheckout
                            key={product.id}
                            item={product}
                            handleUpdate={handleCartUpdate}
                        />
                    ) : null,
                )
            ) : (
                <CartEmpty />
            )}
        </div>
    );
}

export default Cart;
