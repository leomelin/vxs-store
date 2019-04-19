import Vue, { ComponentOptions } from 'vue'
import Component, { createDecorator, mixins } from 'vue-class-component'

export type AnyObject = {
  [key: string]: any
}

export type ActionFunction<T extends AnyObject> = {
  (...args: any[]): T
  _$state: T
}

export type AnyFunction<T> = (...args: any[]) => T

export type VxsStoreConstructor<T extends AnyObject> = {
  state: T
  getters: { [key: string]: AnyFunction<any> }
  actions: { [key: string]: AnyFunction<T> }
}

export function VxsStore<T extends AnyObject>({
  state: inputState,
  getters,
  actions
}: VxsStoreConstructor<T>) {
  // @ts-ignore
  const state = Vue.observable(inputState)
  const patchState = (patch: AnyObject) => {
    return {
      ...state,
      ...patch
    }
  }

  const dispatch = async (func: ActionFunction<T>, ...rest: any[]) => {
    const newState = await func.apply(null, rest)
    Object.assign(func._$state, newState)
  }

  const store = {
    state,
    getters: Object.entries(getters).reduce((acc, [key, func]) => {
      // @ts-ignore
      acc[key] = func.bind(null, state)
      return acc
    }, {}),
    actions: Object.entries(actions).reduce(
      (
        acc: { [index: string]: ActionFunction<typeof inputState> },
        [key, func]
      ) => {
        // @ts-ignore
        acc[key] = func.bind(null, {
          state,
          patchState,
          dispatch
        })
        acc[key]._$state = state // Save reference to state as action function property
        return acc
      },
      {}
    ),
    patchState,
    getField: (field: string) => () => state[field],
    dispatch
  }
  return store
}

export function Action<T>(actionFunc: ActionFunction<T>) {
  return function(target: any, key: string) {
    target[key] = async function(...rest: []) {
      Object.assign(actionFunc._$state, await actionFunc.apply(null, rest))
    }
  }
}

export type ParametrizedGetter = {
  getter: AnyFunction<any>
  setterAction: ActionFunction<any>
}

export function Get(params: AnyFunction<any> | ParametrizedGetter) {
  const getterFunction = typeof params === 'function' ? params : params.getter

  return function(target: Vue, key: string) {
    createDecorator(function(componentOptions, k) {
      componentOptions.inject = {
        ...(componentOptions.inject || {}),
        [k]: {
          default: function() {
            return Object.defineProperty(this, k, {
              enumerable: true,
              get() {
                return getterFunction()
              },
              async set(value) {
                if ((<ParametrizedGetter>params).setterAction) {
                  Object.assign(
                    (<ParametrizedGetter>params).setterAction._$state,
                    await (<ParametrizedGetter>params).setterAction(value)
                  )
                }
              }
            })
          }
        }
      }
    })(target, key)
  }
}

export type Getter<T> = {
  value: T
}
