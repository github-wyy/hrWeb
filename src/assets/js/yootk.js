exports.dateConvert = function (paramDate) {
  var date = new Date(paramDate)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return year + '-' + pad(month, 2) + '-' + pad(day, 2)
}

function pad (num, n) {
  var len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

exports.randomeNum = function (n) {
  let rnd = ''
  for (let i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 10)
  }
  return rnd
}
