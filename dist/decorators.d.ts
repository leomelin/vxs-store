import Vue from 'vue';
import { ActionFunction, AnyFunction, ParametrizedGetter } from './types';
export declare function Action<T>(actionFunc: ActionFunction<T>): (target: any, key: string) => void;
export declare function Get(params: AnyFunction<any> | ParametrizedGetter): (target: Vue, key: string) => void;
