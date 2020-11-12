
export function renderBezierPath(bezierArray, canvas) {
    //takes an array of points (bezierArray) with coordinates between 0 and 1. Scales the points to the current canvas size and draws line segments between them

    const canvasSize = canvas.current.clientWidth;
    const ctx = canvas.current.getContext('2d');
    
    function scaleBezierPath(bezierArray, scale) {
        const bezierPath = bezierArray.map((e, i) => (i === 0 ? "M" : "L") + e[0] * scale + "," + e[1] * scale).join(" ")
        return new Path2D(bezierPath)
    }

    const bezierPath = scaleBezierPath(bezierArray, canvasSize);
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.stroke(bezierPath);
}

export function renderRecursiveBezier(paths, canvas) {
    //renders all lines and points to the context at a given phase, includes all intermediate paths.

    const canvasSize = canvas.current.clientWidth;
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0,0,canvasSize,canvasSize);
    ctx.lineWidth = .5;

    paths.reverse().forEach((e, i, a) => {          //path-array is reversed to ensure correct drawing order
        const percentage = ((i+1)/a.length * .5)    //percentage is used to lower the opacity for intermediate paths
        const firstOrLast = i === a.length - 1 || i === 0;
        return firstOrLast ? null : renderIntermediatePoints(ctx, e, percentage)
    })
    renderBasePoints(ctx, paths[paths.length -1]) 
    if (paths.length > 1) { renderEndPoint(ctx, paths[0]) }
}

function renderBasePoints(ctx, paths) {
    ctx.strokeStyle = "rgba(0,0,0,.5)"
    ctx.stroke(paths.line)
    paths.circles.forEach((circle, i, a) => {
        ctx.fillStyle = (i === 0 || i === a.length - 1) ? "red" : "rgba(30,180,50,.7)"
        ctx.fill(circle)
    })
}

function renderIntermediatePoints(ctx, paths, percentage) {
    ctx.strokeStyle = "rgba(0,0,0," + percentage + " )"
    ctx.fillStyle = "rgb(0,180,100," + percentage + " )"
    ctx.stroke(paths.line)
    paths.circles.forEach(circle => ctx.fill(circle))
}

function renderEndPoint(ctx, paths) {
    ctx.fillStyle = "rgb(20,80,220)"
    ctx.fill(paths.circles[0])
}

