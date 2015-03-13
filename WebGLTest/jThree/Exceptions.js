///<reference path="references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
//# sourceMappingURL=Exceptions.js.map