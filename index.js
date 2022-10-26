const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const fs = require('fs');
const axios = require('axios');

app.use(express.static('static'));

app.get('/cep/:cep', async (req, res) => {
  let html2 = fs.readFileSync('pages/cep.html');
  var page2 = '';
  console.log('mandei', req.params.cep);
  if (req.params.cep) {
    cep = req.params.cep;
    axios
      .get('https://viacep.com.br/ws/' + cep + '/json')
      .then(async function (response) {
        console.log('cep get', JSON.stringify(response.data));
        page2 =
          `<script>
    var cepServer = ${JSON.stringify(response.data)}
    </script>` + html2.toString();
        res.end(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

app.get('/cep', (req, res) => {
  let html = fs.readFileSync('pages/cep.html');
  axios
    .get('https://viacep.com.br/ws/' + '51030360/' + 'json')
    .then(function (response) {
      console.log('cep', JSON.stringify(response.data));
      let page2 =
        html.toString() +
        `<script>
    var cepServer = ${JSON.stringify(response.data)}
    </script>`;
      console.log('page', page2);
      res.send(page2);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get('/', (req, res) => {
  var pessoasObj = {
    registros: [
      { nome: 'henning', idade: 68 },
      { nome: 'Summer', idade: 15 },
      { nome: 'Melo', idade: 85 },
      { nome: 'Coisa', idade: 32 },
    ],
  };

  // var pegaCep = fetch('https://viacep.com.br/ws/' + '51030300/' + 'json');
  // console.log(pegaCep);

  const html = fs.readFileSync('pages/index.html');

  const page2 =
    html.toString() +
    `<script>
    var pessoasObj = ${JSON.stringify(pessoasObj)}
    </script>`;
  // res.json({ html: html.toString(), data: pessoasObj });

  // let pessoas = { nome: 'summer', idade: 68 };
  res.send(page2);
  // res.sendFile(path.resolve('datas.js'));
  // res.send(pessoa);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
