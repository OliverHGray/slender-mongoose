import { BaseSchema } from './base';

export const array = <Type, FullType>(
    schema: BaseSchema<Type, FullType>,
): ArraySchema<Type, FullType, Type[], FullType[]> => ({
    generateSchema: () => [schema.generateSchema()],
    getExample: () => [schema.getExample()],
    getFullExample: () => [schema.getFullExample()],
});

export interface ArraySchema<
    InnerType,
    FullInnerType,
    ArrayType extends InnerType[],
    FullArrayType extends FullInnerType[]
> extends BaseSchema<ArrayType, FullArrayType> {}
