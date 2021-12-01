import React, { useState, useContext } from 'react'
import OrderContext from '../../contexts/OrderContext'

function Order({ setStep }) {
    const [checked, setChecked] = useState(false);
    const {orderDatas} = useContext(OrderContext);

    const orderChange = (e) => {
        if(orderDatas.totals.total !== 0){
            setChecked(e.target.checked)
        }else{
            alert('주문을 해주세요!')
        }
        // (e) => setChecked(e.target.checked)
    }
    return (
        <div style={{lineHeight: '50px'}}>
                <input 
                 type="checkbox"
                 checked={checked}
                 onChange={orderChange}
                 id="confirm-checkbox"
                />{" "}
                <label htmlFor="confirm-checkbox" style={{color: '#7A7A7A'}}>Check the order!</label>
                <button 
                disabled={!checked} 
                type="submit"
                onClick={() => setStep(1)}
                style={checked ? {background: '#9E7F51',color: '#fff', width: '100%', height: '30px', cursor: 'pointer'} : {width: '100%', height: '30px'}}
                >
                    Order
                </button> 
            </div>
    )
}

export default Order


