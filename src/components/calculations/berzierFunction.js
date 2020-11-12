function setupBezierFunction(points) {
    //Sets up the bernstein polynomials, returns a function that is only dependent on t. 
    //A memoized factorial function is used to calculate the binomial coefficients for optimisation purposes.

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

function calculateBezierArray(points, resolution) {
    //Creates an array of coordinates approximating the bezier path defined by -points. 

    const bezierFunction = setupBezierFunction(points);
    let bezierArray = [];
    let i = 0;
    while(i <= resolution) {
        bezierArray.push(bezierFunction(i/resolution));
        i++
    }     
    return bezierArray;
}

export default calculateBezierArray;

