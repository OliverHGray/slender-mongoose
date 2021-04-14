import { Schema } from 'mongoose';

let schemaConstructor: typeof Schema;

export const initialise = (schema: typeof Schema) =>
    (schemaConstructor = schema);

export const getSchemaConstructor = () => schemaConstructor;
