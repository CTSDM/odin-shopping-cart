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

function getAccumulatedPrice(arrData) {
    // we receive and array like the following
    // The order is very important, as we only convert to integer the price arr
    // The price is assumed to only have two decimals
    // [ [price array],  [count array ]
    // we just need to accumulate the result of the product of every entry

    let priceInteger = 0;
    for (let i = 0; i < arrData[0].length; ++i) {
        priceInteger += arrData[0][i] * 100 * arrData[1][i];
    }
    return priceInteger / 100;
}

export { sortProducts, getCartCount, getAccumulatedPrice };
