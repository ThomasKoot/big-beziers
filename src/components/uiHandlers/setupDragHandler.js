import { getReferencedMousePos } from "../../utility/getMousePos";

function setupDragHandler(draggedIndex, setPoints, e) {
        //moves the point at draggedIndex to the mouse/touch location. Event listeners are attached to window
        //to ensure correct draggin behaviour when the tries to push the dragged elements beyond it's boundaries

        const isMobile = /^touch/.test(e.type)

        const handlerSwitch = {
            drag: isMobile ? "touchmove" : "mousemove",
            release: isMobile ? "touchend" : "mouseup"
        }

        function cleanUp() {
            window.removeEventListener(handlerSwitch.drag, handleDrag)
            window.removeEventListener(handlerSwitch.release, cleanUp)
        }

        const dragReference = e.target;

        function handleDrag(e) {
            const mouse = getReferencedMousePos(dragReference, e);
            setPoints(prev => prev.map((p, i) => {
                return i === draggedIndex ? [mouse.x, mouse.y] : p
            }))
        }

        window.addEventListener(handlerSwitch.drag, handleDrag, {passive : false})
        window.addEventListener(handlerSwitch.release, cleanUp,)
    }

export default setupDragHandler;