import { BaseSchema } from './base';

export const array = <Type>(schema: BaseSchema<Type>): ArraySchema<Type, Type[]> => ({
    generateSchema: () => [schema.generateSchema()],
    getExample: () => [schema.getExample()],
});

export interface ArraySchema<InnerType, ArrayType extends InnerType[]>
    extends BaseSchema<ArrayType> {}
