import { BaseSchema } from './base';
import { Document, Schema, SchemaOptions, SchemaTimestampsConfig } from 'mongoose';

export const schema = <Fields extends object, PartialFields extends object>(
    fields: SchemaProperties<Fields> & SchemaPartialProperties<PartialFields>,
): SchemaSchema<Fields, PartialFields> => {
    const transformations = {
        enableId: false,
        omit: [] as string[],
    };
    let options: SchemaOptions = {
        _id: false,
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                if (transformations.enableId) {
                    ret = {
                      id: ret._id.toString(),
                      ...ret,
                    }
                    delete ret._id;
                }
                transformations.omit.forEach(key => delete ret[key]);
                return ret
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
            options.versionKey = 'version';
            return schema as any;
        },
        enableUnderscoreVersion: () => {
            options.versionKey = '__v';
            return schema as any;
        },
        enableTimestamps: (timestamps = { createdAt: true, updatedAt: true }) => {
            options.timestamps = timestamps;
            return schema as any;
        },
        omitFromJson: (omit) => {
            transformations.omit = omit;
            return schema;
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
                        [key]: value.generateSchema(constructor),
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
    enableTimestamps: (timestamps?: SchemaTimestampsConfig) => SchemaSchema<Fields & Timestamps, PartialFields>;
    omitFromJson: (keys: string[]) => SchemaSchema<Fields, PartialFields>;
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
