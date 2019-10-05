class Matrix {
    constructor(r, c) {
        this.rows = r;
        this.columns = c;
        this.data = [];
        var i, j;
        for (i = 0; i < this.rows; i++) {
            this.data.push([]);
            for (j = 0; j < this.columns; j++) {
                this.data[i].push(0);
            }
        }
    }

    set values(v) {
        var i, j, idx;
        // v is already a 2d array with dims equal to rows and columns
        if (v instanceof Array && v.length === this.rows && 
            v[0] instanceof Array && v[0].length === this.columns) {
            this.data = v;
        }
        // not valid
        else {
            console.log("could not set values for " + this.rows + "x" + this.columns + " maxtrix");
        }
    }

    get values() {
        return this.data.slice();
    }

    // matrix multiplication (this * rhs)
    mult(rhs) {
        var result = null;
        // ensure multiplication is valid
        if (rhs instanceof Matrix && this.columns === rhs.rows) {
            // implement matrix multiplication here!
			
			var m = new Array(this.rows);
			for(var i = 0; i<this.rows; i++){
				m[i] = new Array(rhs.columns);
			}

			for(var i = 0; i< rhs.columns; i++){
				for(var k = 0; k<this.rows; k++){
					var value = 0;
					for(var j = 0; j< rhs.rows; j++){
						value=value+this.data[k][j]*rhs.data[j][i];
						
					}
					m[k][i] = value;
					console.log(m[k][i]);
				}
			}
			var new_M = new Matrix(this.rows,rhs.columns);
			console.log(m);
			new_M.data = m;
			result = new_M;
        }
        else {
            console.log("could not multiply - row/column mismatch");
        }
        return result;
    }
}

Matrix.multiply = function(...args) {
    var i;
    var result = null;
    // ensure at least 2 matrices
    if (args.length >= 2 && args.every((item) => {return item instanceof Matrix;})) {
        result = args[0];
        i = 1;
        while (result !== null && i < args.length) {
            result = result.mult(args[i]);
            i++;
        }
    }
    else {
        console.log("could not multiply - requires at least 2 matrices");
    }
    return result;
}
