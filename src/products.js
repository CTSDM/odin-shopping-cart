import localforage from "localforage";

export async function getProducts() {
    let products = await localforage.getItem("products");
    if (!products) products = [];

    return products;
}

export async function updateProducts(products) {
    await localforage.setItem("products", products);
}

export async function deleteProducts() {
    await localforage.clear();
}

export async function increaseProductCount(id, quantity) {
    const products = await localforage.getItem("products");
    const product = products.find((product) => {
        return product.id === id;
    });
    product.count = product.count + quantity;
    await set(products);
}

function set(products) {
    return localforage.setItem("products", products);
}
