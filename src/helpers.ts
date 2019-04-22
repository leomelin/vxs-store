import {ActionFunction, AnyFunction, AnyObject, GetterSetterObject, ParametrizedGetter} from "@/types";

export function mapGetters(fields: {
  [key: string]: AnyFunction<any> | ParametrizedGetter
}): GetterSetterObject {
  return Object.entries(fields).reduce((acc: AnyObject, [key, value]) => {
    acc[key] = {
      get: () => {
        if (typeof value === 'function') {
          return value()
        }
        return value.getter()
      },
      set: async (setterValue: any) => {
        if ((<ParametrizedGetter>value).setterAction) {
          Object.assign(
              (<ParametrizedGetter>value).setterAction._$state,
              await (<ParametrizedGetter>value).setterAction(setterValue)
          )
        }
      }
    }
    return acc
  }, {})
}

export function mapActions(fields: {
  [key: string]: ActionFunction<any>
}): { [key: string]: ActionFunction<any> } {
  return Object.entries(fields).reduce((acc: AnyObject, [key, value]) => {
    acc[key] = async (...args: any[]) => {
      Object.assign(value._$state, await value.apply(null, args))
    }
    return acc
  }, {})
}
