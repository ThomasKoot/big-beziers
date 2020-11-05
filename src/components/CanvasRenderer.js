
import { renderScreen } from './drawFunctions'

function canvasRenderer (points, canvas, phaseRef, isAnimated) {
    //handles the rendering of the canvas, takes a phaseRef which is used to increment the phase without
    //rerendering the parent component. 

    //when isAnimated the function starts the animation and return a function that stops the animation, 
    //otherwise, only a single screen in rendered. 

    const ctx = canvas.getContext('2d');
    let requestId;

    function animate() {
        phaseRef.current = (phaseRef.current + 0.01) % 1;
        renderScreen(points, ctx, phaseRef.current)
        requestId = requestAnimationFrame(animate)
    }

    if (isAnimated) { 
        requestId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestId)
    } else {
        renderScreen(points, ctx, phaseRef.current)
    }

}


export default canvasRenderer;