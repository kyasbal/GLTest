var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../_references.ts"/>
///<reference path="../jThree/Collections.ts"/>
var jThreeTest;
(function (jThreeTest) {
    var Collection;
    (function (_Collection) {
        var Collection = jThree.Collections.Collection;
        var CollectionTest = (function (_super) {
            __extends(CollectionTest, _super);
            function CollectionTest() {
                _super.apply(this, arguments);
                this.testArray1 = [1, 2, 3, 4, 5];
                this.testArray2 = [6, 7, 8, 9, 10, 11, 23];
            }
            CollectionTest.prototype.foreachTest = function () {
                var result = 0;
                var enArray1 = new jThree.Collections.ArrayEnumratorFactory(this.testArray1);
                Collection.foreach(enArray1, function (t) {
                    result += t;
                });
                this.areIdentical(result, 15);
            };
            CollectionTest.prototype.foreachPairTest = function () {
                var result = 0;
                var enArray1 = new jThree.Collections.ArrayEnumratorFactory(this.testArray1);
                var enArray2 = new jThree.Collections.ArrayEnumratorFactory(this.testArray2);
                Collection.foreachPair(enArray1, enArray2, function (a, b) {
                    result += a * b;
                });
                this.areIdentical(result, 130);
            };
            return CollectionTest;
        })(tsUnit.TestClass);
        _Collection.CollectionTest = CollectionTest;
    })(Collection = jThreeTest.Collection || (jThreeTest.Collection = {}));
})(jThreeTest || (jThreeTest = {}));
//# sourceMappingURL=CollectionTest.js.map