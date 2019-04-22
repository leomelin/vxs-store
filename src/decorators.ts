import Vue from 'vue'
import { createDecorator } from 'vue-class-component'
import {
  VxsStoreConstructor,
  AnyObject,
  VxsStoreType,
  ActionFunction,
  AnyFunction,
  ParametrizedGetter
} from './types'

export function Action<T>(actionFunc: ActionFunction<T>) {
  return function(target: any, key: string) {
    target[key] = async function(...rest: []) {
      Object.assign(actionFunc._$state, await actionFunc.apply(null, rest))
    }
  }
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
