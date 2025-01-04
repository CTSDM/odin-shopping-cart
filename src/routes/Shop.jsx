import Card from "../components/Card";
import styles from "./Shop.module.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { increaseProductCount } from "../products";
import { selectProperties } from "../../config/config.js";
import { sortProducts } from "../utils/utilFunctions";
import SelectVimium from "../components/SelectVimium";

// For the sake of using fetch every time we mount this component
// even though we are fetching the same data that won't change
// we fetch the data inside the Shop

function Shop() {
    const [products, setProducts] = useOutletContext();
    const [valueSelect, setValueSelect] = useState("popularity");

    function handlerUpdateProducts(id, quantity) {
        const productsUpdate = products.slice();
        const productToUpdate = productsUpdate.filter(
            (product) => product.id === id,
        )[0];
        productToUpdate.count = productToUpdate.count + quantity;
        productsUpdate.filter((product, index) => {
            if (product.id === id) {
                productsUpdate[index] = productToUpdate;
                return true;
            }
        });
        setProducts(productsUpdate);
        increaseProductCount(id, quantity);
    }

    const selectText = getSelectText(valueSelect, selectProperties);

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
                    const fetchedProducts = await response.json();
                    fetchedProducts.forEach((product) => {
                        product.count = 0;
                    });
                    setProducts(fetchedProducts);
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

    const productsSorted = sortProducts(
        products,
        valueSelect,
        selectProperties,
    );

    return productsSorted.length > 0 ? (
        <div>
            <div className={styles.select}>
                <SelectVimium
                    nameValues={selectProperties}
                    handleChange={setValueSelect}
                    value={selectText}
                />
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
    ) : (
        <div>Loading</div>
    );
}

function getSelectText(value, selectProperties) {
    for (const arrEntry of selectProperties) {
        if (arrEntry.name === value) return arrEntry.text;
    }
}

export default Shop;
