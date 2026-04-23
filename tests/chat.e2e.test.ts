import { buildApp } from '@/app';
import assert from 'assert';
import { test } from 'node:test';

test('deve criar uma interação com o chat', async () => {
  const app = await buildApp();
  const msg = 'Olá mundo';
  const expected = 'Olá mundo';

  const response = await app.inject({
    method: 'POST',
    url: '/chat',
    body: { message: msg },
  });

  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.equal(body.message, expected);
});
