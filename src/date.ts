import { BaseSchema } from './base';
import { SchemaTypeOpts } from 'mongoose';

export const date = () => {
    let options: SchemaTypeOpts<BooleanConstructor> = {
        type: Date,
        required: true,
    };
    const schema: DateSchema<Date> = {
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
        getExample: () => new Date(),
        getPartialExample: () => new Date(),
    };
    return schema;
};

export interface DateSchema<Type extends Date | null | undefined>
    extends BaseSchema<Type, Type> {
    optional: () => DateSchema<Type | null | undefined>;
    options: (options: SchemaTypeOpts<any>) => this;
}