import React, { useContext } from 'react'
import Order from './Order'
import OrderContext from '../../contexts/OrderContext'

function Cart({setStep}) {
    const {orderDatas} = useContext(OrderContext)

    return (
        <div  style={{border: '1px solid #F4AB06', borderRadius: '10px', padding: '10px'}}>
            <table style={{width: '100%', lineHeight: '50px', paddingTop: '30px'}}>
            <thead>
                <tr>
                    <th><b style={{color: '#F4AB06'}}>CART</b></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Waffle: {orderDatas.totals['products']}</td>
                </tr>
                <tr>
                    <td>Cream: {orderDatas.totals['cream']}</td>
                </tr>
                <tr>
                    <td>Topping: {orderDatas.totals['topping']}</td>
                </tr>
                <tr>
                    <td style={{borderTop: '1px solid #F4AB06'}}>
                        Total: {orderDatas.totals.total} 
                    </td>
                </tr>
            </tbody>
            </table>
            <Order setStep={setStep}/>
        </div>
    )
}

export default Cart
