import Card from "../components/Card";
import styles from "./Shop.module.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { increaseProductCount } from "../products";
import { sortProducts } from "../utils/utilFunctions";

// For the sake of using fetch every time we mount this component
// even though we are fetching the same data that won't change
// we fetch the data inside the Shop
//
function Shop() {
    const [products, setProducts] = useOutletContext();
    const [valueSelect, setValueSelect] = useState("popularity");

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

    const productsSorted = sortProducts(products, valueSelect);

    return productsSorted.length > 0 ? (
        <>
            <div>
                <div className={styles.sort}>
                    <select
                        onChange={(e) => setValueSelect(e.currentTarget.value)}
                        value={valueSelect}
                    >
                        <option value="popularity">Popularity</option>
                        <option value="rating">Rating</option>
                        <option value="high-to-low">Price (High to Low)</option>
                        <option value="low-to-high">Price (Low to High)</option>
                    </select>
                </div>
                <div className={styles["cards-container"]}>
                    {productsSorted.map((product, index) => (
                        <Card
                            item={product}
                            key={product.id}
                            index={index}
                            handlerUpdateProducts={handlerUpdateProducts}
                        />
                    ))}
                </div>
            </div>
        </>
    ) : (
        <div>Loading</div>
    );
}

export default Shop;
