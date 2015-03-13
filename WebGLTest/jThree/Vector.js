var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var jThree;
(function (jThree) {
    var Mathematics;
    (function (Mathematics) {
        var Vector;
        (function (Vector) {
            var jThreeMath = jThree.Mathematics.jThreeMath;
            var VectorBase = (function () {
                function VectorBase() {
                    this.magnitudeSquaredCache = -1;
                    this.magnitudeCache = -1;
                }
                VectorBase.prototype.elementCount = function () {
                    return 0;
                };
                VectorBase.prototype.magnitudeSquared = function () {
                    if (this.magnitudeSquaredCache < 0) {
                        var sum = 0;
                        jThree.Collection.foreach(this, function (t) {
                            sum += t * t;
                        });
                        this.magnitudeSquaredCache = sum;
                    }
                    return this.magnitudeSquaredCache;
                };
                VectorBase.prototype.magnitude = function () {
                    if (this.magnitudeCache < 0) {
                        this.magnitudeCache = Math.sqrt(this.magnitudeSquared());
                    }
                    return this.magnitudeCache;
                };
                VectorBase.elementDot = function (a, b) {
                    var dot = 0;
                    jThree.Collection.foreachPair(a, b, function (a, b) {
                        dot += a * b;
                    });
                    return dot;
                };
                VectorBase.prototype.getEnumrator = function () {
                    throw new Error("Not implemented");
                };
                return VectorBase;
            })();
            Vector.VectorBase = VectorBase;
            var VectorEnumeratorBase = (function () {
                function VectorEnumeratorBase(vec) {
                    this.elementCount = 0;
                    this.currentIndex = -1;
                    this.vector = vec;
                    this.elementCount = vec.elementCount();
                }
                VectorEnumeratorBase.prototype.getCurrent = function () {
                    throw new Error("Not implemented");
                };
                VectorEnumeratorBase.prototype.next = function () {
                    this.currentIndex++;
                    return jThreeMath.range(this.currentIndex, 0, this.elementCount);
                };
                return VectorEnumeratorBase;
            })();
            var Vector2Enumerator = (function (_super) {
                __extends(Vector2Enumerator, _super);
                function Vector2Enumerator(vec) {
                    _super.call(this, vec);
                }
                Vector2Enumerator.prototype.getCurrent = function () {
                    switch (this.currentIndex) {
                        case 0:
                            return this.vector.getX();
                        case 1:
                            return this.vector.getY();
                        default:
                            throw new jThree.Exceptions.IrregularElementAccessException(this.currentIndex);
                    }
                };
                return Vector2Enumerator;
            })(VectorEnumeratorBase);
            var Vector3Enumerator = (function (_super) {
                __extends(Vector3Enumerator, _super);
                function Vector3Enumerator(vec) {
                    _super.call(this, vec);
                }
                Vector3Enumerator.prototype.getCurrent = function () {
                    switch (this.currentIndex) {
                        case 0:
                            return this.vector.getX();
                        case 1:
                            return this.vector.getY();
                        case 2:
                            return this.vector.getZ();
                        default:
                            throw new jThree.Exceptions.IrregularElementAccessException(this.currentIndex);
                    }
                };
                return Vector3Enumerator;
            })(VectorEnumeratorBase);
            var Vector4Enumerator = (function (_super) {
                __extends(Vector4Enumerator, _super);
                function Vector4Enumerator(vec) {
                    _super.call(this, vec);
                }
                Vector4Enumerator.prototype.getCurrent = function () {
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
                            throw new jThree.Exceptions.IrregularElementAccessException(this.currentIndex);
                    }
                };
                return Vector4Enumerator;
            })(VectorEnumeratorBase);
            var Vector2 = (function (_super) {
                __extends(Vector2, _super);
                function Vector2(x, y) {
                    _super.call(this);
                    this.x = x;
                    this.y = y;
                }
                Vector2.prototype.getX = function () {
                    return this.x;
                };
                Vector2.prototype.getY = function () {
                    return this.y;
                };
                Vector2.dot = function (v1, v2) {
                    return VectorBase.elementDot(v1, v2);
                };
                Vector2.prototype.toString = function () {
                    return "Vector2(x={0},y={1})".format(this.x, this.y);
                };
                Vector2.prototype.getEnumrator = function () {
                    return new Vector2Enumerator(this);
                };
                Vector2.prototype.elementCount = function () {
                    return 2;
                };
                return Vector2;
            })(VectorBase);
            Vector.Vector2 = Vector2;
            var Vector3 = (function (_super) {
                __extends(Vector3, _super);
                function Vector3(x, z, y) {
                    _super.call(this);
                    this.x = x;
                    this.z = z;
                    this.y = y;
                }
                Vector3.prototype.getX = function () {
                    return this.x;
                };
                Vector3.prototype.getY = function () {
                    return this.y;
                };
                Vector3.prototype.getZ = function () {
                    return this.z;
                };
                Vector3.dot = function (v1, v2) {
                    return VectorBase.elementDot(v1, v2);
                };
                Vector3.prototype.toString = function () {
                    return "Vector3(x={0},y={1},z={2})".format(this.x, this.y, this.z);
                };
                Vector3.prototype.getEnumrator = function () {
                    return new Vector3Enumerator(this);
                };
                Vector3.prototype.elementCount = function () {
                    return 3;
                };
                return Vector3;
            })(VectorBase);
            Vector.Vector3 = Vector3;
            var Vector4 = (function (_super) {
                __extends(Vector4, _super);
                function Vector4(x, y, z, w) {
                    _super.call(this);
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this.w = w;
                }
                Vector4.prototype.getX = function () {
                    return this.x;
                };
                Vector4.prototype.getY = function () {
                    return this.y;
                };
                Vector4.prototype.getZ = function () {
                    return this.z;
                };
                Vector4.prototype.getW = function () {
                    return this.w;
                };
                Vector4.dot = function (v1, v2) {
                    return this.elementDot(v1, v2);
                };
                Vector4.prototype.getEnumrator = function () {
                    return new Vector4Enumerator(this);
                };
                Vector4.prototype.elementCount = function () {
                    return 4;
                };
                Vector4.prototype.toString = function () {
                    return "Vector4(x={0},y={1},z={2},w={3}".format(this.x, this.y, this.z, this.w);
                };
                return Vector4;
            })(VectorBase);
            Vector.Vector4 = Vector4;
        })(Vector = Mathematics.Vector || (Mathematics.Vector = {}));
    })(Mathematics = jThree.Mathematics || (jThree.Mathematics = {}));
})(jThree || (jThree = {}));
//# sourceMappingURL=Vector.js.map