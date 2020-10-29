const https = require("https");

/**
 * Currency Converter
 */
function Converter() {
  this._base = null;
  this._symbols = null;
  this._from = "latest";
  this._to = null;

  /**
   * Calculate
   */
  this.calculate = function () {
    const options = {
      hostname: "api.exchangeratesapi.io",
      port: 8080,
      path: `/${this._from}?base=${this._base}&symbols=${this._symbols}`,
      method: "GET",
    };
    console.log(`/${this._from}?base=${this._base}&symbols=${this._symbols}`);
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    req.on("error", (error) => {
      console.error(error.message);
    });

    req.end();
    return 0;
  };

  /**
   * Convert string
   *
   * @param {string} str
   */
  this.convert = function (str = "") {
    const left = str.split("=")[0];
    const right = str.split("=")[1];

    if (left.includes("?")) {
      this._symbols = left.replace(/[^a-zA-Z]+/g, "");
      this._base = right.replace(/[^a-zA-Z]+/g, "");
      this._to = right.replace(/[^0-9\.,]/g, "");
    } else {
      this._symbols = right.replace(/[^a-zA-Z]+/g, "");
      this._base = left.replace(/[^a-zA-Z]+/g, "");
      this._to = left.replace(/[^0-9\.,]/g, "");
    }

    var price = calculate();

    return str.replace("?", price);
  };

  return this;
}

// function _validateCurrency(currency) {
//     if (!(currency in currencies)) {
//         throw new ExchangeRatesError(`${currency} is not a valid currency`);
//     }
// }

module.exports = Converter;
