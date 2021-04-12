import { BaseSchema } from './base';

export const object = <Fields extends object, FullFields extends object>(
    fields: ObjectProperties<Fields> & ObjectFullProperties<FullFields>,
): ObjectSchema<Fields, FullFields> => ({
    generateSchema: () =>
        (Object.entries(fields) as any[]).reduce(
            (schema, [key, value]: [string, BaseSchema<any, any>]) => ({
                ...schema,
                [key]: value.generateSchema(),
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
    getFullExample: () =>
        (Object.entries(fields) as any[]).reduce(
            (schema, [key, value]) => ({
                ...schema,
                [key]: value.getFullExample(),
            }),
            {},
        ),
});

export type ObjectProperties<Fields extends object> = {
    [Field in keyof Fields]: BaseSchema<Fields[Field], any>;
};

export type ObjectFullProperties<FullFields extends object> = {
    [Field in keyof FullFields]: BaseSchema<any, FullFields[Field]>;
};

export interface ObjectSchema<Fields extends object, FullFields extends object>
    extends BaseSchema<Fields, FullFields> {}
