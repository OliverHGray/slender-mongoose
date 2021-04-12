import { BaseSchema } from './base';
import { SchemaTypeOpts } from 'mongoose';

export const number = () => {
    let options: SchemaTypeOpts<NumberConstructor> = {
        type: Number,
        required: true,
    };
    const schema: NumberSchema<number> = {
        optional: () => {
            options.required = false;
            return schema;
        },
        options: (newOptions) => {
            options = {
                ...options,
                ...newOptions,
            };
            return schema;
        },
        generateSchema: () => options,
        getExample: () => 0,
        getFullExample: () => 0,
    };
    return schema;
};

export interface NumberSchema<Type extends number | null | undefined>
    extends BaseSchema<Type, Type> {
    optional: () => NumberSchema<Type | null | undefined>;
    options: (options: SchemaTypeOpts<any>) => this;
}
