///<reference path="_testReferences.ts"/>
///<reference path="../_references.ts"/>
module jThreeTest {
    import TestClass = tsUnit.TestClass;
    import Matrix = jThree.Matrix.Matrix;

    export class MatrixTest extends TestClass {
        m1: Matrix = new Matrix(new Float32Array(
            [1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 3, 4]));

        m2: Matrix = new Matrix(new Float32Array(
            [3, 5, 7, 9,
            3, 5, 7, 9,
            3, 5, 7, 9,
            3, 6, 8, 9
            ]));

        eqaulTest() {
            this.isTrue(Matrix.eqaul(this.m1, new Matrix(new Float32Array([
                1, 2, 3, 4,
                1, 2, 3, 4,
                1, 2, 3, 4,
                1, 2, 3, 4
            ]))));
            this.isFalse(Matrix.eqaul(this.m1, new Matrix(new Float32Array([
                1, 2, 3, 4,
                1, 2, 3, 4,
                1, 2, 4, 4,
                1, 2, 3, 4
            ]))));
        }

        addTest() {
            this.isTrue(Matrix.eqaul(Matrix.add(this.m1, this.m2), new Matrix(new Float32Array([
                4, 7, 10, 13,
                4, 7, 10, 13,
                4, 7, 10, 13,
                4, 8, 11, 13
            ]))));
        }

        subtractTest() {
            this.isTrue(Matrix.eqaul(Matrix.subtract(this.m1, this.m2), new Matrix(new Float32Array([
                -2, -3, -4, -5,
                -2, -3, -4, -5,
                -2, -3, -4, -5,
                -2, -4, -5, -5
            ]))));
        }

        scalarMultiplyTest() {
            this.isTrue(Matrix.eqaul(Matrix.scalarMultiply(2, this.m1), new Matrix(new Float32Array([
                2, 4, 6, 8,
                2, 4, 6, 8,
                2, 4,6, 8,
                2, 4, 6, 8
            ]))));
        }

        invertTest() {
            this.isTrue(Matrix.eqaul(Matrix.invert(this.m1), new Matrix(new Float32Array([
                -1, -2, -3, -4,
                -1, -2, -3, -4,
                -1, -2, -3, -4,
                -1, -2, -3, -4
            ]))));
        }

        transposeTest() {
            this.isTrue(Matrix.eqaul(Matrix.transpose(this.m1), new Matrix(new Float32Array(
                [1, 1, 1, 1,
                    2, 2, 2, 2,
                    3, 3, 3, 3,
                    4, 4, 4, 4
                ]))));
        }
    }
} 