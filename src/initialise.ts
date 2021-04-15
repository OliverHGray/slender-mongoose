import { Schema } from 'mongoose';

let schemaConstructor: typeof Schema;

export const initialise = (schema: typeof Schema) =>
    (schemaConstructor = schema);

export const getSchemaConstructor = () => {
    if (!schemaConstructor) {
        throw new Error('slender-mongoose has not been initialised. Call the initialise function before creating a schema.')
    }
    return schemaConstructor;
};
