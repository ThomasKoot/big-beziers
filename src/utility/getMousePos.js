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
    x = constrain(x, 0, rect.width);
    y = constrain(y, 0, rect.height);
    return ({x, y})
}

export const getReferencedMousePos = (reference, evt) => {
    let rect = reference.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top;
    x = constrain(x, 0, rect.width);
    y = constrain(y, 0, rect.height);
     
    return ({x, y})
}

//export default {getMousePos, getReferencedMousePos}