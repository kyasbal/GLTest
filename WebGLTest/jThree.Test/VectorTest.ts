 ///<reference path="_testReferences.ts"/>
///<reference path="../_references.ts"/>

module jThreeTest {
    import Vector2 = jThree.Mathematics.Vector.Vector2;
    import Vector3 = jThree.Mathematics.Vector.Vector3;

    export class VectorTest extends tsUnit.TestClass {
        testVec21: Vector2 = new Vector2(1, 2);
        testVec22: Vector2 = new Vector2(3, 4);

        testVec31: Vector3 = new Vector3(1, 2, 3);
        testVec32:Vector3=new Vector3(3,5,4);
        eqaulTest() {
            this.isTrue(Vector2.equal(this.testVec21, new Vector2(1, 2)));
            this.isTrue(Vector3.equal(this.testVec31, new Vector3(1, 2, 3)));
            this.isFalse(Vector2.equal(this.testVec21, new Vector2(1, 3)));
            this.isFalse(Vector3.equal(this.testVec31, new Vector3(1, 4, 3)));
        }
    }
}