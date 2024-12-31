// this would act like App
// in here we will have the navbar

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar.jsx";
import { deleteProducts, getProducts } from "../products.js";

export default function Root() {
    const [products, setProducts] = useState([]);

    const cartCount = products.length
        ? products.reduce((sum, product) => sum + product.count, 0)
        : 0;

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

    return (
        <>
            <NavigationBar totalItems={cartCount} />
            <Outlet context={[products, setProducts]} />
            <button type="button" onClick={deleteProducts}>
                Delete localforage data
            </button>
        </>
    );
}
