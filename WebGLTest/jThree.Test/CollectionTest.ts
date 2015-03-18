///<reference path="../_references.ts"/>
///<reference path="../jThree/Collections.ts"/>
module jThreeTest.Collection {
    import Collection = jThree.Collections.Collection;
    import Enumrator = jThree.Collections.IEnumrator;

    export class CollectionTest extends tsUnit.TestClass {
        testArray1: number[] = [1, 2, 3, 4, 5];
        testArray2: number[]=[6, 7, 8, 9, 10];

        foreachTest() {
            var result: number = 0;
            var enArray1: jThree.Collections.IEnumerable<number> = new jThree.Collections.ArrayEnumratorFactory(this.testArray1);
            Collection.foreach(enArray1, (t) => { result += t });
            this.areIdentical(result, 15);
        }

        foreachPairTest() {
            var result: number = 0;
            var enArray1: jThree.Collections.IEnumerable<number> = new jThree.Collections.ArrayEnumratorFactory(this.testArray1);
            var enArray2: jThree.Collections.IEnumerable<number> = new jThree.Collections.ArrayEnumratorFactory(this.testArray2);
            Collection.foreachPair(enArray1,enArray2,(a,b) => { result += a*b});
            this.areIdentical(result, 130);
        }
    }
}