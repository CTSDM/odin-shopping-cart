import { useOutletContext } from "react-router-dom";
import CardCheckout from "../components/CardCheckout";

function Cart() {
    const [products] = useOutletContext();
    return (
        <>
            {products.map((product) =>
                product.count ? (
                    <CardCheckout key={product.id} item={product} />
                ) : null,
            )}
        </>
    );
}

export default Cart;
