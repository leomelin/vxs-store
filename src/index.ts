import Vue from 'vue'
import Component, { createDecorator, mixins } from 'vue-class-component'

export type ActionFunction<T> = {
  (): T
  _$state: T
}

export function VxsStore({ state: inputState, getters, actions }: any) {
  // @ts-ignore
  const state = Vue.observable(inputState)
  const patchState = (patch: any) => {
    return {
      ...state,
      ...patch
    }
  }

  const dispatch = async (func: any, ...rest: any[]) => {
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

export function Action(actionFunc: any) {
  return function(target: any, key: string) {
    target[key] = async function(...rest: []) {
      Object.assign(actionFunc._$state, await actionFunc.apply(null, rest))
    }
  }
}

export function Get(params: any) {
  const getterFunction = typeof params === 'function' ? params : params.getter

  return function(target: any, key: string) {
    createDecorator(function(componentOptions, k): any {
      componentOptions.inject = {
        ...(componentOptions.inject || {}),
        [k]: {
          default: function() {
            const vm = this
            return Object.defineProperty(this, k, {
              enumerable: true,
              get() {
                return getterFunction()
              },
              async set(value) {
                if (params.setterAction) {
                  Object.assign(
                    params.setterAction._$state,
                    await params.setterAction(value)
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
