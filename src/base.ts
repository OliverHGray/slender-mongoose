import { Schema, SchemaTypeOpts } from 'mongoose';

export interface BaseSchema<Type, FullType> {
    generateSchema: () => MongooseSchemaDefinition;

    // TypeScript loses the Type if it isn't used.
    getExample: () => Type;
    getFullExample: () => FullType;
}

export type MaintainOptionality<Current, New> = Current extends undefined
    ? New | undefined
    : New;

export type MongooseSchemaDefinition =
    | Schema
    | SchemaTypeOpts<any>
    | {
          [key: string]: SchemaTypeOpts<any> | MongooseSchemaDefinition;
      }
    | [MongooseSchemaDefinition];
