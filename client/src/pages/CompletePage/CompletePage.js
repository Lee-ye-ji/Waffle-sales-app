import React, { useContext, useEffect, useState } from 'react'
import OrderContext from '../../contexts/OrderContext'
import axios from 'axios';
import ErrorBanner from '../../components/ErrorBanner';

function CompletePage({ setStep }) {
    const {orderDatas, resetOrderdatas} = useContext(OrderContext);
    const [orderHistory, setOrderHistory] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false)


    useEffect(() => {
        orderCompleted(orderDatas);

    }, [orderDatas])

    const orderCompleted = async (orderDatas) => {
        try {

            let productArray = []
            function productCount(){
            let productValue;
            for(const count of orderDatas.products){
                productValue = count[1];
            }
            return productValue;
            }
            const productName = Array.from(orderDatas.products.keys())
                productName.map((key) => (
                productArray.push([key, productCount()[0]])
            ))
        
            let data = {
                products: productArray,
                cream: Array.from(orderDatas.cream.keys()),
                topping: Array.from(orderDatas.topping.keys()),
                totals: orderDatas.totals.total
            }
            let response = await axios.post('http://localhost:5000/order', data)
            setOrderHistory(response.data)
            setloading(false)
        } catch (error) {
            seterror(true)
        }
    }

    if(error){
        return <ErrorBanner message="에러가 발생했습니다"/>
    }

    const orderTable = orderHistory.map((item) => (
        <tr key={item.orderNumber}>
            <td>{item.orderNumber}</td>
            <td>
                <ul>
                    { item.products.map((key) => (
                        <li key={key[0]}>
                            {key[0]} - {key[1]}
                        </li>
                    ))
                    }
                </ul>
            </td>
            <td>
                <ul>
                    { item.cream.map((key) => (
                        <li key={key}>
                            {key}
                        </li>
                    ))
                    }
                </ul>
            </td>
            <td>
                <ul>
                    { item.topping.map((key) => (
                        <li key={key}>
                            {key}
                        </li>
                    ))
                    }
                </ul>
            </td>
            <td>{item.totals}</td>
        </tr>
    ))

    const handleClick = () => {
        resetOrderdatas()
        setStep(0)
    }

    if(loading){
        return <div>loading</div>
    }else{
        return (
            <div style={{padding: '20px', minHeight: '61vh'}}>
                <button 
                    onClick={handleClick}
                    style={{background: '#9E7F51',color: '#fff', height: '30px', border: '0px', float: 'right', cursor: 'pointer', display: 'block'}}
                    >
                        Back To First Page
                </button> 
                <h3 style={{color: '#005248'}}>
                    Order complete!
                </h3>
                <table style={{border: '1px solid #F4AB06', borderRadius: '10px', width: '100%', lineHeight: '50px'}}>
                    <thead>
                        <tr>
                            <td style={{borderBottom: '1px solid #9E7F51'}}>Number</td>
                            <td style={{borderBottom: '1px solid #9E7F51'}}>Waffle</td>
                            <td style={{borderBottom: '1px solid #9E7F51'}}>Cream</td>
                            <td style={{borderBottom: '1px solid #9E7F51'}}>Topping</td>
                            <td style={{borderBottom: '1px solid #9E7F51'}}>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orderTable}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CompletePage
