///<reference path="../_references.ts"/>
module jThree.Matrix {
    import JThreeObject = jThree.Base.jThreeObject;

    export class Matrix extends JThreeObject {
        public static zero(): Matrix {
            return new Matrix(this.zeroElements());
        }

        public static identity(): Matrix {
            return new Matrix(this.identityElements());
        }

        private static zeroElements(): Float32Array {
            return new Float32Array(
                    [0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0]);
        }

        private static identityElements(): Float32Array {
            return new Float32Array(
                    [1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                    ]
                 );
        }

        private elements: Float32Array = Matrix.zeroElements();

        private isValidArray(arr: Float32Array): boolean {
            if (arr.length !== 16) return false;
            return true;
        }

        constructor(arr:Float32Array) {
            super();
            if (!this.isValidArray(arr))throw new jThree.Exceptions.InvalidArgumentException("Invalid matrix source was passed.");
            this.elements = new Float32Array(arr);
        }

        getAt(colmun: number, row: number): number {
            return this.elements[colmun + row * 4];
        }
        

    }
} 