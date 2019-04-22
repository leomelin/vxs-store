import { AnyObject, VxsStoreConstructor, VxsStoreType } from '@/types';
export declare function VxsStore<T extends AnyObject>({ state: inputState, getters, actions }: VxsStoreConstructor<T>): VxsStoreType<T>;
