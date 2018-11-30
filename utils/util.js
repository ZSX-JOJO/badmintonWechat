const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getWeekDates = nowDate => {
  //JS获取当前周从星期一到星期天的日期
  var timesStamp = nowDate.getTime();
  var currenDay = nowDate.getDay();
  var dates = [];
  for (var i = 0; i < 7; i++) {
    dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '/'));
  }
  return dates
}

module.exports = {
  formatTime: formatTime,
  getWeekDates: getWeekDates
}




