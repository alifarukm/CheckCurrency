const Utils = require("./utils");
var utils = Utils();
const http = require("http");

/**
 * Currency Converter
 */
function Converter() {
  this._base = null;
  this._symbols = null;
  this._from = "latest";
  this._to = null;
  this._isLeft = false;
  /**
   * Calculate
   */
  this.calculate = async function () {
    let data = await utils
      .makeRequest(this._from, this._base, this._symbols)
      .then((data) => {
        return data;
      });
    // process.stdout.write(JSON.stringify(typeof data.rates[this._symbols]));

    return (this._to * data.rates[this._symbols]).toFixed(2);
  };

  /**
   * Convert string
   *
   * @param {string} str
   */
  this.convert = async (str = "") => {
    try {
      utils.validateString(str);

      const left = str.split("=")[0];
      const right = str.split("=")[1];

      if (left.includes("?")) {
        this._symbols = left.replace(/[^a-zA-Z]+/g, "");
        this._base = right.replace(/[^a-zA-Z]+/g, "");
        this._to = parseFloat(right.replace(/[^0-9\.,]/g, "")).toFixed(2);
        this._isLeft = true;
      } else {
        this._symbols = right.replace(/[^a-zA-Z]+/g, "");
        this._base = left.replace(/[^a-zA-Z]+/g, "");
        this._to = parseFloat(left.replace(/[^0-9\.,]/g, "")).toFixed(2);
      }

      this._symbols = this._symbols.toUpperCase();
      this._base = this._base.toUpperCase();

      utils.validateCurrency(this._symbols);
      utils.validateCurrency(this._base);
    } catch (err) {
      return err.message;
    }
    var price = await calculate();

    return utils.stringBuilder(
      this._isLeft,
      price,
      this._symbols,
      this._to,
      this._base
    );
  };

  return this;
}

module.exports = Converter;
