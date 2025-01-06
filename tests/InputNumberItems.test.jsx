import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputNumberItem from "../src/components/InputNumberItem";

describe("The component ", () => {
    it("should render", () => {
        render(<InputNumberItem increaseSelfProductCount={() => {}} id={0} />);
        const component = screen.getByRole("form");
        expect(component).toBeInTheDocument();
    });

    it("should have a button", () => {
        render(<InputNumberItem increaseSelfProductCount={() => {}} id={0} />);
        const component = screen.getByRole("button");
        expect(component).toBeInTheDocument();
    });

    it("should call the increaseSelfProductCount when the form is submitted", async () => {
        const increaseSelfProductCount = vi.fn();
        const user = userEvent.setup();
        render(
            <InputNumberItem
                increaseSelfProductCount={increaseSelfProductCount}
                id={0}
            />,
        );
        const button = screen.getByRole("button");
        await user.click(button);
        expect(increaseSelfProductCount).toHaveBeenCalled();
    });
});
