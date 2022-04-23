var gcd = (a, b) => (b > 0) ? gcd(b, a % b) : a;

function Rational(n, d) {
    if (d == 0) throw new RangeError("DivideByZero (" + n + "/" + d + ")");
    else if ((n < 0 && d < 0) || (n > 0 && d < 0)) return new Rational(-n, -d);

    let g = gcd(Math.abs(n), d);
    this.n = n / g;
    this.d = d / g;
}

Rational.prototype.toString = function () {
    return this.n + "/" + this.d;
};

Rational.prototype.negate = function () {
    return new Rational(-this.n, this.d);
}

Rational.prototype.inverse = function () {
    return new Rational(this.d, this.n);
}

Rational.prototype.add = function (r) {
    return new Rational(
        r.d * this.n + this.d * r.n,
        this.d * r.d
    );
}

Rational.prototype.sub = function (r) {
    return this.add(r.negate());
}

Rational.prototype.mul = function (r) {
    return new Rational(
        this.n * r.n,
        this.d * r.d
    );
}

Rational.prototype.div = function (r) {
    return this.mul(r.inverse());
}

Rational.prototype.mod = function (r) {
    return new Rational(
        (this.n * r.d) % (r.n * this.d),
        this.d * r.d
    );
}

Rational.ZERO = new Rational(0, 1);

function Rationalize (_) {    
    /**
     * Rationalize()
     * => 0
     * 
     * Rationalize(3, 7)
     * => 3/7
     * 
     * Rationalize("3", 7)
     * => 3/7
     * 
     * Rationalize([3, 7])
     * => 3/7
     * 
     * Ratoinalize({ n: 3, d: 7 })
     * => 3/7
     * 
     * Rationalize("0.'428571'")
     * => 3/7
     */

    switch (arguments.length) {
        case 0: {
            return Rational.ZERO;
        }

        case 1: {
            switch (arguments[0].constructor) {
                case Rational: {
                    return arguments[0];
                }

                case Object: {
                    return new Rational(arguments[0].n || 0, arguments[0].d || 1);
                }

                case Array: {
                    return new Rational(arguments[0][0] || 0, arguments[0][1] || 1);
                }

                case Number: {
                    return Rationalize(String(arguments[0]));
                }

                case String: {
                    // 0.(34)
                    // 0.34
                    
                    var med = (arguments[0].match(/([+-]?\d+)(?:\.(\d+)?(?:\((\d+)\))?)?/) || []).slice(1).map(e => e || '');

                    const FRONT = med[0];
                    const IN = med[1];
                    const CYCLE = med[2] || '0';

                    const N = Number(FRONT + IN + CYCLE) - Number(FRONT + IN);
                    const D = Math.pow(10, IN.length) * (Math.pow(10, CYCLE.length) - 1);

                    return new Rational(N, D);
                }
            }
        } 

        case 2: {
            return new Rational(Number(arguments[0]), Number(arguments[1]));
        }

        default: {
            return Rational.ZERO;
        }
    }
};

r1 = Rationalize('3.3(142857)');
r2 = Rationalize(1, 7);
console.log(`${r1.toString()} + ${r2.toString()} = ${r1.add(r2).toString()}`);
console.log(`${r1.toString()} - ${r2.toString()} = ${r1.sub(r2).toString()}`);
console.log(`${r1.toString()} * ${r2.toString()} = ${r1.mul(r2).toString()}`);
console.log(`${r1.toString()} / ${r2.toString()} = ${r1.div(r2).toString()}`);
console.log(`${r1.toString()} % ${r2.toString()} = ${r1.mod(r2).toString()}`);