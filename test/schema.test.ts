import { GenerateType, GenerateFullType, schema, string } from '../src';

test('check schema types dont error', () => {
    const definition = schema({
        property: string(),
    })
        .enableTimestamps()
        .enableId();

    type CreateType = GenerateType<typeof definition>;
    const create = (param: CreateType) => console.log(param);

    create({
        property: 'true',
    });

    type ResultType = GenerateFullType<typeof definition>;
    const result = (param: ResultType) => console.log(param);

    result({
        id: '',
        property: 'true',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
});
