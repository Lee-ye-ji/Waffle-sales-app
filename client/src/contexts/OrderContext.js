import { createContext, useState, useMemo, useEffect } from 'react'

let OrderContext;
export default OrderContext = createContext();

function calculateSubtotal(orderType, orderCounts){
    let optionCount = 0;
    for(const count of orderCounts[orderType].values()){
        optionCount += count[0] * count[1]
    }
    return optionCount;
}

export function OrderContextProvider(props){

    const [orderCounts, setOrderCounts] = useState({
        products: new Map(),
        cream: new Map(),
        topping: new Map(),
    })

    const resetOrderdatas = () => {
        setOrderCounts({
            products: new Map(),
            cream: new Map(),
            topping: new Map(),
        })
    }
    
    const [totals, setTotals] = useState({
        products: 0,
        cream: 0,
        topping: 0,
        total: 0
    })

    useEffect(() => {
        const productsTotal = calculateSubtotal('products', orderCounts);
        const creamTotal = calculateSubtotal('cream', orderCounts);
        const toppingTotal = calculateSubtotal('topping', orderCounts);
        const total = productsTotal + creamTotal + toppingTotal
        setTotals({
            products: productsTotal,
            cream: creamTotal,
            topping: toppingTotal,
            total
        })

    }, [orderCounts])

    const value = useMemo(() => {

        function updateItemCount(itemName, newItemCount, itemPrice, orderType){
            const updatePrice = orderType === "products" ? itemPrice : 500;

            const newOrderCounts = {...orderCounts}

            const productArray = []
            productArray.push(newItemCount, updatePrice)

            const orderCountsMap = orderCounts[orderType]
            orderCountsMap.set(itemName, [...new Set(productArray)])
            setOrderCounts(newOrderCounts)
        }

        

        const valueData = {
            orderDatas: {...orderCounts, totals},
            updateItemCount,
            resetOrderdatas
        }

        return valueData
    }, [orderCounts, totals])

    return <OrderContext.Provider value={value} {...props} />;
}

// export default OrderContext