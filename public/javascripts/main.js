function innerTitleDate() {
const year = document.querySelector('.year')
const monthDate = document.querySelector('.month-date')
const date = new Date()
year.innerText = date.getFullYear()
monthDate.innerText = `${date.getMonth() + 1} 月 ${date.getDate()} 日`
}

innerTitleDate()