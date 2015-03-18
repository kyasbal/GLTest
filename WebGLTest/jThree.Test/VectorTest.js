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
    var VectorTest = (function (_super) {
        __extends(VectorTest, _super);
        function VectorTest() {
            _super.apply(this, arguments);
            this.testVec21 = new Vector2(1, 2);
            this.testVec22 = new Vector2(3, 4);
            this.testVec31 = new Vector3(1, 2, 3);
            this.testVec32 = new Vector3(3, 5, 4);
        }
        VectorTest.prototype.eqaulTest = function () {
            this.isTrue(Vector2.equal(this.testVec21, new Vector2(1, 2)));
            this.isTrue(Vector3.equal(this.testVec31, new Vector3(1, 2, 3)));
            this.isFalse(Vector2.equal(this.testVec21, new Vector2(1, 3)));
            this.isFalse(Vector3.equal(this.testVec31, new Vector3(1, 4, 3)));
        };
        return VectorTest;
    })(tsUnit.TestClass);
    jThreeTest.VectorTest = VectorTest;
})(jThreeTest || (jThreeTest = {}));
//# sourceMappingURL=VectorTest.js.map