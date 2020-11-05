import { findBezierPaths } from './functions'

export function renderScreen(points, ctx, phase) {
    //renders all lines and points to the context at a given phase, includes all intermediate paths.

    ctx.clearRect(0,0,500,500)
    const paths = findBezierPaths(points, phase)
    paths.reverse().forEach((e, i, a) => {          //path-array is reversed to ensure correct drawing order
        const percentage = ((i+1)/a.length * .5)    //percentage is used to lower the opacity for intermediate paths
        return i === a.length - 1 ? drawBasePoints(ctx, e) :
                    i === 0 ? drawEndPoint(ctx, e) : drawIntermediatePoints(ctx, e, percentage)
    })
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

