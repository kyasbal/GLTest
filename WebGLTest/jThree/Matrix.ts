///<reference path="../_references.ts"/>
module jThree.Matrix {
    import JThreeObject = jThree.Base.jThreeObject;
    import Enumerable = jThree.Collections.IEnumerable;
    import Enumrator = jThree.Collections.IEnumrator;
    import Func1 = jThree.Delegates.Func1;
    import Vector4 = jThree.Mathematics.Vector.Vector4;

    class MatrixFactory implements Mathematics.Vector.ILinearObjectFactory<Matrix> {
        fromArray(array: Float32Array): Matrix {
            return new Matrix(array);
        }
    }


    class MatrixEnumerator extends JThreeObject implements Enumrator<number> {
        private targetMat: Matrix;

        private currentIndex:number=-1;

        constructor(targetMat: Matrix) {
            super();
            this.targetMat = targetMat;
        }

        getCurrent(): number {
            return this.targetMat.getBySingleIndex(this.currentIndex);
        }

        next(): boolean {
            this.currentIndex++;
            if (this.currentIndex >= 0 && this.currentIndex < 16) return true;
            return false;
        }
    }

    export class MatrixBase extends jThree.Mathematics.Vector.VectorBase implements Enumerable<number> {
        getEnumrator(): jThree.Collections.IEnumrator<number> { throw new Error("Not implemented"); }
    }

    export class Matrix extends MatrixBase implements Mathematics.Vector.ILinearObjectGenerator<Matrix> {
        public static zero(): Matrix {
            return new Matrix(this.zeroElements());
        }

        public static identity(): Matrix {
            return new Matrix(this.identityElements());
        }

        private static zeroElements(): Float32Array {
            return new Float32Array(
                    [0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0]);
        }

        private static identityElements(): Float32Array {
            return new Float32Array(
                    [1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                    ]
                 );
        }

        private elements: Float32Array = Matrix.zeroElements();

        private isValidArray(arr: Float32Array): boolean {
            if (arr.length !== 16) return false;
            return true;
        }

        constructor(arr:Float32Array) {
            super();
            if (!this.isValidArray(arr))throw new jThree.Exceptions.InvalidArgumentException("Invalid matrix source was passed.");
            this.elements = arr;
        }

        getAt(colmun: number, row: number): number {
            return this.elements.get(colmun + row * 4);
        }

        getBySingleIndex(index: number): number {
            return this.elements[index];
        }

        getColmun(col: number):Vector4 {
            return new Vector4(this.elements[col],this.elements[col+4],this.elements[col+8],this.elements[col+12]);
        }

        getRow(row: number): Vector4 {
            return new Vector4(this.elements[row * 4], this.elements[row * 4 + 1], this.elements[row * 4 + 2], this.elements[row * 4 + 3]);
        }

        isNaN(): boolean {
            var result: boolean = false;
            Collections.Collection.foreach<number>(this, (a) => {
                if (isNaN(a))result = true;
            });
            return result;
        }

        static add(m1: Matrix, m2: Matrix): Matrix {
            return this.elementAdd(m1, m2,m1.getFactory());
        }

        static subtract(m1: Matrix, m2: Matrix): Matrix {
            return this.elementSubtract(m1, m2, m1.getFactory());
        }

        toString(): string {
            return "|{0} {1} {2} {3}|\n|{4} {5} {6} {7}|\n|{8} {9} {10} {11}|\n|{12} {13} {14} {15}|".format(this.getBySingleIndex(0),this.getBySingleIndex(1),this.getBySingleIndex(2),this.getBySingleIndex(3),this.getBySingleIndex(4),this.getBySingleIndex(5),this.getBySingleIndex(6),this.getBySingleIndex(7),this.getBySingleIndex(8),this.getBySingleIndex(9),this.getBySingleIndex(10),this.getBySingleIndex(11),this.getBySingleIndex(12),this.getBySingleIndex(13),this.getBySingleIndex(14),this.getBySingleIndex(15));
        }

        getEnumrator(): jThree.Collections.IEnumrator<number> {
            return new MatrixEnumerator(this);
        }

        elementCount(): number { return 16; }

        private static factoryCache:MatrixFactory;

        getFactory(): jThree.Mathematics.Vector.ILinearObjectFactory<Matrix> {
            Matrix.factoryCache = Matrix.factoryCache || new MatrixFactory();
            return Matrix.factoryCache;
        }
    }
} 