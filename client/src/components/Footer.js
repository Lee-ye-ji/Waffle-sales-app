import React from 'react'
import FooterSvg from '../images/footer.svg'
import styled from "styled-components"
import Center from './Center'
function Footer() {

    const FooterStyle = styled(Center)`
        background-image: url(${FooterSvg})
    `

    return (
        <FooterStyle>
            <p>2021 YEJI</p>
        </FooterStyle>
    )
}

export default Footer
