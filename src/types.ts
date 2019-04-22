export type GetterSetterObject = {
  [key: string]: {
    get: AnyFunction<any>
    set: ActionFunction<any>
  }
}

export type Getter<T> = {
  value: T
}

export type AnyObject = {
  [key: string]: any
}

export type ActionFunctionDescriptor<T extends AnyObject> = {
  (...args: any[]): Promise<T>
}

export type ActionFunction<T extends AnyObject> = {
  (...args: any[]): Promise<T>
  _$state?: T
}

export type AnyFunction<T> = (...args: any[]) => T

export type VxsStoreConstructor<T extends AnyObject> = {
  state: T
  getters: { [key: string]: AnyFunction<any> }
  actions: { [key: string]: ActionFunctionDescriptor<T> }
}

export type VxsStoreType<T> = {
  state: T
  getters: { [key: string]: AnyFunction<any> }
  actions: { [key: string]: ActionFunction<T> }
  patchState: (arg: object) => T
  getField: (field: string) => () => T
  dispatch: (func: ActionFunction<T>, ...rest: any[]) => Promise<void>
}

export type ParametrizedGetter = {
  getter: AnyFunction<any>
  setterAction: ActionFunction<any>
}
