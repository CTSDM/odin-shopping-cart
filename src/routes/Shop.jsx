import Card from "../components/Card";
import { updateProducts } from "../products";
import styles from "./Shop.module.css";
// For the sake of using fetch every time we mount this component
// even though we are fetching the same data that won't change
// we fetch the data inside the Shop
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { increaseProductCount } from "../products";

function Shop() {
    const [products, setProducts] = useOutletContext();

    function handlerUpdateProducts(index, quantity) {
        const productsUpdate = products.slice();
        productsUpdate[index].count = productsUpdate[index].count + quantity;
        setProducts(productsUpdate);
        increaseProductCount(products[index].id, quantity);
    }

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                if (products.length === 0) {
                    let response = await fetch(
                        "https://fakestoreapi.com/products",
                        {
                            signal: controller.signal,
                        },
                    );
                    response = await response.json();
                    setProducts(response);
                    updateProducts(response);
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.log(err);
                }
            }
        };
        fetchData();
        return () => {
            controller.abort();
        };
    }, [products, setProducts]);

    return products.length > 0 ? (
        <>
            <div className={styles["cards-container"]}>
                {products.map((product, index) => (
                    <Card
                        item={product}
                        key={product.id}
                        index={index}
                        handlerUpdateProducts={handlerUpdateProducts}
                    />
                ))}
            </div>
        </>
    ) : (
        <div>Loading</div>
    );
}

export default Shop;
