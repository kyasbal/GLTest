///<reference path="../_references.ts"/>
module jThree.Matrix {
    import JThreeObject = jThree.Base.jThreeObject;
    import Enumerable = jThree.Collections.IEnumerable;
    import Enumrator = jThree.Collections.IEnumrator;
    import Func2 = jThree.Delegates.Func2;
    import Vector3 = jThree.Mathematics.Vector.Vector3;
    import Collection = jThree.Collections.Collection;
    import Vector4 = jThree.Mathematics.Vector.Vector4;

    export interface IMatrixFactory<T> {
        fromFunc(f:Func2<number,number, number>): T;
    }

    export class MatrixFactory implements Mathematics.Vector.ILinearObjectFactory<Matrix>,IMatrixFactory<Matrix> {
        fromArray(array: Float32Array): Matrix {
            return new Matrix(array);
        }

        fromFunc(f: Func2<number, number, number>): Matrix {
            return new Matrix(new Float32Array(
                [f(0, 0), f(0, 1), f(0, 2), f(0, 3),
                    f(1, 0), f(1, 1), f(1, 2), f(1, 3),
                    f(2, 0), f(2, 1), f(2, 2), f(2, 3),
                    f(3,0),f(3,1),f(3,2),f(3,3)
            ]));
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

    export class MatrixBase extends jThree.Mathematics.Vector.LinearBase implements Enumerable<number> {
        getEnumrator(): jThree.Collections.IEnumrator<number> { throw new Error("Not implemented"); }

        protected static elementTranspose<T extends MatrixBase>(a: T, factory: IMatrixFactory<T>): T {
            return factory.fromFunc((i, j) => {
                return a.getAt(j, i);
            });
        }

        getRowCount(): number {
            return 0;
        }

        getColmunCount(): number {
            return 0;
        }

        getAt(row: number,colmun:number): number {
            throw new Error("Not implemented");
        }

        getBySingleIndex(index: number): number {
            throw new Error("Not implemented");
        }
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
            [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
        }

        private static identityElements(): Float32Array {
            return new Float32Array(
                [
                    1, 0, 0, 0,
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

        constructor(arr: Float32Array) {
            super();
            if (!this.isValidArray(arr))throw new jThree.Exceptions.InvalidArgumentException("Invalid matrix source was passed.");
            this.elements = arr;
        }

        getAt(row: number, colmun: number): number {
            return this.elements[colmun + row * 4];
        }

        private setAt(colmun: number, row: number, val: number) {
            this.elements.set[colmun + row * 4]= val;
        }

        getBySingleIndex(index: number): number {
            return this.elements[index];
        }

        getColmun(col: number): jThree.Mathematics.Vector.Vector4 {
            return new jThree.Mathematics.Vector.Vector4(this.elements[col], this.elements[col + 4], this.elements[col + 8], this.elements[col + 12]);
        }

        getRow(row: number): jThree.Mathematics.Vector.Vector4 {
            return new jThree.Mathematics.Vector.Vector4(this.elements[row * 4], this.elements[row * 4 + 1], this.elements[row * 4 + 2], this.elements[row * 4 + 3]);
        }

        isNaN(): boolean {
            var result: boolean = false;
            Collections.Collection.foreach<number>(this, (a) => {
                if (isNaN(a))result = true;
            });
            return result;
        }

        static eqaul(m1: Matrix, m2: Matrix): boolean {
            return this.elementEqual(m1, m2);
        }

        static add(m1: Matrix, m2: Matrix): Matrix {
            return this.elementAdd(m1, m2, m1.getFactory());
        }

        static subtract(m1: Matrix, m2: Matrix): Matrix {
            return this.elementSubtract(m1, m2, m1.getFactory());
        }

        static scalarMultiply(s: number, m: Matrix): Matrix {
            return this.elementScalarMultiply(m, s, m.getFactory());
        }

        static invert(m: Matrix): Matrix {
            return this.elementInvert(m, m.getFactory());
        }

        static transpose(m: Matrix): Matrix {
            return this.elementTranspose(m, m.getFactory());
        }

        static transformPoint(m: Matrix, v: Vector3): Vector3 {
            var result: Float32Array = new Float32Array(3);
            for (var i = 0; i < 3; i++) {
                result[i] = 0;
                Collection.foreachPair(m.getRow(i), v, (r, v, index) => {
                    result[i] += r * v;
                });
            }
            for (var i = 0; i < 3; i++) {
                result[i] += m.getAt(i,3);
            }
            return v.getFactory().fromArray(result);
        }

        static transformNormal(m: Matrix, v: Vector3): Vector3 {
            var result: Float32Array = new Float32Array(3);
            for (var i = 0; i < 3; i++) {
                result[i] = 0;
                Collection.foreachPair(m.getRow(i), v, (r, v, index) => {
                    result[i] += r * v;
                });
            }
            return v.getFactory().fromArray(result);
        }

        static transform(m: Matrix, v: Vector4):Vector4 {
            var result: Float32Array = new Float32Array(4);
            for (var i = 0; i < 4; i++) {
                result[i] = 0;
                Collection.foreachPair(m.getRow(i), v,(r, v, index) => {
                    result[i] += r * v;
                });
            }
            return v.getFactory().fromArray(result);
        }
        
        static translate(v: Vector3): Matrix {
            var m: Matrix = new Matrix(new Float32Array([
                1, 0, 0, v.X,
                0, 1, 0, v.Y,
                0, 0, 1, v.Z,
                0, 0, 0, 1
            ]));
            return m;
        }

    toString(): string {
            return "|{0} {1} {2} {3}|\n|{4} {5} {6} {7}|\n|{8} {9} {10} {11}|\n|{12} {13} {14} {15}|".format(this.getBySingleIndex(0),this.getBySingleIndex(1),this.getBySingleIndex(2),this.getBySingleIndex(3),this.getBySingleIndex(4),this.getBySingleIndex(5),this.getBySingleIndex(6),this.getBySingleIndex(7),this.getBySingleIndex(8),this.getBySingleIndex(9),this.getBySingleIndex(10),this.getBySingleIndex(11),this.getBySingleIndex(12),this.getBySingleIndex(13),this.getBySingleIndex(14),this.getBySingleIndex(15));
        }

        getEnumrator(): jThree.Collections.IEnumrator<number> {
            return new MatrixEnumerator(this);
        }

        get ElementCount(): number { return 16; }

        private static factoryCache:MatrixFactory;

        getFactory():MatrixFactory {
            Matrix.factoryCache = Matrix.factoryCache || new MatrixFactory();
            return Matrix.factoryCache;
        }

        getRowCount(): number { return 4; }

        getColmunCount(): number { return 4; }
    }
} 