import { BaseSchema } from './base';
import { SchemaTypeOpts } from 'mongoose';

export const boolean = () => {
    let options: SchemaTypeOpts<BooleanConstructor> = {
        type: Boolean,
        required: true,
    };
    const schema: BooleanSchema<boolean> = {
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
        getExample: () => false,
        getPartialExample: () => false,
    };
    return schema;
};

export interface BooleanSchema<Type extends boolean | null | undefined>
    extends BaseSchema<Type, Type> {
    optional: () => BooleanSchema<Type | null | undefined>;
    unique: () => BooleanSchema<Type>;
    options: (options: SchemaTypeOpts<any>) => this;
}
