
module.exports = function (res, options) {
  options = options || {}
  var separator = options.separator || ', '
  res.appendHeader = function (name, value) {
    var current = this.getHeader(name)
    if (current) {
      this.setHeader(name, current + separator + value)
    } else {
      this.setHeader(name, value)
    }
  }
}
