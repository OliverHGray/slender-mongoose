import {
    GeneratePartialType,
    GenerateType,
    array,
    schema,
    string,
} from '../src';

test('check schema types dont error', () => {
    const definition = schema({
        list: array(
            schema({
                property: string(),
            })
                .enableTimestamps()
                .enableId(),
        ),
    });

    type CreateType = GeneratePartialType<typeof definition>;
    const create = (param: CreateType) => console.log(param);

    create({
        list: [
            {
                property: 'true',
            },
        ],
    });

    type ResultType = GenerateType<typeof definition>;
    const result = (param: ResultType) => console.log(param);

    result({
        list: [
            {
                id: '',
                property: 'true',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    });
});
