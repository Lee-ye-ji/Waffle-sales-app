import Order from "../Order";
import { render, screen } from "@testing-library/react"


test("checkbox and button", () => {
    render(<Order/>);
    const checkbox = screen.getByRole('checkbox', {
        name: "Check the order!"
    })
    expect(checkbox.checked).toEqual(false);

    const confirmButton = screen.getByRole("button", {name: "Order"});
    expect(confirmButton.disabled).toBeTruthy() 
})