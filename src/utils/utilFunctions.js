function sortProducts(arr, type, selectProperties) {
    // We expect from selectProperties to have the same variables in the same order
    // The order inside the switch is very sensible to changes
    const arrCopy = arr.slice();
    const namesExpected = [
        "popularity",
        "rating",
        "high-to-low",
        "low-to-high",
    ];

    for (let i = 0; i < namesExpected.length; ++i) {
        if (selectProperties[i].name !== namesExpected[i])
            throw new Error(
                "The expected config name in selectProperties does not match with the actual values",
            );
    }

    switch (type) {
        case namesExpected[0]:
            arrCopy.sort(
                (prodA, prodB) => -prodA.rating.count + prodB.rating.count,
            );
            break;

        case namesExpected[1]:
            arrCopy.sort(
                (prodA, prodB) => prodA.rating.rate - prodB.rating.rate,
            );
            break;

        case namesExpected[2]:
            arrCopy.sort((prodA, prodB) => -prodA.price + prodB.price);
            break;

        case namesExpected[3]:
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
