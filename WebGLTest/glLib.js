var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="jThree/references.ts"/>
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
//# sourceMappingURL=glLib.js.map