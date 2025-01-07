function shortListByCategory(productsArr, category) {
    if (category === "all") return productsArr.slice();
    const arr = productsArr.filter((product) => product.category === category);
    return arr;
}

function getCategories(productsArr) {
    // all categories must be strings with at least 2 characters
    const arrCategories = [];
    const arrUniqueCategories = [];
    productsArr.forEach((product) => arrCategories.push(product.category));
    arrCategories.sort();
    const arrHelperMap = arrCategories.map((element) => simpleHash(element));
    const arrFirstDifference = arrHelperMap.map((x, index) => {
        if (index > 0) {
            return x - arrHelperMap[index - 1] === 0 ? false : index;
        } else return index;
    });
    const indexesUnique = arrFirstDifference.filter((x) => x !== false);
    indexesUnique.forEach((index) => {
        arrUniqueCategories.push(arrCategories[index]);
    });

    // we want to insert the categories All at index 0
    // we capitalize the first letter
    const finalArr = new Array(arrUniqueCategories.length + 1);
    arrUniqueCategories.forEach((element, index) => {
        finalArr[index] = { name: element, text: element };
    });
    finalArr[0] = { name: "all", text: "All" };

    return finalArr;

    function simpleHash(x) {
        // x must be a string
        const arr = x.split("");
        let hash = 0;
        for (let i = 0; i < arr.length; ++i) {
            hash += arr[i].charCodeAt(0) * (i + 3);
        }
        return hash;
    }
}

function sortProducts(arr, type, selectProperties) {
    // We expect from selectProperties to have the same variables in the same order
    // The order inside the switch is very sensible to changes
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
            arr.sort(
                (prodA, prodB) => -prodA.rating.count + prodB.rating.count,
            );
            break;

        case namesExpected[1]:
            arr.sort((prodA, prodB) => -prodA.rating.rate + prodB.rating.rate);
            break;

        case namesExpected[2]:
            arr.sort((prodA, prodB) => -prodA.price + prodB.price);
            break;

        case namesExpected[3]:
            arr.sort((prodA, prodB) => prodA.price - prodB.price);
            break;
        default:
            console.error("type was not given or had an incorrect type");
            arr.sort((prodA, prodB) => prodA.rating.count - prodB.rating.count);
    }
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

export {
    sortProducts,
    getCartCount,
    getAccumulatedPrice,
    getCategories,
    shortListByCategory,
};
