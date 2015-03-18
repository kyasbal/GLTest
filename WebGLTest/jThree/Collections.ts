///<reference path="../_references.ts"/>

module jThree.Collections {
    import Action1 = jThree.Delegates.Action1;
    import Action2 = jThree.Delegates.Action2;

    export interface IEnumrator<T> {
        getCurrent(): T;
        next(): boolean;
    }

    export interface IEnumerable<T> {
        getEnumrator(): IEnumrator<T>;
    }

    export class Collection {
        public static foreach<T>(collection: IEnumerable<T>, act: Action1<T>): void {
            var enumerator: IEnumrator<T> = collection.getEnumrator();
            while (enumerator.next()) {
                act(enumerator.getCurrent());
            }
        }

        public static foreachPair<T>(col1: IEnumerable<T>, col2: IEnumerable<T>, act: Action2<T, T>) {
            var en1: IEnumrator<T> = col1.getEnumrator();
            var en2: IEnumrator<T> = col2.getEnumrator();
            while (en1.next() && en2.next()) {
                act(en1.getCurrent(), en2.getCurrent());
            }
        }
    }
} 
