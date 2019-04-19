import Vue from 'vue';
export declare type AnyObject = {
    [key: string]: any;
};
export declare type ActionFunction<T extends AnyObject> = {
    (...args: any[]): T;
    _$state: T;
};
export declare type AnyFunction<T> = (...args: any[]) => T;
export declare type VxsStoreConstructor<T extends AnyObject> = {
    state: T;
    getters: {
        [key: string]: AnyFunction<any>;
    };
    actions: {
        [key: string]: AnyFunction<T>;
    };
};
export declare function VxsStore<T extends AnyObject>({ state: inputState, getters, actions }: VxsStoreConstructor<T>): {
    state: T;
    getters: {};
    actions: {};
    patchState: (patch: AnyObject) => T & AnyObject;
    getField: (field: string) => () => any;
    dispatch: (func: ActionFunction<T>, ...rest: any[]) => Promise<void>;
};
export declare function Action<T>(actionFunc: ActionFunction<T>): (target: any, key: string) => void;
export declare type ParametrizedGetter = {
    getter: AnyFunction<any>;
    setterAction: ActionFunction<any>;
};
export declare function Get(params: AnyFunction<any> | ParametrizedGetter): (target: Vue, key: string) => void;
export declare type Getter<T> = {
    value: T;
};
