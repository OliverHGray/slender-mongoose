import { BaseSchema } from './base';
import { SchemaTypeOpts } from 'mongoose';

export const boolean = () => {
    let options: SchemaTypeOpts<BooleanConstructor> = { type: Boolean, required: true };
    const schema: BooleanSchema<boolean> = {
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
        getExample: () => false,
    };
    return schema;
};

export interface BooleanSchema<Type extends boolean | undefined> extends BaseSchema<Type> {
    optional: () => BooleanSchema<Type | undefined>;
    options: (options: SchemaTypeOpts<any>) => this;
}
