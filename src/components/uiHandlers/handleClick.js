import { radius } from '../constants'
import { getMousePos } from "../../utility/getMousePos";
import setupDragHandler from './setupDragHandler'

function compareRange(mouse, range) {
    return function inner(point) {
        const dist = Math.sqrt((mouse.x-point[0]) ** 2 + (mouse.y-point[1]) ** 2)
        return dist < range
    }
}

function initializeClickHandler() {
    //Clickhandler with double click detection. The doubleClick index is saved in a closure, 
    //the clickhandler sets this index upon click and activates a timeout to reset the value to undefined.
    //If the click did not target a point, a point is added with the mouse coordinates. 
    //Otherwise, the targeted point is forwarded to the draghandler. (a newly added point is also forwarded to the draghandler)

    let doubleClickIndex;
    let doubleClickTimeoutId;

    return function setupClickHandler(points, setPoints) {
        
        return function handleClick(e) {

            const mouse = getMousePos(e); 
            const withinMouseRange = compareRange(mouse, radius);
            const targetedPoint = points.map(withinMouseRange).indexOf(true); 
            
            if (targetedPoint === -1 ) {
                setPoints(prev => prev.length < 2 ?
                    [...prev, [mouse.x, mouse.y]] :
                    [...prev.slice(0,-1), [mouse.x, mouse.y], ...prev.slice(-1)]
                )
                
            } else if (targetedPoint === doubleClickIndex) {
                setPoints(prev => prev.filter((_, i) => i !== targetedPoint));
                doubleClickIndex = undefined;
                return;
            }

            const draggedIndex = targetedPoint === -1 ? Math.max(points.length -1,1) : targetedPoint;
            setupDragHandler(draggedIndex, setPoints, e);

            if (doubleClickIndex) {
                clearTimeout(doubleClickTimeoutId);
            }
            doubleClickIndex = targetedPoint;
            doubleClickTimeoutId = setTimeout(() => doubleClickIndex = undefined, 400);
        }
    }
}

 
export const setupClickHandler = initializeClickHandler();




