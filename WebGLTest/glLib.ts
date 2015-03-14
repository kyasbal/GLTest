///<reference path="_references.ts"/>
interface String {
    format(...replacements: any[]): string;
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, num) {
            if (typeof args[num] != 'undefined') {
                return args[num];
            } else {
                return match;
            }
        });
    };
}

module jThree
{
    import Action1 = jThree.Delegates.Action1;
    import Action2 = jThree.Delegates.Action2;
    import Func0 = jThree.Delegates.Func0;
    import Func1 = jThree.Delegates.Func1;
    import JThreeException = jThree.Exceptions.jThreeException;
    import jThreeObject = jThree.Base.jThreeObject;
    import JThreeMath = jThree.Mathematics.jThreeMath;
    import VectorBase = jThree.Mathematics.Vector.VectorBase;

    export class Collection {
        public static foreach<T>(collection:IEnumerable<T>,act:Action1<T>): void {
            var enumerator:IEnumrator<T> = collection.getEnumrator();
            while (enumerator.next()) {
                act(enumerator.getCurrent());
            }
        }

        public static foreachPair<T>(col1: IEnumerable<T>, col2: IEnumerable<T>, act: Action2<T, T>) {
            var en1: IEnumrator<T> = col1.getEnumrator();
            var en2: IEnumrator<T> = col2.getEnumrator();
            while (en1.next()&&en2.next()) {
                act(en1.getCurrent(), en2.getCurrent());
            }
        }
    }
    export interface IVectorFactory<T extends VectorBase> {
        fromEnumerable(en: IEnumerable<number>): T;
        fromArray(arr:number[]):T;
    }


    export interface IEnumrator<T>
    {
        getCurrent(): T;
        next():boolean;
    }

    export interface IEnumerable<T> {
        getEnumrator():IEnumrator<T>;
    }

    export class JThreeContext extends jThreeObject
    {
        
    }

    export class CanvasRenderer extends jThreeObject
    {
        public static fromCanvas(canvas:HTMLCanvasElement): CanvasRenderer {
            var gl: WebGLRenderingContext;
            try {
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                return new CanvasRenderer(gl);
            } catch(e){
                if (!gl) {
                    //Processing for this error
                }
            }
        }

        private glContext: WebGLRenderingContext;

        constructor(glContext?:WebGLRenderingContext) {
            super();
            this.glContext = glContext;
        }
    }
}

window.onload = (e) => {
    alert("{0}".format(new jThree.Exceptions.jThreeException("TEST", "TEST MESSAGE")));
};
