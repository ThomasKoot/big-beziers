const constrain = (value, min, max) => {
    let val = value < min ? min : value;
    val = val > max ? max : val;
    return val   
}

export function getMousePos(evt) {
    let target = evt.currentTarget
    let rect = target.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top;        
    x = constrain(x/rect.width, 0, 1);
    y = constrain(y/rect.height, 0, 1);
    return ({x, y})
}

export const getReferencedMousePos = (reference, evt) => {
    let rect = reference.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top;
    x = constrain(x/rect.width, 0, 1);
    y = constrain(y/rect.height, 0, 1);
     
    return ({x, y})
}

//export default {getMousePos, getReferencedMousePos}