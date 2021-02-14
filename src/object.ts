import { BaseSchema } from './base';

export const object = <Fields extends object>(
    fields: ObjectSchemaDefinition<Fields>,
): ObjectSchema<Fields> => ({
    generateSchema: () =>
        (Object.entries(fields) as any[]).reduce(
            (schema, [key, value]: [string, BaseSchema<any>]) => ({
                ...schema,
                [key]: value.generateSchema(),
            }),
            {},
        ),
    getExample: () =>
        (Object.entries(fields) as any[]).reduce(
            (schema, [key, value]: [string, BaseSchema<any>]) => ({
                ...schema,
                [key]: value.getExample(),
            }),
            {},
        ),
});

export type ObjectSchemaDefinition<Fields extends object> = {
    [field in keyof Fields]: BaseSchema<Fields[field]>;
};

export interface ObjectSchema<Type extends object> extends BaseSchema<Type> {}
