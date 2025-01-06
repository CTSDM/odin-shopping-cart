import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../src/components/Card";

describe("The component ", () => {
    const itemMock = {
        category: "category",
        count: 10,
        description: "description",
        id: 0,
        image: "image-source",
        price: 100,
        rating: { count: 0, rate: 1 },
        title: "title",
    };

    it("should be rendered", () => {
        render(<Card item={itemMock} handlerUpdateProducts={() => {}} />);
        const allButtons = screen.getAllByRole("button");
        const component = allButtons[0];
        expect(component).toBeInTheDocument();
    });

    it("should be rendered with an image element with the given source", () => {
        render(<Card item={itemMock} handlerUpdateProducts={() => {}} />);
        const imageElement = screen.getByRole("img");
        expect(imageElement).toBeVisible();
        expect(imageElement.src).toMatch(itemMock.image);
    });

    it("should have a title with the value from itemMock", () => {
        render(<Card item={itemMock} handlerUpdateProducts={() => {}} />);
        const title = screen.getByText(itemMock.title);
        expect(title).toBeVisible();
        expect(title.textContent).toMatch(itemMock.title);
    });

    it("should have a title with the value from itemMock", () => {
        render(<Card item={itemMock} handlerUpdateProducts={() => {}} />);
        const title = screen.getByText(itemMock.title);
        expect(title).toBeVisible();
        expect(title.textContent).toMatch(itemMock.title);
        expect(title.title).toMatch(itemMock.title);
    });

    it("should show the price as 'itemMock.price$'", () => {
        render(<Card item={itemMock} handlerUpdateProducts={() => {}} />);
        const priceElement = screen.getByText(`${itemMock.price}$`);
        expect(priceElement).toBeVisible();
    });

    it("should show the count as", () => {
        render(<Card item={itemMock} handlerUpdateProducts={() => {}} />);
        const element = screen.getByText(`Items added: ${itemMock.count}`);
        expect(element).toBeVisible();
    });

    it("should render a button element", () => {
        render(<Card item={itemMock} handlerUpdateProducts={() => {}} />);
        const button = screen.getAllByRole("button")[1];
        expect(button.nodeName).toMatch(/button/i);
    });

    it("should call the function handlerUpdateProducts when clicking the button", async () => {
        const handlerUpdateProducts = vi.fn();
        const user = userEvent.setup();
        render(
            <Card
                item={itemMock}
                handlerUpdateProducts={handlerUpdateProducts}
            />,
        );
        const button = screen.getAllByRole("button")[1];
        await user.click(button);
        expect(handlerUpdateProducts).toHaveBeenCalled();
    });

    it("should have a form element", async () => {
        render(<Card item={itemMock} handlerUpdateProducts={() => {}} />);
        const form = screen.getByRole("form");
        expect(form).toBeInTheDocument();
    });
});
