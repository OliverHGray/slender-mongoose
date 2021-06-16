# slender-mongoose

Generate Mongoose schemas and TypeScript types from a single structure. Avoid double keying information.

## Example

```typescript
import { model, Document, Schema } from 'mongoose';
import {
    schema,
    string,
    object,
    GenerateType,
    GeneratePartialType,
} from 'slender-mongoose';

const definition = schema({
    title: string(),
    content: string(),
    author: object({
        uid: string(),
        name: string(),
        picture: string().optional(),
    }),
})
    .enableId()
    .enableTimestamps();

export const blogModel = model<Document & Blog>(
    'blog',
    definition
        .generateSchema(Schema)
        .index({ createdAt: -1 }, { unique: true })
        .index({ 'author.uid': 1, createdAt: -1 }),
);

export type Blog = GenerateType<typeof definition>;
export type PartialBlog = GeneratePartialType<typeof definition>;
```

In the above example, a blog `Schema` was generated for the `blogModel`, and a `Blog` and `PartialBlog` type were generated. The full `Blog` type contains the object types, plus `_id` and timestamps (i.e. `createdAt` and `updatedAt`). The `PartialBlog` type only contains the properties required to create a blog, so `_id`, `createdAt` and `updatedAt` are omitted.
