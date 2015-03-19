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
            this.m2 = new Matrix(new Float32Array([3, 5, 7, 9, 3, 5, 7, 9, 3, 5, 7, 9, 3, 5, 7, 9]));
        }
        MatrixTest.prototype.eqaulTest = function () {
        };
        return MatrixTest;
    })(TestClass);
    jThreeTest.MatrixTest = MatrixTest;
})(jThreeTest || (jThreeTest = {}));
//# sourceMappingURL=MatrixTest.js.map