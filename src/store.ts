import Vue from 'vue'
import {
  ActionFunction,
  AnyObject,
  VxsStoreConstructor,
  VxsStoreType
} from '@/types'

export function VxsStore<T extends AnyObject>({
  state: inputState,
  getters,
  actions
}: VxsStoreConstructor<T>): VxsStoreType<T> {
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
