import { buildApp } from '@/app';
import assert from 'assert';
import { test } from 'node:test';

test("deve criar uma interação com o chat e retornar status 200 com a mensagem 'registrar transação'", async () => {
  const app = await buildApp();
  const msg = 'Cadastrar compra feita hoje no valor de 10 reais';

  const response = await app.inject({
    method: 'POST',
    url: '/chat',
    body: { message: msg },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.body, 'registrar transação');
});

test("deve criar uma interação com o chat e retornar status 200 com a mensagem informando que não conseguiu identificar a intenção'", async () => {
  const app = await buildApp();
  const msg = 'Olá chat';

  const response = await app.inject({
    method: 'POST',
    url: '/chat',
    body: { message: msg },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(
    response.body,
    "Comando não identificado, tente algo como 'registrar gasto de 10 reais' ou 'cadastrar gasto de 10 reais'",
  );
});
