module jThree.Mathematics.Vector {
    import jThreeMath=jThree.Mathematics.jThreeMath;
    import jThreeException = jThree.Exceptions.jThreeException;

    export interface IVectorFactory<T extends VectorBase> {
        fromEnumerable(en: IEnumerable<number>): T;
        fromArray(arr: number[]): T;
    }

    export class VectorBase implements IEnumerable<number> {

        public elementCount(): number {
            return 0;
        }

        private magnitudeSquaredCache: number = -1;

        magnitudeSquared() {
            if (this.magnitudeSquaredCache < 0) {
                var sum: number = 0;
                Collection.foreach(this,(t) => {
                    sum += t * t;
                });
                this.magnitudeSquaredCache = sum;
            }
            return this.magnitudeSquaredCache;
        }

        private magnitudeCache: number = -1;

        magnitude() {
            if (this.magnitudeCache < 0) {
                this.magnitudeCache = Math.sqrt(this.magnitudeSquared());
            }
            return this.magnitudeCache;
        }

        protected static elementDot(a: VectorBase, b: VectorBase): number {
            var dot: number = 0;
            Collection.foreachPair(a, b,(a, b) => {
                dot += a * b;
            });
            return dot;
        }

        getEnumrator(): IEnumrator<number> { throw new Error("Not implemented"); }
    }

    class VectorEnumeratorBase<T extends VectorBase> implements IEnumrator<number>
    {
        private elementCount: number = 0;

        constructor(vec: T) {
            this.vector = vec;
            this.elementCount = vec.elementCount();
        }

        protected currentIndex: number = -1;

        protected vector: T;

        getCurrent(): number { throw new Error("Not implemented"); }

        next(): boolean {
            this.currentIndex++;
            return jThreeMath.range(this.currentIndex, 0, this.elementCount);
        }
    }

    class Vector2Enumerator extends VectorEnumeratorBase<Vector2>{

        constructor(vec: Vector2) {
            super(vec);
        }

        getCurrent(): number {
            switch (this.currentIndex) {
                case 0:
                    return this.vector.getX();
                case 1:
                    return this.vector.getY();
                default:
                    throw new Exceptions.IrregularElementAccessException(this.currentIndex);
            }
        }

    }

    class Vector3Enumerator extends VectorEnumeratorBase<Vector3>{

        constructor(vec: Vector3) {
            super(vec);
        }

        getCurrent(): number {
            switch (this.currentIndex) {
                case 0:
                    return this.vector.getX();
                case 1:
                    return this.vector.getY();
                case 2:
                    return this.vector.getZ();
                default:
                    throw new Exceptions.IrregularElementAccessException(this.currentIndex);            }
        }
    }

    class Vector4Enumerator extends VectorEnumeratorBase<Vector4> {
        constructor(vec: Vector4) {
            super(vec);
        }


        getCurrent(): number {
            switch (this.currentIndex) {
                case 0:
                    return this.vector.getX();
                case 1:
                    return this.vector.getY();
                case 2:
                    return this.vector.getZ();
                case 3:
                    return this.vector.getW();
                default:
                    throw new Exceptions.IrregularElementAccessException(this.currentIndex);            }
        }
    }

    export class Vector2 extends VectorBase {
        constructor(x: number, y: number) {
            super();
            this.x = x;
            this.y = y;
        }

        private x: number;
        private y: number;

        getX(): number {
            return this.x;
        }

        getY(): number {
            return this.y;
        }

        static dot(v1: Vector2, v2: Vector2): number {
            return VectorBase.elementDot(v1, v2);
        }

        toString(): string {
            return "Vector2(x={0},y={1})".format(this.x, this.y);
        }

        getEnumrator(): IEnumrator<number> {
            return new Vector2Enumerator(this);
        }

        elementCount(): number { return 2; }
    }

    export class Vector3 extends VectorBase {
        constructor(x: number, z: number, y: number) {
            super();
            this.x = x;
            this.z = z;
            this.y = y;
        }

        private x: number;
        private y: number;
        private z: number;

        getX(): number {
            return this.x;
        }

        getY(): number {
            return this.y;
        }

        getZ(): number {
            return this.z;
        }

        static dot(v1: Vector3, v2: Vector3): number {
            return VectorBase.elementDot(v1, v2);
        }

        toString(): string {
            return "Vector3(x={0},y={1},z={2})".format(this.x, this.y, this.z);
        }

        getEnumrator(): IEnumrator<number> {
            return new Vector3Enumerator(this);
        }

        elementCount(): number { return 3; }
    }

    export class Vector4 extends VectorBase {
        constructor(x: number, y: number, z: number, w: number) {
            super();
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }

        private x: number;
        private y: number;
        private z: number;
        private w: number;

        getX() {
            return this.x;
        }

        getY() {
            return this.y;
        }

        getZ() {
            return this.z;
        }

        getW() {
            return this.w;
        }

        static dot(v1: Vector4, v2: Vector4) {
            return this.elementDot(v1, v2);
        }

        getEnumrator(): IEnumrator<number> { return new Vector4Enumerator(this); }

        elementCount(): number { return 4; }

        toString(): string {
            return "Vector4(x={0},y={1},z={2},w={3}".format(this.x, this.y, this.z, this.w);
        }
    }
}