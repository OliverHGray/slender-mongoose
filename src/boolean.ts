import { BaseSchema } from './base';
import { SchemaTypeOptions } from 'mongoose';

export const boolean = () => {
    let options: SchemaTypeOptions<BooleanConstructor> = {
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
    options: (options: SchemaTypeOptions<any>) => this;
}
