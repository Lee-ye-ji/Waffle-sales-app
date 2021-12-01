import React from 'react'
import headerSvg from '../images/header.svg'
import styled from "styled-components"
import Center from './Center'

function Header() {
    const HeaderOne = styled(Center)`
        background-color: #F4AB06;
        height: 100px;
    `
    const Img = {
        backgroundImage: `url(${headerSvg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100px'
    }

    return (
        <div>
            <HeaderOne>
                Waffle
            </HeaderOne>
            <div style={Img}></div>
        </div>
    )
}

export default Header
