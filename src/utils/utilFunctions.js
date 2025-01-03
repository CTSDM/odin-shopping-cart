function sortProducts(arr, type) {
    const arrCopy = arr.slice();
    switch (type) {
        case "popularity":
            arrCopy.sort(
                (prodA, prodB) => -prodA.rating.count + prodB.rating.count,
            );
            break;

        case "rating":
            arrCopy.sort(
                (prodA, prodB) => prodA.rating.rate - prodB.rating.rate,
            );
            break;

        case "high-to-low":
            arrCopy.sort((prodA, prodB) => -prodA.price + prodB.price);
            break;

        case "low-to-high":
            arrCopy.sort((prodA, prodB) => prodA.price - prodB.price);
            break;
        default:
            console.error("type was not given or had an incorrect type");
            arrCopy.sort(
                (prodA, prodB) => prodA.rating.count - prodB.rating.count,
            );
    }
    return arrCopy;
}

function getCartCount(products) {
    const cartCount = products.length
        ? products.reduce((sum, product) => sum + product.count, 0)
        : 0;
    return cartCount;
}

export { sortProducts, getCartCount };
