// this would act like App
// in here we will have the navbar

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar.jsx";
import { deleteProducts, getProducts, updateProducts } from "../products.js";
import { getCartCount } from "../utils/utilFunctions.js";
import styles from "./Root.module.css";

export default function Root() {
    const [products, setProducts] = useState([]);

    const cartCount = getCartCount(products);

    useEffect(() => {
        let active = true;
        const fetchProducts = async () => {
            const savedProducts = await getProducts();
            if (active) {
                setProducts(savedProducts);
            }
        };

        fetchProducts();

        return () => {
            active = false;
        };
    }, []);

    // every time we update products we also update the local storage
    useEffect(() => {
        updateProducts(products);
    }, [products]);

    function handleCartUpdate(id, type) {
        const productsCopy = products.slice();
        const productToModify = productsCopy.find((prod) => prod.id === id);
        if (type === "add") ++productToModify.count;
        else if (type === "minus") --productToModify.count;
        else if (type === false) productToModify.count = 0;
        else throw new Error("type not valid in handleCartUpdate");
        setProducts(productsCopy);
    }

    return (
        <div className={styles.container}>
            <NavigationBar totalItems={cartCount} />
            <Outlet context={[products, setProducts, handleCartUpdate]} />
            <button
                type="button"
                style={{ marginTop: "auto" }}
                onClick={deleteProducts}
            >
                Delete localforage data
            </button>
        </div>
    );
}
