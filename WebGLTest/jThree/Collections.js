///<reference path="../_references.ts"/>
var jThree;
(function (jThree) {
    var Collections;
    (function (Collections) {
        /**
         * The class for wrap basic javascript arrays as collection type implementing IEnumerator.
         */
        var ArrayEnumratorFactory = (function () {
            function ArrayEnumratorFactory(targetArray) {
                this.targetArray = targetArray;
            }
            ArrayEnumratorFactory.prototype.getEnumrator = function () {
                return new ArrayEnumerable(this.targetArray);
            };
            return ArrayEnumratorFactory;
        })();
        Collections.ArrayEnumratorFactory = ArrayEnumratorFactory;
        var ArrayEnumerable = (function () {
            function ArrayEnumerable(targetArrary) {
                this.currentIndex = -1;
                this.targetArrary = targetArrary;
            }
            ArrayEnumerable.prototype.getCurrent = function () {
                if (this.targetArrary.length > this.currentIndex && this.currentIndex >= 0) {
                    return this.targetArrary[this.currentIndex];
                }
            };
            ArrayEnumerable.prototype.next = function () {
                this.currentIndex++;
                if (this.currentIndex >= this.targetArrary.length)
                    return false;
                return true;
            };
            return ArrayEnumerable;
        })();
        /**
         * Containing some of methods use for IEnumerable generic interfaces.
         */
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