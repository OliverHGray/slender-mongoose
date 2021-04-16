import { BaseSchema } from './base';

export const array = <Type, PartialType>(
    schema: BaseSchema<Type, PartialType>,
): ArraySchema<Type, Type[], PartialType, PartialType[]> => ({
    generateSchema: (constructor) => [schema.generateSchema(constructor)],
    getExample: () => [schema.getExample()],
    getPartialExample: () => [schema.getPartialExample()],
});

export interface ArraySchema<
    InnerType,
    ArrayType extends InnerType[],
    InnerPartialType,
    ArrayPartialType extends InnerPartialType[]
> extends BaseSchema<ArrayType, ArrayPartialType> {}
