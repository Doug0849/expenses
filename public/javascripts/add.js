const inputDate = document.querySelector('.input-date')
const today = new Date()

function insertToday() {
  let year = today.getFullYear()
  let month = ''
  let date = ''

  if ((today.getMonth() + 1) >= 10) {
    month += today.getMonth() + 1
  } else {
    month += '0' + (today.getMonth() + 1)
  }

  if (today.getDate() >= 10) {
    date += today.getDate()
  } else {
    date += '0' + (today.getDate())
  }
  
  inputDate.value = `${year}-${month}-${date}`

}

insertToday()
