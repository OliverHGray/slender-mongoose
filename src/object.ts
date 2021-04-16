import { BaseSchema } from './base';

export const object = <Fields extends object, PartialFields extends object>(
    fields: ObjectProperties<Fields> & ObjectPartialProperties<PartialFields>,
): ObjectSchema<Fields, PartialFields> => ({
    generateSchema: (constructor) =>
        (Object.entries(fields) as any[]).reduce(
            (schema, [key, value]: [string, BaseSchema<any, any>]) => ({
                ...schema,
                [key]: value.generateSchema(constructor),
            }),
            {},
        ),
    getExample: () =>
        (Object.entries(fields) as any[]).reduce(
            (schema, [key, value]) => ({
                ...schema,
                [key]: value.getExample(),
            }),
            {},
        ),
    getPartialExample: () =>
        (Object.entries(fields) as any[]).reduce(
            (schema, [key, value]) => ({
                ...schema,
                [key]: value.getPartialExample(),
            }),
            {},
        ),
});

export type ObjectProperties<Fields extends object> = {
    [Field in keyof Fields]: BaseSchema<Fields[Field], any>;
};

export type ObjectPartialProperties<PartialFields extends object> = {
    [Field in keyof PartialFields]: BaseSchema<any, PartialFields[Field]>;
};

export interface ObjectSchema<Fields extends object, FullFields extends object>
    extends BaseSchema<Fields, FullFields> {}
