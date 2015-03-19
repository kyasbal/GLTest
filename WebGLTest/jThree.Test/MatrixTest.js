var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="_testReferences.ts"/>
///<reference path="../_references.ts"/>
var jThreeTest;
(function (jThreeTest) {
    var TestClass = tsUnit.TestClass;
    var Matrix = jThree.Matrix.Matrix;
    var MatrixTest = (function (_super) {
        __extends(MatrixTest, _super);
        function MatrixTest() {
            _super.apply(this, arguments);
            this.m1 = new Matrix(new Float32Array([1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]));
            this.m2 = new Matrix(new Float32Array([3, 5, 7, 9, 3, 5, 7, 9, 3, 5, 7, 9, 3, 6, 8, 9]));
        }
        MatrixTest.prototype.eqaulTest = function () {
            this.isTrue(Matrix.eqaul(this.m1, new Matrix(new Float32Array([
                1,
                2,
                3,
                4,
                1,
                2,
                3,
                4,
                1,
                2,
                3,
                4,
                1,
                2,
                3,
                4
            ]))));
            this.isFalse(Matrix.eqaul(this.m1, new Matrix(new Float32Array([
                1,
                2,
                3,
                4,
                1,
                2,
                3,
                4,
                1,
                2,
                4,
                4,
                1,
                2,
                3,
                4
            ]))));
        };
        MatrixTest.prototype.addTest = function () {
            this.isTrue(Matrix.eqaul(Matrix.add(this.m1, this.m2), new Matrix(new Float32Array([
                4,
                7,
                10,
                13,
                4,
                7,
                10,
                13,
                4,
                7,
                10,
                13,
                4,
                8,
                11,
                13
            ]))));
        };
        MatrixTest.prototype.subtractTest = function () {
            this.isTrue(Matrix.eqaul(Matrix.subtract(this.m1, this.m2), new Matrix(new Float32Array([
                -2,
                -3,
                -4,
                -5,
                -2,
                -3,
                -4,
                -5,
                -2,
                -3,
                -4,
                -5,
                -2,
                -4,
                -5,
                -5
            ]))));
        };
        MatrixTest.prototype.scalarMultiplyTest = function () {
            this.isTrue(Matrix.eqaul(Matrix.scalarMultiply(2, this.m1), new Matrix(new Float32Array([
                2,
                4,
                6,
                8,
                2,
                4,
                6,
                8,
                2,
                4,
                6,
                8,
                2,
                4,
                6,
                8
            ]))));
        };
        MatrixTest.prototype.invertTest = function () {
            this.isTrue(Matrix.eqaul(Matrix.invert(this.m1), new Matrix(new Float32Array([
                -1,
                -2,
                -3,
                -4,
                -1,
                -2,
                -3,
                -4,
                -1,
                -2,
                -3,
                -4,
                -1,
                -2,
                -3,
                -4
            ]))));
        };
        return MatrixTest;
    })(TestClass);
    jThreeTest.MatrixTest = MatrixTest;
})(jThreeTest || (jThreeTest = {}));
//# sourceMappingURL=MatrixTest.js.map