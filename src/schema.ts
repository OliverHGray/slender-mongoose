import { BaseSchema } from './base';
import { Schema, SchemaOptions } from 'mongoose';

export const schema = <Fields extends object>(
    fields: SchemaSchemaDefinition<Fields>,
): SchemaSchema<Fields> => {
    let options: SchemaOptions = {};
    const schema: SchemaSchema<Fields> = {
        onTransformation: (params) => {
            options.toJSON = {
                transform: (doc, ret) => {
                    if (params.transform?._idToId) {
                        ret.id = ret._id.toString();
                    }
                    if (params.transform?._idToId || params.omit?._id) {
                        delete ret._id;
                    }
                    if (params.omit?.__v) {
                        delete ret.__v;
                    }
                },
            };
            return schema;
        },
        disableProperties: (params) => {
            if (params._id !== undefined) {
                options._id = params._id;
            }
            if (params.__v !== undefined) {
                options.versionKey = params.__v;
            }
            return schema;
        },
        options: (newOptions) => {
            options = {
                ...newOptions,
                ...options,
            };
            return schema;
        },
        generateSchema: () =>
            new Schema(
                (Object.entries(fields) as any[]).reduce(
                    (schema, [key, value]) => ({
                        ...schema,
                        [key]: value.generateSchema(),
                    }),
                    {},
                ),
                options,
            ),
        getExample: () =>
            (Object.entries(fields) as any[]).reduce(
                (schema, [key, value]) => ({
                    ...schema,
                    [key]: value.getExample(),
                }),
                {},
            ),
    };
    return schema;
};

export type SchemaSchemaDefinition<Fields extends object> = {
    [Field in keyof Fields]: BaseSchema<Fields[Field]>;
};

export interface SchemaSchema<Fields extends object | undefined>
    extends BaseSchema<Fields> {
    onTransformation: (options: {
        transform?: {
            _idToId?: boolean;
        };
        omit?: {
            _id?: boolean;
            __v?: boolean;
        };
    }) => SchemaSchema<Fields>;
    disableProperties: (options: {
        _id?: boolean;
        __v?: boolean;
    }) => SchemaSchema<Fields>;
    options: (options: SchemaOptions) => SchemaSchema<Fields>;
    generateSchema: () => Schema<Fields>;
}
