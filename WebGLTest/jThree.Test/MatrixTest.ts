///<reference path="_testReferences.ts"/>
///<reference path="../_references.ts"/>
module jThreeTest {
    import TestClass = tsUnit.TestClass;
    import Matrix = jThree.Matrix.Matrix;
    import Vector3 = jThree.Mathematics.Vector.Vector3;
    import Vector4 = jThree.Mathematics.Vector.Vector4;

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

        v31: Vector3 = new Vector3(1, 2, 3);

        v41:Vector4=new Vector4(1,2,3,4);


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
            console.log(Matrix.transpose(this.m1).toString());
            this.isTrue(Matrix.eqaul(Matrix.transpose(this.m1), new Matrix(new Float32Array(
                [1, 1, 1, 1,
                    2, 2, 2, 2,
                    3, 3, 3, 3,
                    4, 4, 4, 4
                ]))));
        }

        translateTest() {
            this.isTrue(Matrix.eqaul(Matrix.translate(new Vector3(1, 2, 3)), new Matrix(new Float32Array([
                1, 0, 0, 1,
                0, 1, 0, 2,
                0, 0, 1, 3,
                0, 0, 0, 1
            ]))));
        }

        transformPointTest() {
            this.isTrue(Vector3.equal(Matrix.transformPoint(this.m1,this.v31),new Vector3(18,18,18)));
        }

        transformNormalTest() {
            this.isTrue(Vector3.equal(Matrix.transformNormal(this.m1, this.v31), new Vector3(14,14,14)));
        }

        transformTest() {
            this.isTrue(Vector4.equal(Matrix.transform(this.m1, this.v41), new Vector4(30, 30, 30, 30)));
        }
    }
} 