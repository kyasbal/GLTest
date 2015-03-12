var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
var JThree;
(function (JThree) {
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
    JThree.Collection = Collection;
    var JThreeError = (function () {
        function JThreeError(name, message) {
            this.message = message;
            this.name = name;
        }
        JThreeError.prototype.toString = function () {
            return "{0}:\nName:{1}\nMessage{2}".format(JsHack.getObjectName(this), this.name, this.message);
        };
        return JThreeError;
    })();
    JThree.JThreeError = JThreeError;
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
    var JThreeObject = (function () {
        function JThreeObject() {
        }
        JThreeObject.prototype.toString = function () {
            return JsHack.getObjectName(this);
        };
        return JThreeObject;
    })();
    JThree.JThreeObject = JThreeObject;
    var DegreeMilliSecoundUnitConverter = (function (_super) {
        __extends(DegreeMilliSecoundUnitConverter, _super);
        function DegreeMilliSecoundUnitConverter() {
            _super.apply(this, arguments);
        }
        DegreeMilliSecoundUnitConverter.prototype.toRadian = function (val) {
            return JThreeMath.PI / 180 * val;
        };
        DegreeMilliSecoundUnitConverter.prototype.fromRadian = function (radian) {
            return 180 / JThreeMath.PI * radian;
        };
        DegreeMilliSecoundUnitConverter.prototype.toMilliSecound = function (val) {
            return val * 1000;
        };
        DegreeMilliSecoundUnitConverter.prototype.fromMilliSecound = function (milliSecound) {
            return milliSecound / 1000;
        };
        return DegreeMilliSecoundUnitConverter;
    })(JThreeObject);
    JThree.DegreeMilliSecoundUnitConverter = DegreeMilliSecoundUnitConverter;
    var JThreeMath = (function (_super) {
        __extends(JThreeMath, _super);
        function JThreeMath(unitConverter) {
            _super.call(this);
            this.converter = unitConverter || new DegreeMilliSecoundUnitConverter();
        }
        JThreeMath.prototype.radianResult = function (f) {
            return this.converter.fromRadian(f());
        };
        JThreeMath.prototype.radianRequest = function (v, f) {
            return f(this.converter.toRadian(v));
        };
        JThreeMath.prototype.getCurrentConverter = function () {
            return this.converter;
        };
        /**
         * 正弦
         */
        JThreeMath.prototype.sin = function (val) {
            return this.radianRequest(val, function (val) {
                return Math.sin(val);
            });
        };
        /**
         * 余弦
         */
        JThreeMath.prototype.cos = function (val) {
            return this.radianRequest(val, function (val) {
                return Math.cos(val);
            });
        };
        /**
         * 正接
         */
        JThreeMath.prototype.tan = function (val) {
            return this.radianRequest(val, function (val) {
                return Math.tan(val);
            });
        };
        JThreeMath.prototype.asin = function (val) {
            return this.radianResult(function () {
                return Math.asin(val);
            });
        };
        JThreeMath.prototype.acos = function (val) {
            return this.radianResult(function () {
                return Math.acos(val);
            });
        };
        JThreeMath.prototype.atan = function (val) {
            return this.radianResult(function () {
                return Math.atan(val);
            });
        };
        JThreeMath.range = function (val, lower, higher) {
            if (val >= lower && val < higher) {
                return true;
            }
            else {
                return false;
            }
        };
        JThreeMath.PI = Math.PI;
        JThreeMath.E = Math.E;
        return JThreeMath;
    })(JThreeObject);
    JThree.JThreeMath = JThreeMath;
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
                Collection.foreach(this, function (t) {
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
            Collection.foreachPair(a, b, function (a, b) {
                dot += a * b;
            });
            return dot;
        };
        VectorBase.prototype.getEnumrator = function () {
            throw new Error("Not implemented");
        };
        return VectorBase;
    })();
    JThree.VectorBase = VectorBase;
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
            return JThreeMath.range(this.currentIndex, 0, this.elementCount);
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
                    throw new JThreeError("", "");
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
                    throw new JThreeError("", "");
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
                    throw new JThreeError("", "");
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
    JThree.Vector2 = Vector2;
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
    JThree.Vector3 = Vector3;
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
    JThree.Vector4 = Vector4;
    var JThreeContext = (function (_super) {
        __extends(JThreeContext, _super);
        function JThreeContext() {
            _super.apply(this, arguments);
        }
        return JThreeContext;
    })(JThreeObject);
    JThree.JThreeContext = JThreeContext;
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
    })(JThreeObject);
    JThree.CanvasRenderer = CanvasRenderer;
})(JThree || (JThree = {}));
window.onload = function (e) {
};
//# sourceMappingURL=glLib.js.map