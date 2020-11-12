import React, { useState } from 'react';
import CanvasArea from './CanvasArea';
import Slider from './Slider'
import Header from './Header'
import styled from 'styled-components'
import { colors, radius, mobileQuery } from './constants';

const MainRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${props => props.backgroundColor || "white"}
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`

const Content = styled.div`
    margin-top: 5vh;
    width: 100%;
    max-width: 150vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    @media ${mobileQuery} {
        margin-top: 0;
    }
`

const Sides = styled.div`
    width: 25%;
    @media ${mobileQuery} {
        display: flex;
        width: 50%;
        order: ${props => props.mobileOrder};
        margin: 4vh 0 4vh 0;
        justify-content: ${props => props.justify}
    }
`

const CanvasContainer = styled.div`
    width: 50vh;
    @media ${mobileQuery} {
        width: 80vw;
        max-width: 50vh;
        order: ${props => props.mobileOrder};
    }
`

const MainButton = styled.button`
    border-radius: 50%;
    background-color: ${colors.baksteen};
    color: white;
    font-size: 1.6vh;
    border: .4vh solid white;
    word-wrap: break-word;
    width: 15vh;
    height: 15vh;
    @media ${mobileQuery} {
        width: 70%;
        height: 8vh;
        border-radius: 10px;
        margin: 0% 3% 0% 3%;
        font-size: 2vh;
    }
    &:active{
        outline: none;
    }
    &:focus{
        outline: none;
    }
    &:hover{
        background-color: ${colors.accentYellow};
        color: ${colors.jasje};
    }
`

const SliderContainer = styled.div`
    height: 10vh;
    @media ${mobileQuery} {
        height: 12vh;
        border-radius: 5px;
    }
    width:100%;
`

const FooterRow = styled(MainRow) `
    align-items: flex-end;
    @media ${mobileQuery} {
        height: 8vh;
    }
    flex-grow: 1;
`

const Footer = styled.p`
    font-size: 16px;
    color: ${props => props.color};
    @media ${mobileQuery} {
        font-size: 2vh;
    }
`

function Main(props) {

    const [points, setPoints] = useState([]);
    const [phase, setPhase] = useState(.25);
    const [displayInfo, setDisplayInfo] = useState(false);

    function reset() {
        setPoints([]);
        if (displayInfo) { setDisplayInfo(false) }
    }

    function randomize() {
        const n = Math.floor(Math.random() * 10) + 3;
        function randomCoordinate() {
            return Math.random()*(1-radius*2) + radius; 
        }
        function createRandomPoints(arr = []) {
            console.log(randomCoordinate())
            return arr.length === n ? arr : createRandomPoints([...arr, [randomCoordinate(), randomCoordinate()]])
        }
        setPoints(createRandomPoints())
        if (displayInfo) { setDisplayInfo(false) }
    }
    
    return (
    <Container>
        <Header toggleDisplayInfo={() => setDisplayInfo(!displayInfo)}/>

        <MainRow backgroundColor={colors.jasje}>
            <Content>
                <Sides mobileOrder="2" justify="flex-end">
                    <MainButton onClick={randomize}><strong>randomize</strong></MainButton>
                </Sides>
                <CanvasContainer mobileOrder="1"> 
                        <CanvasArea points={points} setPoints={setPoints} displayInfo={displayInfo} setDisplayInfo={setDisplayInfo} phase={phase}/> :
                </CanvasContainer>
                <Sides mobileOrder="3" justify="flex-start">
                    <MainButton onClick={reset}><strong>reset</strong></MainButton>
                </Sides> 
                <SliderContainer>
                    <Slider title="Speed" value={phase} setValue={(value) => setPhase(value)}
                        trackColor="rgb(230,230,230)" circleColor={colors.baksteen} hoverColor={colors.accentYellow}/>
                </SliderContainer>
            </Content>
        </MainRow>
        <FooterRow>
            <Footer color={colors.baksteen}><strong>{"programming & design: www.thomascode.nl"}</strong></Footer>
        </FooterRow>
    </Container>
    )

}

export default Main;