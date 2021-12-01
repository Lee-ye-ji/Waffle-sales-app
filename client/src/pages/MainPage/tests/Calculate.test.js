import { render, screen, fireEvent } from "../../../test-utils"
import MainPage from "../MainPage";
import userEvent from '@testing-library/user-event'

describe("total price of gooods and options", () => {

    test("total price starts with 0 and Updating total price when adding one products", async () => {
        render(<MainPage />)

        const total = screen.getByText("Total:", {exact: false});
        expect(total).toHaveTextContent("0")

        const NormalBtn = await screen.findByTestId("Normal waffle-btn");
        const NormalInput = await screen.findByTestId("Normal waffle-input");
        userEvent.click(NormalBtn)
        expect(NormalInput).toHaveTextContent('1')
        // const test = 5000
        expect(total).toHaveTextContent("5000")
    })

    test("updating total price when adding one option", async () => {
        render(<MainPage />)

        const total = screen.getByText("Total:", {exact: false});
        const OptionsCheckBox = await screen.findByRole("checkbox", {name: 'Vanila'})

        userEvent.click(OptionsCheckBox)
        expect(total).toHaveTextContent("500")
    })

    test("updating total price when removing option and product", async () => {
        render(<MainPage />)
        const total = screen.getByText("Total:", {exact: false});
        const OptionsCheckBox = await screen.findByRole("checkbox", {name: 'Vanila'})
        userEvent.click(OptionsCheckBox)

        const NormalBtn = await screen.findByTestId("Normal waffle-btn");
        fireEvent.click(NormalBtn)

        expect(total).toHaveTextContent("5500")
    })
})