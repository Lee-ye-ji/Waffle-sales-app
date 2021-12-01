import { render, screen, waitFor } from "@testing-library/react"
import App from './App';
import userEvent from '@testing-library/user-event'

test("From order to order completion", async () => {
    render(<App/>)

    const NormalBtn = await screen.findByTestId("Normal waffle-btn");
     userEvent.click(NormalBtn)

    const creamCheckBox = await screen.findByRole("checkbox", {name: 'Vanila'})
    userEvent.click(creamCheckBox)

    const toppingCheckBox = await screen.findByRole("checkbox", {name: 'Strawberry'})
    userEvent.click(toppingCheckBox)

    /// 주문 확인 (Cart) /// 
    expect(screen.getByAltText("Waffle: 5000")).toBeInTheDocument();
    expect(screen.getByAltText("Cream: 500")).toBeInTheDocument();
    expect(screen.getByAltText("Topping: 500")).toBeInTheDocument();
    
    const checkbox = screen.getByRole('checkbox', {
        name: "Check the order!"
    })
    userEvent.click(checkbox)
    const confirmButton = screen.getByRole("button", {name: "Order"});
    userEvent.click(confirmButton)

    /////// 주문 완료 페이지 //////
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    const completeHeader = await screen.findByRole("heading", {
        name: "Order complete!"
    });
    expect(completeHeader).toBeInTheDocument();

    const loadingDisappeared = screen.queryByText("loading");
    expect(loadingDisappeared).not.toBeInTheDocument();

    const firstPageButton = screen.getByRole("button", {
        name: "Back To First Page"
    });
    userEvent.click(firstPageButton)

    const productsTotal = screen.getByAltText("Waffle: 0")
    expect(productsTotal).toBeInTheDocument();

    const creamTotal = screen.getAllByAltText("Cream: 0");
    expect(creamTotal).toBeInTheDocument();

    const ToppingTotal = screen.getAllByAltText("Topping: 0")
    expect(ToppingTotal).toBeInTheDocument();

    

    await waitFor(() => {
        // screen.getByRole('spinbutton', {name : 'America'});
        screen.getByRole('checkbox', {
            name: "Check the order!"
        })
    })
})