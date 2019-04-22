import Vue from 'vue';
export declare type AnyObject = {
    [key: string]: any;
};
export declare type ActionFunctionDescriptor<T extends AnyObject> = {
    (...args: any[]): Promise<T>;
};
export declare type ActionFunction<T extends AnyObject> = {
    (...args: any[]): Promise<T>;
    _$state?: T;
};
export declare type AnyFunction<T> = (...args: any[]) => T;
export declare type VxsStoreConstructor<T extends AnyObject> = {
    state: T;
    getters: {
        [key: string]: AnyFunction<any>;
    };
    actions: {
        [key: string]: ActionFunctionDescriptor<T>;
    };
};
export declare function VxsStore<T extends AnyObject>({ state: inputState, getters, actions }: VxsStoreConstructor<T>): VxsStoreType<T>;
export declare type VxsStoreType<T> = {
    state: T;
    getters: {
        [key: string]: AnyFunction<any>;
    };
    actions: {
        [key: string]: ActionFunction<T>;
    };
    patchState: (arg: object) => T;
    getField: (field: string) => () => T;
    dispatch: (func: ActionFunction<T>, ...rest: any[]) => Promise<void>;
};
export declare function Action<T>(actionFunc: ActionFunction<T>): (target: any, key: string) => void;
export declare type ParametrizedGetter = {
    getter: AnyFunction<any>;
    setterAction: ActionFunction<any>;
};
export declare function Get(params: AnyFunction<any> | ParametrizedGetter): (target: Vue, key: string) => void;
export declare type GetterSetterObject = {
    [key: string]: {
        get: AnyFunction<any>;
        set: ActionFunction<any>;
    };
};
export declare function mapGetters(fields: {
    [key: string]: AnyFunction<any> | ParametrizedGetter;
}): GetterSetterObject;
export declare function mapActions(fields: {
    [key: string]: ActionFunction<any>;
}): {
    [key: string]: ActionFunction<any>;
};
export declare type Getter<T> = {
    value: T;
};
