///<reference path="../_references.ts"/>
var jThree;
(function (jThree) {
    var Collections;
    (function (Collections) {
        var Collection = (function () {
            function Collection() {
            }
            Collection.foreach = function (collection, act) {
                var enumerator = collection.getEnumrator();
                while (enumerator.next()) {
                    act(enumerator.getCurrent());
                }
            };
            Collection.foreachPair = function (col1, col2, act) {
                var en1 = col1.getEnumrator();
                var en2 = col2.getEnumrator();
                while (en1.next() && en2.next()) {
                    act(en1.getCurrent(), en2.getCurrent());
                }
            };
            return Collection;
        })();
        Collections.Collection = Collection;
    })(Collections = jThree.Collections || (jThree.Collections = {}));
})(jThree || (jThree = {}));
//# sourceMappingURL=Collections.js.map