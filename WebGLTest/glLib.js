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
        JThreeMath.PI = Math.PI;

        JThreeMath.E = Math.E;
        return JThreeMath;
    })(JThreeObject);
    JThree.JThreeMath = JThreeMath;

    var Vector2 = (function (_super) {
        __extends(Vector2, _super);
        function Vector2() {
            _super.apply(this, arguments);
        }
        Vector2.prototype.toString = function () {
            return "Vector2(x={0},y={1})".format(this.x, this.y);
        };
        return Vector2;
    })(JThreeObject);
    JThree.Vector2 = Vector2;
})(JThree || (JThree = {}));

window.onload = function (e) {
    var converter = new JThree.DegreeMilliSecoundUnitConverter();
    var m = new JThree.JThreeMath(converter);
    alert("Test{0},{1}".format(100, "Hello World"));
};
//# sourceMappingURL=glLib.js.map
