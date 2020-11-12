import { intermediateRadiusRatio, endPointRatio, radius } from '../constants'

export function findBezierPaths(points, phase, scale) {
    //takes a points-array and converts this into an array of Path2D object representing
    //all lines and points of the bezier algorithm at a given phase. Lines are rendered as SVG-paths.
    //returns an array of objects of the form {cirles, line}, each entry represents the elements of one iteration of the 
    //recursive bezier algorithm. 

    let p = points.map(e => e.map(x => x * scale));

    if (p.length === 1) return ([calculatePaths(p, radius * scale)]) //if there is only one point, it is considered a base point

    let paths = [];

    while (p.length >= 2) {
        paths.push(calculatePaths(p, radius * scale * ((p.length === points.length) ? 1 : intermediateRadiusRatio)));
        p = findNewPoints(p, phase)
    }
    paths.push(calculatePaths(p, radius * scale * endPointRatio))
    return paths;
}

function findNewPoints(points, phase) {
    const newPoints = points.map((e,i,a) => {
        if (i === 0) return undefined;     
        return [a[i-1][0] * (1 - phase) + e[0] * phase, a[i-1][1] * (1-phase) + e[1] * phase];
    })
    return newPoints.slice(1)
}

function calculatePaths(points, r) {

    const lineString = points.map((e, i) => {
        return (i === 0 ? "M" : "L") + e[0] + "," + e[1]
    }).join("")

    const line = new Path2D(lineString)

    const circles = points.map((e) => {
        let path = new Path2D();
        path.ellipse(e[0], e[1], r, r, 0, 0, 2*Math.PI)
        return path
    })

    return {circles, line};
}

