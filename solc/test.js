const axios = require('axios').default;

axios.post('http://localhost:48452/', {
  firstName: 'Fred',
  lastName: 'Flintstone'
})
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});
