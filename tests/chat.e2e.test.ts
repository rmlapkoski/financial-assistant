import { buildApp } from '@/app';
import assert from 'assert';
import { test } from 'node:test';

test('deve criar uma interação com o chat e retornar status 200', async () => {
  const app = await buildApp();
  const msg = 'Olá mundo';

  const response = await app.inject({
    method: 'POST',
    url: '/chat',
    body: { message: msg },
  });

  assert.equal(response.statusCode, 200);
});
