import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectVimium from "../src/components/SelectVimium";

const arrOptions = [
    { name: "ansi", text: "option0" },
    { name: "iso", text: "option1" },
    { name: "vco", text: "option2" },
];

describe("SelectVimium component ", () => {
    it(`should render a select dropdown with the default variable being '${arrOptions[0].text}'`, () => {
        render(
            <SelectVimium
                nameValues={arrOptions}
                handleChange={() => {}}
                value={`${arrOptions[0].text}`}
            />,
        );

        const selectVimium = screen.getByRole("button");

        expect(selectVimium).toBeInTheDocument();
        expect(selectVimium).toHaveTextContent(`${arrOptions[0].text}`);
    });

    it("should render the SelectVimium component", () => {
        render(
            <SelectVimium
                value={"test"}
                nameValues={arrOptions}
                handleChange={() => {}}
            />,
        );

        const selectVimium = screen.getByRole("button");

        expect(selectVimium).toBeInTheDocument();
    });

    it("should render the option list when the button is clicked", async () => {
        const user = userEvent.setup();

        render(
            <SelectVimium
                value={"test"}
                nameValues={arrOptions}
                handleChange={() => {}}
            />,
        );

        const selectVimium = screen.getByRole("button");
        await user.click(selectVimium);

        arrOptions.forEach((options) => {
            expect(selectVimium).toBeInTheDocument(options.text);
        });
    });

    it("should change the selected option to the clicked one after rendering the option list", async () => {
        const user = userEvent.setup();

        render(
            <SelectVimium
                value={"test"}
                nameValues={arrOptions}
                handleChange={() => {}}
            />,
        );

        const selectVimium = screen.getByRole("button");

        // this gives an HTML collection which is not iterable using forEach
        const containerOptions = [...selectVimium.querySelectorAll("div")];
        // we have to iterate the options and make click on each one and test if it really changes
        for (let i = 0; i < containerOptions.length; ++i) {
            const optionDiv = containerOptions[i];
            await user.click(selectVimium);
            await user.click(optionDiv);
            expect(selectVimium).toHaveTextContent(optionDiv.textContent);
        }
    });

    it("should call the handleChange when any of the available options are clicked", async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(
            <SelectVimium
                value={"test"}
                nameValues={arrOptions}
                handleChange={handleChange}
            />,
        );
        const selectVimium = screen.getByRole("button");
        await user.click(selectVimium);
        const containerOptions = [...selectVimium.querySelectorAll("div")];
        for (let i = 0; i < containerOptions.length; ++i) {
            const optionDiv = containerOptions[i];
            await user.click(selectVimium);
            await user.click(optionDiv);
        }
        expect(handleChange).toHaveBeenCalledTimes(arrOptions.length);
    });

    it("should not call the handleChange function when the available options are not clicked", async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(
            <SelectVimium
                value={"test"}
                nameValues={arrOptions}
                handleChange={handleChange}
            />,
        );
        const selectVimium = screen.getByRole("button");
        const containerOptions = [...selectVimium.querySelectorAll("div")];
        for (let i = 0; i < containerOptions.length; ++i) {
            // we just click many times the selectVimium block such that we open and close it
            await user.click(selectVimium);
            await user.click(selectVimium);
            await user.click(selectVimium);
            await user.click(selectVimium);
            await user.click(selectVimium);
            await user.click(selectVimium);
            await user.click(selectVimium);
            await user.click(selectVimium);
        }
        expect(handleChange).not.toHaveBeenCalled();
    });
});
