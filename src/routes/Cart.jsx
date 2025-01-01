import { useOutletContext } from "react-router-dom";
import CardCheckout from "../components/CardCheckout";

function Cart() {
    const [products, , handleCartUpdate] = useOutletContext();
    return (
        <>
            {products.map((product) =>
                product.count ? (
                    <CardCheckout
                        key={product.id}
                        item={product}
                        handleUpdate={handleCartUpdate}
                    />
                ) : null,
            )}
        </>
    );
}

export default Cart;
