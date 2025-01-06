import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import NavigationBar from "../src/components/NavigationBar";
import { MemoryRouter } from "react-router-dom";
import { elementsNavBar, maxItemsCart } from "../config/config.js";

describe("NavigationBar component ", () => {
    it("should be rendered", () => {
        render(
            <MemoryRouter>
                <NavigationBar totalItems={0} />
            </MemoryRouter>,
        );
        const component = screen.getByRole("nav-container");
        expect(component).toBeVisible();
    });

    it("should have an image", () => {
        render(
            <MemoryRouter>
                <NavigationBar totalItems={0} />
            </MemoryRouter>,
        );
        const img = screen.getByRole("img");
        expect(img).toBeVisible();
    });

    it("should have a nav element containing 3 links with custom text", () => {
        render(
            <MemoryRouter>
                <NavigationBar totalItems={0} />
            </MemoryRouter>,
        );
        const textLinksNavBar = Object.keys(elementsNavBar);
        for (let i = 0; i < textLinksNavBar.length; ++i) {
            const rawString = String.raw`^${textLinksNavBar[i]}$`;
            const regExp = new RegExp(rawString);
            const link = screen.getByRole("link", { name: regExp });
            expect(link).toBeVisible();
        }
    });

    it("should properly display the number of items", () => {
        // if the count is 1000 or greater, it should display maxItemsCart
        const arrLength = 100,
            lowerBound = 0,
            upperBound = 10000;
        const countArr = getRandomIntegerArr(lowerBound, upperBound, arrLength);
        const expectedDisplay = getDisplay(countArr);
        for (let i = 0; i < arrLength; ++i) {
            render(
                <MemoryRouter>
                    <NavigationBar totalItems={countArr[i]} />
                </MemoryRouter>,
            );
            const cartCount = screen.getByRole("cart-count");
            expect(cartCount.textContent).toMatch(expectedDisplay[i]);
            cleanup();
        }
    });
});

function getRandomIntegerArr(lower, upper, arrLength) {
    // upper bound must be greater than lower bound
    // arrLength must be an integer greater than 1
    const arrRandomInterNumbers = new Array(arrLength);

    for (let i = 0; i < arrLength; ++i) {
        const num = lower + Math.floor(Math.random() * (upper - lower + 1));
        arrRandomInterNumbers[i] = num;
    }

    return arrRandomInterNumbers;
}

function getDisplay(arr) {
    const arrStrings = new Array(arr.length);

    for (let i = 0; i < arr.length; ++i) {
        if (arr[i] <= maxItemsCart) {
            arrStrings[i] = "" + arr[i];
        } else {
            arrStrings[i] = "+" + maxItemsCart;
        }
    }

    return arrStrings;
}
