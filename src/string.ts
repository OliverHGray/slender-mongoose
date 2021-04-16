import { SchemaTypeOpts } from 'mongoose';
import { MaintainOptionality, BaseSchema } from './base';

export const string = () => {
    let options: SchemaTypeOpts<StringConstructor> = {
        type: String,
        required: true,
    };
    const schema: StringSchema<string> = {
        optional: () => {
            options.required = false;
            return schema;
        },
        enum: (arrayOfValues) => {
            options.enum = arrayOfValues as any;
            return schema as any;
        },
        options: (newOptions) => {
            options = {
                ...options,
                ...newOptions,
            };
            return schema;
        },
        generateSchema: () => options,
        getExample: () => '',
        getPartialExample: () => '',
    };
    return schema;
};

export interface StringSchema<Type extends string | null | undefined>
    extends BaseSchema<Type, Type> {
    optional: () => StringSchema<Type | null | undefined>;
    enum: <Enum extends Type>(
        arrayOfValues: ReadonlyArray<Enum>,
    ) => StringSchema<MaintainOptionality<Type, Enum>>;
    options: (options: SchemaTypeOpts<any>) => this;
}
