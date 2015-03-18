///<reference path="_testReferences.ts"/>
///<reference path="../_references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var jThreeTest;
(function (jThreeTest) {
    var Vector2 = jThree.Mathematics.Vector.Vector2;
    var Vector3 = jThree.Mathematics.Vector.Vector3;
    var Vector4 = jThree.Mathematics.Vector.Vector4;
    var VectorTest = (function (_super) {
        __extends(VectorTest, _super);
        function VectorTest() {
            _super.apply(this, arguments);
            this.testVec21 = new Vector2(1, 2);
            this.testVec22 = new Vector2(3, 4);
            this.testVec31 = new Vector3(1, 2, 3);
            this.testVec32 = new Vector3(3, 5, 4);
            this.testVec41 = new Vector4(1, 2, 3, 4);
            this.testVec42 = new Vector4(2, 3, 5, 7);
        }
        VectorTest.prototype.eqaulTest = function () {
            this.isTrue(Vector2.equal(this.testVec21, new Vector2(1, 2)));
            this.isTrue(Vector3.equal(this.testVec31, new Vector3(1, 2, 3)));
            this.isFalse(Vector2.equal(this.testVec21, new Vector2(1, 3)));
            this.isFalse(Vector3.equal(this.testVec31, new Vector3(1, 4, 3)));
            this.isTrue(Vector4.equal(this.testVec41, new Vector4(1, 2, 3, 4)));
            this.isFalse(Vector4.equal(this.testVec41, new Vector4(1, 2, 3, 5)));
        };
        VectorTest.prototype.sumTest = function () {
            this.isTrue(Vector2.equal(Vector2.add(this.testVec21, this.testVec22), new Vector2(4, 6)), "vector 2 add failed");
            this.isTrue(Vector3.equal(Vector3.add(this.testVec31, this.testVec32), new Vector3(4, 7, 7)), "vector 3 add failed");
            this.isTrue(Vector4.equal(Vector4.add(this.testVec41, this.testVec42), new Vector4(3, 5, 8, 11)), "vector 4 add failed");
        };
        VectorTest.prototype.subtractTest = function () {
            this.isTrue(Vector2.equal(Vector2.subtract(this.testVec21, this.testVec22), new Vector2(-2, -2)), "vector2 subtract failed");
            this.isTrue(Vector3.equal(Vector3.subtract(this.testVec31, this.testVec32), new Vector3(-2, -3, -1)), "vector3 subtract failed");
            this.isTrue(Vector4.equal(Vector4.subtract(this.testVec41, this.testVec42), new Vector4(-1, -1, -2, -3)), "vector4 subtract failed");
        };
        VectorTest.prototype.dotTest = function () {
            this.areIdentical(Vector2.dot(this.testVec21, this.testVec22), 11);
            this.areIdentical(Vector3.dot(this.testVec31, this.testVec32), 25);
            this.areIdentical(Vector4.dot(this.testVec41, this.testVec42), 51);
        };
        VectorTest.prototype.multiplyScolarTest = function () {
            this.isTrue(Vector2.equal(Vector2.multiply(2, this.testVec21), new Vector2(2, 4)));
            this.isTrue(Vector3.equal(Vector3.multiply(2, this.testVec31), new Vector3(2, 4, 6)));
            this.isTrue(Vector4.equal(Vector4.multiply(2, this.testVec41), new Vector4(2, 4, 6, 8)));
        };
        VectorTest.prototype.magnitudeTest = function () {
            this.areIdentical(Math.sqrt(5), this.testVec21.magnitude());
            this.areIdentical(Math.sqrt(14), this.testVec31.magnitude());
            this.areIdentical(Math.sqrt(30), this.testVec41.magnitude());
            this.areIdentical(Math.sqrt(5), this.testVec21.magnitude());
            this.areIdentical(Math.sqrt(14), this.testVec31.magnitude());
            this.areIdentical(Math.sqrt(30), this.testVec41.magnitude());
        };
        VectorTest.prototype.magnitudeSquaredTest = function () {
            this.areIdentical(5, this.testVec21.magnitudeSquared());
            this.areIdentical(14, this.testVec31.magnitudeSquared());
            this.areIdentical(30, this.testVec41.magnitudeSquared());
            this.areIdentical(5, this.testVec21.magnitudeSquared());
            this.areIdentical(14, this.testVec31.magnitudeSquared());
            this.areIdentical(30, this.testVec41.magnitudeSquared());
        };
        VectorTest.prototype.invertTest = function () {
            this.isTrue(Vector2.equal(Vector2.invert(this.testVec21), new Vector2(-1, -2)));
            this.isTrue(Vector3.equal(Vector3.invert(this.testVec31), new Vector3(-1, -2, -3)));
            this.isTrue(Vector4.equal(Vector4.invert(this.testVec41), new Vector4(-1, -2, -3, -4)));
        };
        return VectorTest;
    })(tsUnit.TestClass);
    jThreeTest.VectorTest = VectorTest;
})(jThreeTest || (jThreeTest = {}));
//# sourceMappingURL=VectorTest.js.map