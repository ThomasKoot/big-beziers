
export function renderScreen(paths, canvas, bezierPath) {
    //renders all lines and points to the context at a given phase, includes all intermediate paths.

    const canvasSize = canvas.current.clientWidth;
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0,0,canvasSize,canvasSize);
    ctx.strokeStyle = "red"
    ctx.stroke(bezierPath);


    paths.reverse().forEach((e, i, a) => {          //path-array is reversed to ensure correct drawing order
        const percentage = ((i+1)/a.length * .5)    //percentage is used to lower the opacity for intermediate paths
        return (i === a.length - 1 || i === 0) ? null : drawIntermediatePoints(ctx, e, percentage)
    })
    drawBasePoints(ctx, paths[paths.length -1]) 
    if (paths.length > 1) { drawEndPoint(ctx, paths[0]) }
}

function drawBasePoints(ctx, paths) {
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.stroke(paths.line)
    paths.circles.forEach((circle, i, a) => {
        ctx.fillStyle = (i === 0 || i === a.length - 1) ? "red" : "green"
        ctx.fill(circle)
    })
}

function drawIntermediatePoints(ctx, paths, percentage) {
    ctx.strokeStyle = "rgba(0,0,0," + percentage + " )"
    ctx.fillStyle = "rgb(0,180,100," + percentage + " )"
    ctx.stroke(paths.line)
    paths.circles.forEach(circle => ctx.fill(circle))
}

function drawEndPoint(ctx, paths) {
    ctx.fillStyle = "rgb(20,80,220)"
    ctx.fill(paths.circles[0])
}

