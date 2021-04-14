import { BaseSchema } from './base';

export const array = <Type, FullType>(
    schema: BaseSchema<Type, FullType>,
): ArraySchema<Type, Type[], FullType, FullType[]> => ({
    generateSchema: () => [schema.generateSchema()],
    getExample: () => [schema.getExample()],
    getFullExample: () => [schema.getFullExample()],
});

export interface ArraySchema<
    InnerType,
    ArrayType extends InnerType[],
    FullInnerType,
    FullArrayType extends FullInnerType[]
> extends BaseSchema<ArrayType, FullArrayType> {}
