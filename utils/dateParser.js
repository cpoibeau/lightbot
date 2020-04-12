module.exports = (rawDate) => {
  function numberFix(number){
    if (number < 10) return '0' + number.toString()
    return number.toString()
  }
  
  let minutes, hours, day, date, month, year, ord
  
  minutes = numberFix(rawDate.getMinutes())
  hours = numberFix(rawDate.getHours())
  day = new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(rawDate)
  date = numberFix(rawDate.getDate())
  month = new Intl.DateTimeFormat('en-US', { month: 'long'}).format(rawDate)
  year = rawDate.getFullYear()

  switch(date.slice(-1)){
    case '1': ord = 'st'
    case '2': ord = 'nd'
    case '3': ord = 'rd'
    default: ord = 'th'
  }

  parsedDate = `${day} ${date}${ord} of ${month} ${year} - ${hours}:${minutes}`
  return parsedDate
}