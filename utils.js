const https = require("https");
const currencies = require('./currencies');

function Utils() {
  
  /**
   * Make request
   *
   * @param {any} str
   */
  this.makeRequest = function (from,base,symbols) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "api.exchangeratesapi.io",
        port: 443,
        path: `/${from}?base=${base}&symbols=${symbols}`,
        method: "GET",
        agent: new https.Agent({ rejectUnauthorized: false })
      };
      const req = https.request(options, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error('statusCode=' + res.statusCode));
          }
          var body = '';
          res.on('data', function(chunk) {
              body += chunk;
          });
          res.on('end', function() {
              try {
                  body = JSON.parse(body);
              } catch(e) {
                  reject(e);
              }
              resolve(body);
          });
      });
      req.on('error', (e) => {
        reject(e.message);
      });
      req.end();
  });
  };

  this.validateCurrency = (currency) => {
    if (!(currency in currencies)) {
      throw new Error(`${currency} is not a valid currency`);
    }
  }

  this.validateString = (str) => {
    if(typeof str !== 'string')
    throw new Error(`${str} is not a valid please enter like that ? TRY = 2.5 USD`);

    if(str.split('=').length != 2)
      throw new Error(`${str} is not a valid please enter like that ? TRY = 2.5 USD`);
    
    if(str.split('=').length != 2)
      throw new Error(`${str} is not a valid please enter like that 2.5 TRY = ? USD`);
    
  }

  return this;
}

module.exports = Utils;