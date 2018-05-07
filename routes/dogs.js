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

router.get('/:dogId', async (req, res) => {
  try {
    const token = `Bearer ${req.cookies.token}`;
    const dog = await jsonRequest(
      `https://guarded-scrubland-41238.herokuapp.com/api/dogs/${req.params.dogId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        credentials: 'include',
      });
    res.render('pages/dog', { dog: dog });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
