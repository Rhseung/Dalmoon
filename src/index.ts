import { Server } from '@remote-kakao/core';

const config = {
  email: 'dalmooned@gmail.com',
  password: 'daldaldal310',
  key: 'a2a7630ebf70418dba583979f42e288d',
  host: 'https://open.kakao.com',
};

const server = new Server({ useKakaoLink: true });

server.on('message', async (msg) => {
  const prefix = '>';
  if (!msg.content.startsWith(prefix)) return;

  msg.replyText(JSON.stringify(msg, null, 2));

  const args = msg.content.split(' ');
  const cmd = args.shift()?.slice(prefix.length);

  switch (cmd) {
    case 'ping': // not accurate
      const timestamp = Date.now();
      await msg.replyText('Pong!');
      msg.replyText(`${Date.now() - timestamp}ms`);
      break;
    case 'kaling':
      msg.replyKakaoLink({ id: 69703, args: { title: args[0], description: args[1] } });
      break;
  }
});

server.start(65070, config);
