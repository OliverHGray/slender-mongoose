import { BaseSchema } from './base';
import { SchemaTypeOptions } from 'mongoose';

export const number = () => {
    let options: SchemaTypeOptions<NumberConstructor> = {
        type: Number,
        required: true,
    };
    const schema: NumberSchema<number> = {
        optional: () => {
            options.required = false;
            return schema;
        },
        unique: () => {
            options.unique = true;
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
        getPartialExample: () => 0,
    };
    return schema;
};

export interface NumberSchema<Type extends number | null | undefined>
    extends BaseSchema<Type, Type> {
    optional: () => NumberSchema<Type | null | undefined>;
    unique: () => NumberSchema<Type>;
    options: (options: SchemaTypeOptions<any>) => this;
}
