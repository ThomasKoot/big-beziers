import { findBezierPaths } from '../calculations/recursiveBezierFunctions'
import { renderRecursiveBezier, renderBezierPath } from './renderFunctions'

function canvasRenderer (points, phase, canvas, bezierArray)  {
    //delegates the calculations and rendering of the canvas. 

    if (!points) { 
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0,0,canvas.current.clientWidth, canvas.current.clientWidth);
        return
    }

    const paths = findBezierPaths(points, phase, canvas.current.clientWidth)
    renderRecursiveBezier(paths, canvas)
    if (bezierArray) { renderBezierPath(bezierArray, canvas) }
}


export default canvasRenderer;