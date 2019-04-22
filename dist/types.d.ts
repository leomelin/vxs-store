export declare type GetterSetterObject = {
    [key: string]: {
        get: AnyFunction<any>;
        set: ActionFunction<any>;
    };
};
export declare type Getter<T> = {
    value: T;
};
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
export declare type ParametrizedGetter = {
    getter: AnyFunction<any>;
    setterAction: ActionFunction<any>;
};
