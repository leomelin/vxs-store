import { ActionFunction, AnyFunction, GetterSetterObject, ParametrizedGetter } from "@/types";
export declare function mapGetters(fields: {
    [key: string]: AnyFunction<any> | ParametrizedGetter;
}): GetterSetterObject;
export declare function mapActions(fields: {
    [key: string]: ActionFunction<any>;
}): {
    [key: string]: ActionFunction<any>;
};
