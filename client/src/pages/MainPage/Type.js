import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Products from './Products';
import Options from './Options';
import ErrorBanner from '../../components/ErrorBanner';
import OrderContext from '../../contexts/OrderContext'

function Type({ orderType }) {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const { updateItemCount } = useContext(OrderContext)

    useEffect(() => {
       loadItems(orderType);
    }, [orderType])

    const loadItems = async (orderType) => {
        try{
            let response = await axios.get(`http://localhost:5000/${orderType}`)
            setItems(response.data);
        }catch(error){
            setError(true);
        }
    }
    
    if(error){
        return <ErrorBanner message="에러가 발생했습니다."/>
    }

    const ItemComponents = orderType === "products" ? Products : Options;
    const OptionItems = items.map((item) => (
        <ItemComponents 
        key={item.name}
        name={item.name}
        price={item.price}
        description={item.description}
        imagePath={item.imagePath}
        updateItemCount={(itemName, newItemCount, itemPrice) => updateItemCount(itemName, newItemCount, itemPrice, orderType)}
        />
    ))

    return (
        <>
            <div style={ orderType === "products" ? {display: 'flex'} : {display: 'block'}}>
                {OptionItems}
            </div>
        </>
    )
}

export default Type
