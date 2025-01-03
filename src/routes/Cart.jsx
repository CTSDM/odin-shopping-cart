import { useOutletContext } from "react-router-dom";
import { getAccumulatedPrice, getCartCount } from "../utils/utilFunctions.js";
import CardCheckout from "../components/CardCheckout";
import CartEmpty from "../components/CartEmpty.jsx";
import CartTotal from "../components/CartTotal.jsx";
import styles from "./Cart.module.css";

function Cart() {
    const [products, , handleCartUpdate] = useOutletContext();
    const cartCount = getCartCount(products);
    // arrPriceCount stores the price in the first entry and count in the second
    const arrCountPrice = [[], []];
    return (
        <div className={styles.container}>
            {cartCount ? (
                <>
                    <div className={styles["container-cards"]}>
                        {products.map((product) => {
                            if (product.count) {
                                arrCountPrice[0].push(product.price);
                                arrCountPrice[1].push(product.count);
                                return (
                                    <CardCheckout
                                        key={product.id}
                                        item={product}
                                        handleUpdate={handleCartUpdate}
                                    />
                                );
                            } else return null;
                        })}
                    </div>
                    <CartTotal
                        cartCount={cartCount}
                        totalPrice={getAccumulatedPrice(arrCountPrice)}
                    />
                </>
            ) : (
                <CartEmpty />
            )}
        </div>
    );
}

export default Cart;
