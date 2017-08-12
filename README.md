## Qiwi wallet API for Node.js
To get started, get yourself an [API key](https://qiwi.com/api)  
```js 
const Qiwi = require("qiwi-wallet");
const qiwi = new Qiwi('API_KEY');
``` 

### getProfile

```js 
qiwi
  .getProfile()
  .then(profile => console.log(profile))
  .catch(err => console.log(err)); 
```
