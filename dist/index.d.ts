export declare type ActionFunction<T> = {
    (): T;
    _$state: T;
};
export declare function VxsStore({ state: inputState, getters, actions }: any): {
    state: any;
    getters: {};
    actions: {};
    patchState: (patch: any) => any;
    getField: (field: string) => () => any;
    dispatch: (func: any, ...rest: any[]) => Promise<void>;
};
export declare function Action(actionFunc: any): (target: any, key: string) => void;
export declare function Get(params: any): (target: any, key: string) => void;
export declare type Getter<T> = {
    value: T;
};
