import React from 'react'
import styled from 'styled-components'
import { colors } from './constants'

const HeaderSides = styled.div`
    width:25%;
    display: flex;
    justify-content: flex-end;
`

const HeaderRow = styled.div`
    width: 100%;
    display: flex;
    flex-grow: 1;
    align-items: center;
    max-width: 150vh;
`
const Title = styled.h1`
    min-width: 50%;
    font-size: 5vh;
    color: ${props => props.color};
`
const InfoButton = styled.button`
    border-radius: 50%;
    height: 5vh;
    width: 5vh;
    background-color: white;
    color: ${colors.baksteen};
    font-size: 2vh;
    border: .6vh solid ${colors.baksteen};
    cursor: pointer;
    margin-right: 20%;
`


function Header ( {toggleDisplayInfo} ) {
    return (
        <HeaderRow>
            <HeaderSides></HeaderSides>
            <Title color={colors.baksteen}>Big Beziers</Title>
            <HeaderSides>
                <InfoButton onClick={toggleDisplayInfo}><strong>?</strong></InfoButton>
            </HeaderSides>
        </HeaderRow>
    )
}

export default Header;