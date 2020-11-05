function memoizedFactorial() {
    let cache = [1];
    function inner(n) {
        if (!cache[n]) {
        cache[n] = inner(n - 1) * n 
        } 
        return cache[n]
    }
    return inner
}

function setupBezierFunction(points) {
    //sets up the bernstein polynomials, returns a function that is only dependent on t. 
        
    let factorial = memoizedFactorial();

    function binomialCoefficient(n, k) {
        return factorial(n) / (factorial(k) * factorial(n-k))
    }

    function generateCoefficients(points) { 
        return points.map((_, i, a) => binomialCoefficient(a.length -1 , i))
    }

    const coefficients = generateCoefficients(points);
    return function(t) { 
        const n = points.length - 1;
        return points.map((e, i) => {
            const multiplier = coefficients[i] * t**i * (1 - t)**(n-i);
            return e.map(x => x*multiplier)
        }).reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1]], [0,0])
    }
}

export function calculateBezierPath(points, resolution) {
    //this function creates a path approximating the bezier path defined by -points. The -resolution set the
    //number of straight lines used to approximate the path.

    const bezierFunction = setupBezierFunction(points);
    let bezierArray = [];
    let i = 0;
    while(i <= resolution) {
        bezierArray.push(bezierFunction(i/resolution));
        i++
    }
    const bezierPath = bezierArray.map((e, i) => (i === 0 ? "M" : "L") + e[0] + "," + e[1]).join(" ")
    
    return new Path2D(bezierPath)
}