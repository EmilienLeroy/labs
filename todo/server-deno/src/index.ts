import { app } from './app.ts';

await app.listen({ port: Number(Deno.env.get('HTTP_PORT')) });