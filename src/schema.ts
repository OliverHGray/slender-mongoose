import { BaseSchema } from './base';
import { Document, Schema, SchemaOptions } from 'mongoose';

export const schema = <Fields extends object, PartialFields extends object>(
    fields: SchemaProperties<Fields> & SchemaPartialProperties<PartialFields>,
): SchemaSchema<Fields, PartialFields> => {
    const transformations = {
        enableId: false,
        enableVersion: false,
    };
    let options: SchemaOptions = {
        _id: false,
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                if (transformations.enableId) {
                    ret.id = ret._id.toString();
                    delete ret._id;
                }
                if (transformations.enableVersion) {
                    ret.version = ret.__v;
                    delete ret.__v;
                }
            },
        },
    };
    const schema: SchemaSchema<Fields, PartialFields> = {
        enableId: () => {
            options._id = true;
            transformations.enableId = true;
            return schema as any;
        },
        enableUnderscoreId: () => {
            options._id = true;
            return schema as any;
        },
        enableVersion: () => {
            options.versionKey = true;
            transformations.enableVersion = true;
            return schema as any;
        },
        enableUnderscoreVersion: () => {
            options.versionKey = true;
            return schema as any;
        },
        enableTimestamps: () => {
            options.timestamps = true;
            return schema as any;
        },
        options: (newOptions) => {
            options = {
                ...newOptions,
                ...options,
            };
            return schema;
        },
        generateSchema: (constructor) =>
            new constructor(
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
        getPartialExample: () =>
            (Object.entries(fields) as any[]).reduce(
                (schema, [key, value]) => ({
                    ...schema,
                    [key]: value.getFullExample(),
                }),
                {},
            ),
    };
    return schema;
};

export type SchemaProperties<Fields extends object> = {
    [Field in keyof Fields]: BaseSchema<Fields[Field], any>;
};

export type SchemaPartialProperties<PartialFields extends object> = {
    [Field in keyof PartialFields]: BaseSchema<any, PartialFields[Field]>;
};

export interface SchemaSchema<
    Fields extends object,
    PartialFields extends object
> extends BaseSchema<Fields, PartialFields> {
    enableId: () => SchemaSchema<Fields & Id, PartialFields>;
    enableUnderscoreId: () => SchemaSchema<Fields & _Id, PartialFields>;
    enableVersion: () => SchemaSchema<Fields & Version, PartialFields>;
    enableUnderscoreVersion: () => SchemaSchema<Fields & __V, PartialFields>;
    enableTimestamps: () => SchemaSchema<Fields & Timestamps, PartialFields>;
    options: (options: SchemaOptions) => SchemaSchema<Fields, PartialFields>;
    generateSchema: (constructor: typeof Schema) => Schema<Document<Fields>>;
}

type Id = {
    id: string;
};

type _Id = {
    _id: string;
};

type Version = {
    version: string;
};

type __V = {
    __v: string;
};

type Timestamps = {
    createdAt: Date;
    updatedAt: Date;
};
