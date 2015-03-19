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
            3, 5, 7, 9
            ]));

        eqaulTest() {
            
        }
    }
} 