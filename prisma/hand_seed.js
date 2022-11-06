const fetch = require('node-fetch');
const { faker } = require('@faker-js/faker');


console.log('process.argv ', process.argv);

const count = process.argv[2];
console.log('count: ', count);

(async () => {
  for (let i = 0; i < count; i++) {
    try {
      let res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'post',
        body: JSON.stringify({
          email: faker.internet.email(),
          password: "1234567890",
          username: faker.internet.userName(),
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      //res = await res.json();
      //console.log(res);
    } catch (err) {
      console.log(err);
    }

    if (i % 10 === 0) console.log(`${i}/${count}`);
  }
})();
