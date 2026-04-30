import assert from 'assert';
import { test } from 'node:test';

import { buildApp } from '@/app';

test('deve criar uma interação com o chat e retornar status 200 e intenção ser register', async () => {
  const app = await buildApp();
  const msg = 'adicionar compra';

  const response = await app.inject({
    method: 'POST',
    url: '/chat',
    body: { message: msg },
  });

  assert.equal(response.statusCode, 200);
  const { intent } = response.json();
  assert.equal(intent, 'register');
});

test('deve criar uma interação com o chat e retornar status 200 e intenção ser unknown', async () => {
  const app = await buildApp();
  const msg = 'Que dia é hoje?';

  const response = await app.inject({
    method: 'POST',
    url: '/chat',
    body: { message: msg },
  });

  assert.equal(response.statusCode, 200);
  const { intent } = response.json();
  assert.equal(intent, 'unknown');
});
