///<reference path="../_references.ts"/>

module jThree.Collections {
    import Action1 = jThree.Delegates.Action1;
    import Action2 = jThree.Delegates.Action2;
    /**
     * The interface to support simple iteration for generic types.
     */
    export interface IEnumrator<T> {
        getCurrent(): T;
        next(): boolean;
    }

    /**
     * The interface to the types contain specified type of enumerator.
     */
    export interface IEnumerable<T> {
        getEnumrator(): IEnumrator<T>;
    }
    /**
     * The class for wrap basic javascript arrays as collection type implementing IEnumerator.
     */
    export class ArrayEnumratorFactory<T> implements IEnumerable<T> {
        constructor(targetArray: T[]) { this.targetArray = targetArray; }

        targetArray:T[];
        getEnumrator(): IEnumrator<T> { return new ArrayEnumerable(this.targetArray); }
    }

    class ArrayEnumerable<T> implements IEnumrator<T> {
        constructor(targetArrary: T[]) { this.targetArrary = targetArrary; }

        targetArrary: T[];
        currentIndex:number=-1;

    getCurrent(): T {
        if (this.targetArrary.length > this.currentIndex && this.currentIndex >= 0) {
            return this.targetArrary[this.currentIndex];
        }
    }

        next(): boolean {
            this.currentIndex++;
            if (this.currentIndex >= this.targetArrary.length) return false;
            return true;
        }
    }
    /**
     * Containing some of methods use for IEnumerable generic interfaces.
     */
    export class Collection {
        /**
         * provides simple collection iteration like C# foreach syntax.
         */
        public static foreach<T>(collection: IEnumerable<T>, act: Action1<T>): void {
            var enumerator: IEnumrator<T> = collection.getEnumrator();
            while (enumerator.next()) {
                act(enumerator.getCurrent());
            }
        }
        /**
         * provide the iteration that iterate 2 collections same time.
         * if the length of passed collection is different with the other collection, this method will stop when run out all elements in short collection.
         */

        public static foreachPair<T>(col1: IEnumerable<T>, col2: IEnumerable<T>, act: Action2<T, T>) {
            var en1: IEnumrator<T> = col1.getEnumrator();
            var en2: IEnumrator<T> = col2.getEnumrator();
            while (en1.next() && en2.next()) {
                act(en1.getCurrent(), en2.getCurrent());
            }
        }
    } 
} 
