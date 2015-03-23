///<reference path="_testReferences.ts"/>
///<reference path="../_references.ts"/>
///<reference path="../Scripts/typings/qunit/qunit.d.ts"/>
QUnit.module("Matrix Test");
module jThreeTest {
    import TestClass = tsUnit.TestClass;
    import Matrix = jThree.Matrix.Matrix;
    import Vector3 = jThree.Mathematics.Vector.Vector3;
    import Vector4 = jThree.Mathematics.Vector.Vector4;

        var m1: Matrix = new Matrix(new Float32Array(
            [1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 3, 4]));

        var m2: Matrix = new Matrix(new Float32Array(
            [3, 5, 7, 9,
            3, 5, 7, 9,
            3, 5, 7, 9,
            3, 6, 8, 9
            ]));

        var v31: Vector3 = new Vector3(1, 2, 3);

        var v41:Vector4=new Vector4(1,2,3,4);


    QUnit.test("equalTest", () => {
        QUnit.equal(Matrix.equal(m1, new Matrix(new Float32Array([
            1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 3, 4
        ]))),true);
        QUnit.equal(Matrix.equal(m1, new Matrix(new Float32Array([
            1, 2, 3, 4,
            1, 2, 3, 4,
            1, 2, 4, 4,
            1, 2, 3, 4
        ]))),false);
    });

    QUnit.test("addTest", () => {
        QUnit.equal(Matrix.equal(Matrix.add(m1, m2), new Matrix(new Float32Array([
            4, 7, 10, 13,
            4, 7, 10, 13,
            4, 7, 10, 13,
            4, 8, 11, 13
        ]))),true);
    });

    QUnit.test("subtractTest", () => {
        QUnit.equal(Matrix.equal(Matrix.subtract(m1, m2), new Matrix(new Float32Array([
            -2, -3, -4, -5,
            -2, -3, -4, -5,
            -2, -3, -4, -5,
            -2, -4, -5, -5
        ]))),true);
    });

    QUnit.test("scalarMultiplyTest", () => {
        QUnit.equal(Matrix.equal(Matrix.scalarMultiply(2, m1), new Matrix(new Float32Array([
            2, 4, 6, 8,
            2, 4, 6, 8,
            2, 4, 6, 8,
            2, 4, 6, 8
        ]))),true);
    });

    QUnit.test("nvertTest", () => {
        QUnit.equal(Matrix.equal(Matrix.negate(m1), new Matrix(new Float32Array([
            -1, -2, -3, -4,
            -1, -2, -3, -4,
            -1, -2, -3, -4,
            -1, -2, -3, -4
        ]))),true);
    });

    QUnit.test("transposeTest", () => {
        console.log(Matrix.transpose(m1).toString(),true);
        QUnit.equal(Matrix.equal(Matrix.transpose(m1), new Matrix(new Float32Array(
        [
            1, 1, 1, 1,
            2, 2, 2, 2,
            3, 3, 3, 3,
            4, 4, 4, 4
        ]))),true);
    });

    QUnit.test("translateTest", () => {
        QUnit.equal(Matrix.equal(Matrix.translate(new Vector3(1, 2, 3)), new Matrix(new Float32Array([
            1, 0, 0, 1,
            0, 1, 0, 2,
            0, 0, 1, 3,
            0, 0, 0, 1
        ]))),true);
    });

    QUnit.test("transformPointTest", () => {
        QUnit.equal(Vector3.equal(Matrix.transformPoint(m1, v31), new Vector3(18, 18, 18)),true);
    });

    QUnit.test("transformNormalTest", () => {
        QUnit.equal(Vector3.equal(Matrix.transformNormal(m1, v31), new Vector3(14, 14, 14)),true);
    });

    QUnit.test("transformTest", () => {
        QUnit.equal(Vector4.equal(Matrix.transform(m1, v41), new Vector4(30, 30, 30, 30)),true);
    });

    QUnit.test("determinant test",() => {
        console.log(
            Matrix.determinant(Matrix.translate(new Vector3(1, 2, 3))));
        QUnit.equal(Matrix.determinant(Matrix.translate(new Vector3(1,2,3))),1);
    });
}