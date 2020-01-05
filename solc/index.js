const express = require('express')
var cors = require('cors')
const solc = require('solc')
const bodyParser = require('body-parser');
const app = express()

const port = 48452

app.use(bodyParser.json());
app.use(cors())

app.post('/', function(request, response){
  console.log("COMPILING...",request.body);      // your JSON
  console.log("SOURCES:",request.body.sources)
  let result = solc.compile(JSON.stringify(request.body))
  console.log(result)
  response.send(result);
});

app.get('/', (req, res) => res.send('solc.eth.build'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
