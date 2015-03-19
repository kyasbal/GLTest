 ///<reference path="_testReferences.ts"/>
///<reference path="../_references.ts"/>

module jThreeTest {
    import Vector2 = jThree.Mathematics.Vector.Vector2;
    import Vector3 = jThree.Mathematics.Vector.Vector3;
    import Vector4 = jThree.Mathematics.Vector.Vector4;

    export class VectorTest extends tsUnit.TestClass {
        testVec21: Vector2 = new Vector2(1, 2);
        testVec22: Vector2 = new Vector2(3, 4);

        testVec31: Vector3 = new Vector3(1, 2, 3);
        testVec32: Vector3 = new Vector3(3, 5, 4);

        testVec41:Vector4=new Vector4(1,2,3,4);
        testVec42: Vector4 = new Vector4(2, 3, 5, 7);

        eqaulTest() {
            this.isTrue(Vector2.equal(this.testVec21, new Vector2(1, 2)));
            this.isTrue(Vector3.equal(this.testVec31, new Vector3(1, 2, 3)));
            this.isFalse(Vector2.equal(this.testVec21, new Vector2(1, 3)));
            this.isFalse(Vector3.equal(this.testVec31, new Vector3(1, 4, 3)));
            this.isTrue(Vector4.equal(this.testVec41, new Vector4(1, 2, 3, 4)));
            this.isFalse(Vector4.equal(this.testVec41, new Vector4(1, 2, 3, 5)));
        }

        sumTest() {
            this.isTrue(Vector2.equal(Vector2.add(this.testVec21, this.testVec22), new Vector2(4, 6)),"vector 2 add failed");
            this.isTrue(Vector3.equal(Vector3.add(this.testVec31, this.testVec32), new Vector3(4, 7, 7)),"vector 3 add failed");
            this.isTrue(Vector4.equal(Vector4.add(this.testVec41, this.testVec42), new Vector4(3,5,8,11)),"vector 4 add failed");
        }

        subtractTest() {
            this.isTrue(Vector2.equal(Vector2.subtract(this.testVec21, this.testVec22), new Vector2(-2,-2)),"vector2 subtract failed");
            this.isTrue(Vector3.equal(Vector3.subtract(this.testVec31, this.testVec32), new Vector3(-2, -3, -1)),"vector3 subtract failed");
            this.isTrue(Vector4.equal(Vector4.subtract(this.testVec41, this.testVec42), new Vector4(-1, -1, -2, -3)),"vector4 subtract failed");
        }

        dotTest() {
            this.areIdentical(Vector2.dot(this.testVec21, this.testVec22), 11);
            this.areIdentical(Vector3.dot(this.testVec31, this.testVec32), 25);
            this.areIdentical(Vector4.dot(this.testVec41, this.testVec42), 51);
        }

        multiplyScolarTest() {
            this.isTrue(Vector2.equal(Vector2.multiply(2, this.testVec21), new Vector2(2, 4)));
            this.isTrue(Vector3.equal(Vector3.multiply(2, this.testVec31), new Vector3(2, 4, 6)));
            this.isTrue(Vector4.equal(Vector4.multiply(2, this.testVec41), new Vector4(2, 4, 6, 8)));
        }

        magnitudeTest() {
            this.areIdentical(Math.sqrt(5), this.testVec21.magnitude);
            this.areIdentical(Math.sqrt(14), this.testVec31.magnitude);
            this.areIdentical(Math.sqrt(30), this.testVec41.magnitude);
            this.areIdentical(Math.sqrt(5), this.testVec21.magnitude);
            this.areIdentical(Math.sqrt(14), this.testVec31.magnitude);
            this.areIdentical(Math.sqrt(30), this.testVec41.magnitude);
        }

        magnitudeSquaredTest() {
            this.areIdentical(5, this.testVec21.magnitudeSquared);
            this.areIdentical(14, this.testVec31.magnitudeSquared);
            this.areIdentical(30, this.testVec41.magnitudeSquared);
            this.areIdentical(5, this.testVec21.magnitudeSquared);
            this.areIdentical(14, this.testVec31.magnitudeSquared);
            this.areIdentical(30, this.testVec41.magnitudeSquared);
        }

        invertTest() {
            this.isTrue(Vector2.equal(Vector2.invert(this.testVec21), new Vector2(-1, -2)));
            this.isTrue(Vector3.equal(Vector3.invert(this.testVec31), new Vector3(-1, -2, -3)));
            this.isTrue(Vector4.equal(Vector4.invert(this.testVec41), new Vector4(-1,-2,-3,-4)));
        }
    }
}