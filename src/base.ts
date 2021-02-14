import { Schema, SchemaTypeOpts } from 'mongoose';

export interface BaseSchema<Type> {
    generateSchema: () => MongooseSchemaDefinition;
    getExample(): Type;
}

export type MaintainOptionality<Current, New> = Current extends undefined ? New | undefined : New;

export type MongooseSchemaDefinition =
    | Schema
    | SchemaTypeOpts<any>
    | {
          [key: string]: SchemaTypeOpts<any> | MongooseSchemaDefinition;
      }
    | [MongooseSchemaDefinition];
