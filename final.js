var jThree;
(function (jThree) {
    var Base;
    (function (Base) {
        var JsHack = (function () {
            function JsHack() {
            }
            JsHack.getObjectName = function (obj) {
                var funcNameRegex = /function (.{1,})\(/;
                var result = (funcNameRegex).exec((obj).constructor.toString());
                return (result && result.length > 1) ? result[1] : "";
            };
            return JsHack;
        })();
        /**
         *This class indicate the class extends this class is added by jThree.
         */
        var jThreeObject = (function () {
            function jThreeObject() {
            }
            jThreeObject.prototype.toString = function () {
                return JsHack.getObjectName(this);
            };
            return jThreeObject;
        })();
        Base.jThreeObject = jThreeObject;
    })(Base = jThree.Base || (jThree.Base = {}));
})(jThree || (jThree = {}));
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
        var jThreeObject = jThree.Base.jThreeObject;
        var DegreeMilliSecoundUnitConverter = (function (_super) {
            __extends(DegreeMilliSecoundUnitConverter, _super);
            function DegreeMilliSecoundUnitConverter() {
                _super.apply(this, arguments);
            }
            DegreeMilliSecoundUnitConverter.prototype.toRadian = function (val) {
                return jThreeMath.PI / 180 * val;
            };
            DegreeMilliSecoundUnitConverter.prototype.fromRadian = function (radian) {
                return 180 / jThreeMath.PI * radian;
            };
            DegreeMilliSecoundUnitConverter.prototype.toMilliSecound = function (val) {
                return val * 1000;
            };
            DegreeMilliSecoundUnitConverter.prototype.fromMilliSecound = function (milliSecound) {
                return milliSecound / 1000;
            };
            return DegreeMilliSecoundUnitConverter;
        })(jThreeObject);
        Mathematics.DegreeMilliSecoundUnitConverter = DegreeMilliSecoundUnitConverter;
        var jThreeMath = (function (_super) {
            __extends(jThreeMath, _super);
            function jThreeMath(unitConverter) {
                _super.call(this);
                this.converter = unitConverter || new DegreeMilliSecoundUnitConverter();
            }
            jThreeMath.prototype.radianResult = function (f) {
                return this.converter.fromRadian(f());
            };
            jThreeMath.prototype.radianRequest = function (v, f) {
                return f(this.converter.toRadian(v));
            };
            jThreeMath.prototype.getCurrentConverter = function () {
                return this.converter;
            };
            /**
             * 正弦
             */
            jThreeMath.prototype.sin = function (val) {
                return this.radianRequest(val, function (val) {
                    return Math.sin(val);
                });
            };
            /**
             * 余弦
             */
            jThreeMath.prototype.cos = function (val) {
                return this.radianRequest(val, function (val) {
                    return Math.cos(val);
                });
            };
            /**
             * 正接
             */
            jThreeMath.prototype.tan = function (val) {
                return this.radianRequest(val, function (val) {
                    return Math.tan(val);
                });
            };
            jThreeMath.prototype.asin = function (val) {
                return this.radianResult(function () {
                    return Math.asin(val);
                });
            };
            jThreeMath.prototype.acos = function (val) {
                return this.radianResult(function () {
                    return Math.acos(val);
                });
            };
            jThreeMath.prototype.atan = function (val) {
                return this.radianResult(function () {
                    return Math.atan(val);
                });
            };
            jThreeMath.range = function (val, lower, higher) {
                if (val >= lower && val < higher) {
                    return true;
                }
                else {
                    return false;
                }
            };
            jThreeMath.PI = Math.PI;
            jThreeMath.E = Math.E;
            return jThreeMath;
        })(jThreeObject);
        Mathematics.jThreeMath = jThreeMath;
    })(Mathematics = jThree.Mathematics || (jThree.Mathematics = {}));
})(jThree || (jThree = {}));
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
                VectorBase.elementAdd = function (a, b, factory) {
                    var result;
                    jThree.Collection.foreachPair(a, b, function (a, b) {
                        result.push(a + b);
                    });
                    return factory.fromArray(result);
                };
                VectorBase.elementSubtract = function (a, b, factory) {
                    var result;
                    jThree.Collection.foreachPair(a, b, function (a, b) {
                        result.push(a - b);
                    });
                    return factory.fromArray(result);
                };
                VectorBase.elementScholarMultiply = function (a, s, factory) {
                    var result;
                    jThree.Collection.foreach(a, function (a) {
                        result.push(a * s);
                    });
                    return factory.fromArray(result);
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
            var Vector2Factory = (function () {
                function Vector2Factory() {
                }
                Vector2Factory.getInstance = function () {
                    this.instance = this.instance || new Vector2Factory();
                    return this.instance;
                };
                Vector2Factory.prototype.fromArray = function (array) {
                    return new Vector2(array[0], array[1]);
                };
                return Vector2Factory;
            })();
            var Vector3Factory = (function () {
                function Vector3Factory() {
                }
                Vector3Factory.getInstance = function () {
                    this.instance = this.instance || new Vector3Factory();
                    return this.instance;
                };
                Vector3Factory.prototype.fromArray = function (array) {
                    return new Vector3(array[0], array[1], array[2]);
                };
                return Vector3Factory;
            })();
            var Vector4Factory = (function () {
                function Vector4Factory() {
                }
                Vector4Factory.getInstance = function () {
                    this.instance = this.instance || new Vector4Factory();
                    return this.instance;
                };
                Vector4Factory.prototype.fromArray = function (array) {
                    return new Vector4(array[0], array[1], array[2], array[3]);
                };
                return Vector4Factory;
            })();
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
                Vector2.add = function (v1, v2) {
                    return VectorBase.elementAdd(v1, v2, v1.getFactory());
                };
                Vector2.subtract = function (v1, v2) {
                    return VectorBase.elementSubtract(v1, v2, v1.getFactory());
                };
                Vector2.multiply = function (s, v) {
                    return VectorBase.elementScholarMultiply(v, s, v.getFactory());
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
                Vector2.prototype.getFactory = function () {
                    return Vector2Factory.getInstance();
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
                Vector3.add = function (v1, v2) {
                    return VectorBase.elementAdd(v1, v2, v1.getFactory());
                };
                Vector3.subtract = function (v1, v2) {
                    return VectorBase.elementSubtract(v1, v2, v1.getFactory());
                };
                Vector3.multiply = function (s, v) {
                    return VectorBase.elementScholarMultiply(v, s, v.getFactory());
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
                Vector3.prototype.getFactory = function () {
                    return Vector3Factory.getInstance();
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
                Vector4.add = function (v1, v2) {
                    return VectorBase.elementAdd(v1, v2, v1.getFactory());
                };
                Vector4.subtract = function (v1, v2) {
                    return VectorBase.elementSubtract(v1, v2, v1.getFactory());
                };
                Vector4.multiply = function (s, v) {
                    return VectorBase.elementScholarMultiply(v, s, v.getFactory());
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
                Vector4.prototype.getFactory = function () {
                    return Vector4Factory.getInstance();
                };
                return Vector4;
            })(VectorBase);
            Vector.Vector4 = Vector4;
        })(Vector = Mathematics.Vector || (Mathematics.Vector = {}));
    })(Mathematics = jThree.Mathematics || (jThree.Mathematics = {}));
})(jThree || (jThree = {}));
var jThree;
(function (jThree) {
    var Exceptions;
    (function (Exceptions) {
        var jThreeObject = jThree.Base.jThreeObject;
        /**
         * This class is root class perform as exception arguments in jThree.
         */
        var jThreeException = (function (_super) {
            __extends(jThreeException, _super);
            function jThreeException(name, message) {
                _super.call(this);
                this.name = name;
                this.message = message;
            }
            jThreeException.prototype.toString = function () {
                return "Exception:{0}\nName:{1}\nMessage:{2}".format(_super.prototype.toString.call(this), this.name, this.message);
            };
            return jThreeException;
        })(jThreeObject);
        Exceptions.jThreeException = jThreeException;
        var IrregularElementAccessException = (function (_super) {
            __extends(IrregularElementAccessException, _super);
            function IrregularElementAccessException(accessIndex) {
                _super.call(this, "Irregular vector element was accessed.", "You attempted to access {0} element. But,this vector have enough dimension.".format(accessIndex));
            }
            return IrregularElementAccessException;
        })(jThreeException);
        Exceptions.IrregularElementAccessException = IrregularElementAccessException;
    })(Exceptions = jThree.Exceptions || (jThree.Exceptions = {}));
})(jThree || (jThree = {}));
///<reference path="jThree/Delegates.ts"/> 
///<reference path="glLib.ts"/>
///<reference path="jThree/Base.ts"/>
///<reference path="jThree/Math.ts"/>
///<reference path="jThree/Vector.ts"/>
///<reference path="jThree/Exceptions.ts"/>
///<reference path="_references.ts"/>
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, num) {
            if (typeof args[num] != 'undefined') {
                return args[num];
            }
            else {
                return match;
            }
        });
    };
}
var jThree;
(function (jThree) {
    var jThreeObject = jThree.Base.jThreeObject;
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
    jThree.Collection = Collection;
    var JThreeContext = (function (_super) {
        __extends(JThreeContext, _super);
        function JThreeContext() {
            _super.apply(this, arguments);
        }
        return JThreeContext;
    })(jThreeObject);
    jThree.JThreeContext = JThreeContext;
    var CanvasRenderer = (function (_super) {
        __extends(CanvasRenderer, _super);
        function CanvasRenderer(glContext) {
            _super.call(this);
            this.glContext = glContext;
        }
        CanvasRenderer.fromCanvas = function (canvas) {
            var gl;
            try {
                gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                return new CanvasRenderer(gl);
            }
            catch (e) {
                if (!gl) {
                }
            }
        };
        return CanvasRenderer;
    })(jThreeObject);
    jThree.CanvasRenderer = CanvasRenderer;
})(jThree || (jThree = {}));
window.onload = function (e) {
    alert("{0}".format(new jThree.Exceptions.jThreeException("TEST", "TEST MESSAGE")));
};
