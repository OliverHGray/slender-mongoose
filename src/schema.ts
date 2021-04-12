import { BaseSchema } from './base';
import { Document, Schema, SchemaOptions } from 'mongoose';

export const schema = <Fields extends object, FullFields extends object>(
    fields: SchemaProperties<Fields> & SchemaFullProperties<FullFields>,
): SchemaSchema<Fields, FullFields> => {
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
    const schema: SchemaSchema<Fields, FullFields> = {
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
        getFullExample: () =>
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

export type SchemaFullProperties<FullFields extends object> = {
    [Field in keyof FullFields]: BaseSchema<any, FullFields[Field]>;
};

export interface SchemaSchema<Fields extends object, FullFields extends object>
    extends BaseSchema<Fields, FullFields> {
    enableId: () => SchemaSchema<Fields, FullFields & Id>;
    enableUnderscoreId: () => SchemaSchema<Fields, FullFields & _Id>;
    enableVersion: () => SchemaSchema<Fields, FullFields & Version>;
    enableUnderscoreVersion: () => SchemaSchema<Fields, FullFields & __V>;
    enableTimestamps: () => SchemaSchema<Fields, FullFields & Timestamps>;
    options: (options: SchemaOptions) => SchemaSchema<Fields, FullFields>;
    generateSchema: () => Schema<Document<Fields>>;
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
