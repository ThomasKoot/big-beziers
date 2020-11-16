import React, { useState, useEffect } from 'react';
import CanvasArea from './CanvasArea';
import Slider from './Slider'
import Header from './Header'
import styled from 'styled-components'
import { colors, radius, mobileQuery } from './constants';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
`

const MainRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${props => props.backgroundColor || "white"};
    height: ${props => props.windowHeight * .7}px;
    @media ${mobileQuery} {
        height: ${props => props.windowHeight * .8}px;
    }
`

const A = styled.a`
    text-decoration: none;
    color: inherit;
`

const Content = styled.div`
    margin-top: ${props => props.height * 0.05}px;
    width: 100%;
    max-width: 150vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 95%;
    
`

const Sides = styled.div`
    width: 25%;
    @media ${mobileQuery} {
        display: flex;
        width: 50%;
        height: 10%;
        order: ${props => props.mobileOrder};
        justify-content: ${props => props.justify}
    }
`

const CanvasContainer = styled.div`
    width: 50vh;
    @media ${mobileQuery} {
        height: ${props => props.windowHeight * .5}px;
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
        height: 80%;
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
    order: 4;
    @media ${mobileQuery} {
        height: 15%;
        border-radius: 5px;
    }
    width:100%;
`

const FooterRow = styled(MainRow) `
    align-items: flex-end;
    height: ${props => props.windowHeight * .1}px;
    @media ${mobileQuery} {
        height: ${props => props.windowHeight * .05}px;
    }
`

const Footer = styled.p`
    font-size: 2vh;
    color: ${props => props.color};
    @media ${mobileQuery} {
        font-size: 1.5vh;
    }
`

function Main(props) {

    const [points, setPoints] = useState([]);
    const [phase, setPhase] = useState(.25);
    const [displayInfo, setDisplayInfo] = useState(false);
    const [height, setHeight] = useState(Number(window.innerHeight))

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

    useEffect(() => {
        function scaleHeight() {
            setHeight(Number(window.innerHeight))
        }
        window.addEventListener('resize', scaleHeight)

        return () => window.removeEventListener('resize', scaleHeight)
    })

    
    return (
    <Container height={height}>
        <Header windowHeight={height} toggleDisplayInfo={() => setDisplayInfo(!displayInfo)}/>

        <MainRow windowHeight={height} backgroundColor={colors.jasje}>
            <Content height={height}>
                <Sides mobileOrder="1" justify="flex-end">
                    <MainButton onClick={randomize}><strong>randomize</strong></MainButton>
                </Sides>
                <CanvasContainer mobileOrder="3" windowHeight={height}> 
                        <CanvasArea points={points} setPoints={setPoints} 
                            displayInfo={displayInfo} setDisplayInfo={setDisplayInfo} phase={phase}
                            canvasSize={height * .5}/> :
                </CanvasContainer>
                <Sides mobileOrder="2" justify="flex-start">
                    <MainButton onClick={reset}><strong>reset</strong></MainButton>
                </Sides> 
                <SliderContainer>
                    <Slider title="Speed" value={phase} setValue={(value) => setPhase(value)}
                        trackColor="rgb(230,230,230)" circleColor={colors.baksteen} hoverColor={colors.accentYellow}/>
                </SliderContainer>
            </Content>
        </MainRow>
        <FooterRow windowHeight={height}>
            <Footer color={colors.baksteen}><A href="http://www.thomascode.nl"><strong>{"programming & design: www.thomascode.nl"}</strong></A></Footer>
        </FooterRow>
    </Container>
    )
}

export default Main;