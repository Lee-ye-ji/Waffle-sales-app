import { render, screen } from "../../../test-utils"
import {server} from '../../../mocks/server'
import Type from '../Type'
import {rest} from 'msw';

test("display product images from server", async () => {
    render(<Type orderType="products"/>)

    // findAllByRole -> 어떠한 요청을 주었을 때 비동기로 받아주므로, async await로 처리
    const productImages = await screen.findAllByRole("img", {
        name: /product$/i
    });
    expect(productImages).toHaveLength(3);
    const altText = productImages.map((element) => element.alt);
    // toEqual -> altText의 모든 필드가 다 같은지를 체크
    expect(altText).toEqual(['Normal waffle product', 'Gelato waffle product', 'Set Menu product']);
})

test("when fetching product datas, face an error", async () => {
    server.resetHandlers(
        rest.get('http://localhost:5000/products', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    );

    render(<Type orderType="products" />)
    const errorBanner = await screen.findByTestId("error-banner");
    expect(errorBanner).toHaveTextContent("에러가 발생했습니다.")
})

test("fetch option information from server", async () => {
    render(<Type orderType="cream" />)

    const optionCheckboxes = await screen.findAllByRole("checkbox")
    expect(optionCheckboxes).toHaveLength(2);
})