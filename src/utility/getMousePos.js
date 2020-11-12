export const constrain = (value, min, max) => {
    let val = value < min ? min : value;
    val = val > max ? max : val;
    return val   
}

export function getMousePos(evt) {
    const isTouch = /^touch/.test(evt.type);
    let target = evt.currentTarget
    let rect = target.getBoundingClientRect();
    let x = (isTouch ? evt.touches[0].clientX : evt.clientX) - rect.left;
    let y = (isTouch ? evt.touches[0].clientY : evt.clientY) - rect.top;        
    x = constrain(x/rect.width, 0, 1);
    y = constrain(y/rect.height, 0, 1);
    return ({x, y})
}

export const getReferencedMousePos = (reference, evt) => {
    const isTouch = /^touch/.test(evt.type);
    let rect = reference.getBoundingClientRect();
    let x = (isTouch ? evt.touches[0].clientX : evt.clientX) - rect.left;
    let y = (isTouch ? evt.touches[0].clientY : evt.clientY) - rect.top;  
    x = constrain(x/rect.width, 0, 1);
    y = constrain(y/rect.height, 0, 1);
     
    return ({x, y})
}

//export default {getMousePos, getReferencedMousePos}