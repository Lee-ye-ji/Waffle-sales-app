import React, { useState } from 'react'
import styled from "styled-components"

const QuBtn = styled.button`
background: #F4AB06;
width: 30px;
border: 0px;
&:hover {
    background: #FADA92;
}
`

const QuNumber = styled.div`
width: 30px;
text-align: center;
line-height: 20px;
height: 25px;
`

function Products({name, imagePath, price, description, updateItemCount}) {

const [number, setNumber] = useState(0);
const increaseNumber = () => { // number의 값을 증가시키는 함수
    if(number === 100){
        alert(`${name}의 최대 재고수량은 100개입니다.`);
        setNumber(100);
    }else{
        setNumber(number + 1);
        updateItemCount(name, number + 1, price)
    }
    };

    const decreaseNumber = () => { // number의 값을 감소시키는 함수
        if(number <= 0){
            alert('0은 최소수량입니다.');
            setNumber(0);   
        }else{
            setNumber(number - 1);
            updateItemCount(name, number - 1, price)
        }
      };


    return (
        
        <div>
            <div style={{margin: '20px'}}>
            <img 
                src={`http://localhost:5000/${imagePath}`}
                alt={`${name} product`}
            />
            <form style={{marginTop: '10px'}}>
                <label style={{textAlign: 'right'}}>{name}</label>
                <p style={{fontSize: '10px', color: '#9E7F51'}}>({description})</p>
                <p>₩{price}</p>
                <div style={{width: '100%', display: 'flex'}} >
                {/* <input
                    id={name}
                    style={{ marginLeft: 7 }}
                    type="number"
                    name="quantity"
                    min="0"
                    defaultValue={0}
                    onChange={handleChange}
                /> */}
                <QuBtn onClick={increaseNumber} type="button" data-testid={`${name}-btn`}>+</QuBtn>
                <QuNumber data-testid={`${name}-input`}>{number}</QuNumber>
                <QuBtn onClick={decreaseNumber} type="button">-</QuBtn>
                </div> 
            </form>
            </div>
        </div>
    )
}

export default Products
