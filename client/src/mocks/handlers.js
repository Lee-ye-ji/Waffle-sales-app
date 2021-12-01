import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:5000/products', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    "name": "Normal waffle",
                    "imagePath": "/images/nomal.png"
                },
                {
                    "name": "Gelato waffle",
                    "imagePath": "/images/gelato.png"
                },
                {
                    "name": "Set Menu",
                    "imagePath": "/images/set.png"
                },
            ])
        )
    }),
    rest.get('http://localhost:5000/cream', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    "name": "Vanila",
                },
                {
                    "name": "Cheese",
                }
            ])
        ) 
    }),
    rest.post('http://localhost:5000/order', (req, res, ctx) => {
        let dummyData = [{
            orderNumber: 213202034, 
            cream: [{key: 'Mandarin', value: [1, 500]}],
            products: [{key: "Gelato waffle", value:  [1, 6000]}],
            topping: [{key: "Blueberry", value: [1, 500]}],
            totals: {
                cream: 500,
                products: 6000,
                topping: 500,
                total: 7000,
            }
        }];
        return res(ctx.json(dummyData))
    })
]