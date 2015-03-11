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
    interface Action<T>
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

    }

    export class Vector2 extends JThreeObject
    {
        private x: number;
        private y:number;



        toString(): string
        {
            return "Vector2(x={0},y={1})".format(this.x,this.y);
        }
    }
}

window.onload = (e) =>
{
    var converter = new JThree.DegreeMilliSecoundUnitConverter();
    var m = new JThree.JThreeMath(converter);
    alert("Test{0},{1}".format(100,"Hello World"));
};