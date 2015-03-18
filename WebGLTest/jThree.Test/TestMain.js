var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../_references.ts"/>
///<reference path="_testReferences.ts"/>
///<reference path="../tsUnit/tsUnit.ts"/>
var jThreeTest;
(function (jThreeTest) {
    var TestMain = (function (_super) {
        __extends(TestMain, _super);
        function TestMain() {
            _super.call(this);
        }
        TestMain.prototype.test1 = function () {
            this.areIdentical(10, 10);
        };
        TestMain.prototype.test2 = function () {
            this.areIdentical(10, 11);
        };
        return TestMain;
    })(tsUnit.TestClass);
    jThreeTest.TestMain = TestMain;
})(jThreeTest || (jThreeTest = {}));
window.onload = function (e) {
    var test = new tsUnit.Test();
    test.addTestClass(new jThreeTest.Collection.CollectionTest(), "CollectionTest");
    test.showResults(document.getElementById("test-display"), test.run());
};
//# sourceMappingURL=TestMain.js.map