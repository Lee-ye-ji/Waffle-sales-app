import React from 'react'
import Type from './Type'
import Cart from './Cart'

function MainPage({ setStep }) {

    return (
        <div style={{paddingBottom: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <div>
                <p style={{textAlign: 'center', background: '#FFEDCB'}}>CREAM</p>
                <Type orderType="cream"/>
                <p style={{textAlign: 'center', background: '#005248', color: '#fff'}}>TOPPING</p>
                <Type orderType="topping"/>
            </div>
           <div>
                <Type orderType="products"/>
           </div>
            <Cart setStep={setStep}/>
            </div>
        </div>
    )
}

export default MainPage
