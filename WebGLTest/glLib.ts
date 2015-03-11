interface String {
    format(...replacements: any[]): string;
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

module JThree
{
    export interface Action<T>
    {
        (arg:T):void;
    }

    interface Func1<T, R>
    {
        (arg:T):R;
    }

    interface Func0<R>
    {
        ():R;
    }

    export class Collection {
        public static foreach<T>(collection:IEnumerable<T>,act:Action<T>): void {
            var enumerator:IEnumrator<T> = collection.getEnumrator();
            while (enumerator.next()) {
                act(enumerator.getCurrent());
            }
        }
    }

    export interface IEnumrator<T>
    {
        getCurrent(): T;
        next():boolean;
    }

    export class JThreeError implements Error {
        constructor(name: string, message: string) {
            this.message = message;
            this.name = name;
        }
        name: string;
        message: string;
        toString(): string {
            return "{0}:\nName:{1}\nMessage{2}".format(JsHack.getObjectName(this),this.name,this.message);
        }
    }

    export interface IEnumerable<T> {
        getEnumrator():IEnumrator<T>;
    }

    class JsHack
    {
        public static getObjectName(obj:any): string
        {
            var funcNameRegex = /function (.{1,})\(/;
            var result = (funcNameRegex).exec((obj).constructor.toString());
            return (result && result.length > 1) ? result[1] : "";
        }

    }

    export interface IUnitConverter
    {
        toRadian(val:number): number;
        fromRadian(radian:number):number;
        toMilliSecound(val:number): number;
        fromMilliSecound(milliSecound:number):number;
    }

    export interface IStringConvertable
    {
        toString():string;
    }

    export class JThreeObject implements IStringConvertable
    {
        toString(): string
        {
            return JsHack.getObjectName(this);
        }
    }
    
    export class DegreeMilliSecoundUnitConverter extends JThreeObject implements IUnitConverter
    {
        toRadian(val: number): number
        {
            return JThreeMath.PI / 180 * val;
        }

        fromRadian(radian: number): number
        {
            return 180 / JThreeMath.PI * radian;
        }

        toMilliSecound(val: number): number
        {
            return val * 1000;
        }

        fromMilliSecound(milliSecound: number): number
        {
            return milliSecound / 1000;
        }
    }

    export class JThreeMath extends JThreeObject
    {
        public static PI:number = Math.PI;

        public static E: number = Math.E;

        private converter: IUnitConverter;

        private radianResult(f: Func0<number>): number
        {
            return this.converter.fromRadian(f());
        }

        private radianRequest(v:number,f: Func1<number,number>): number
        {
            return f(this.converter.toRadian(v));
        }

        public getCurrentConverter(): IUnitConverter
        {
            return this.converter;
        }

        constructor(unitConverter?: IUnitConverter)
        {
            super();
            this.converter = unitConverter || new DegreeMilliSecoundUnitConverter();
        }

        /**
         * 正弦
         */
        public sin(val: number):number
        {
            return this.radianRequest(val, (val) =>
            {
                return Math.sin(val);
            });
        }
        /**
         * 余弦
         */
        public cos(val: number): number
        {
            return this.radianRequest(val, (val) =>
            {
                return Math.cos(val);
            });
        }
        /**
         * 正接
         */
        public tan(val: number): number
        {
            return this.radianRequest(val, (val) =>
            {
                return Math.tan(val);
            });
        }

        public asin(val: number): number
        {
            return this.radianResult(() =>
            {
                return Math.asin(val);
            });
        }

        public acos(val: number): number {
            return this.radianResult(() => {
                return Math.acos(val);
            });
        }

        public atan(val: number): number {
            return this.radianResult(() => {
                return Math.atan(val);
            });
        }

        public static range(val:number,lower:number,higher:number): boolean {
            if (val >= lower && val < higher) {
                return true;
            } else {
                return false;
            }
        }

    }

    class VectorBase implements IEnumerable<number> {

        public elementCount(): number {
            return 0;
        }

        private magnitudeSquaredCache: number = -1;

        magnitudeSquared() {
            if (this.magnitudeSquaredCache < 0) {
                var sum: number = 0;
                Collection.foreach(this, (t) => {
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

        getEnumrator(): IEnumrator<number> { throw new Error("Not implemented"); }
    }

    class Vector2Enumerator implements IEnumrator<number> {

        private currentIndex: number = -1;

        private vec:Vector2;

        constructor(vec: Vector2) {
            this.vec = vec;
        }

        getCurrent(): number {
            switch (this.currentIndex) {
            case 0:
                return this.vec.getX();
            case 1:
                return this.vec.getY();
                default:
                    throw new JThreeError("","");//TODO Fill error
            }
        }

        next(): boolean {
            this.currentIndex++;
            return JThreeMath.range(this.currentIndex, 0, 2);
        }
    }

    export class Vector2 extends JThreeObject implements IEnumerable<number> {
        private x: number;
        private y:number;

        getX(): number {
            return this.x;
        }

        getY(): number {
            return this.y;
        }

        toString(): string
        {
            return "Vector2(x={0},y={1})".format(this.x,this.y);
        }

        getEnumrator(): IEnumrator<number> {
            return new Vector2Enumerator(this);
        }
    }

    export class JThreeContext extends JThreeObject
    {
        
    }

    export class CanvasRenderer extends JThreeObject
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

window.onload = (e) =>
{
   
};