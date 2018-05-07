var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();

async function jsonRequest(path, options = {}) {
  const result = await fetch(path, {
    ...options,
    headers: { ...options.headers, Accept: 'application/json' },
  });
  const json = await result.json();
  if (result.status !== 200) {
    throw Object.assign(new Error(), json);
  }

  return json;
}

router.get('/', async (req, res) => {
  const response = await jsonRequest(`https://guarded-scrubland-41238.herokuapp.com/api/auth`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${process.env.API_TOKEN}`,
      },
      credentials: 'include',
      body: JSON.stringify({ password: 'manutd12', email: 'aasimon@uc.cl' }),
    });

  res.cookie('token', response.token).send(response);
});

module.exports = router;
