function innerTitleDate() {
const year = document.querySelector('.year')
const monthDate = document.querySelector('.month-date')
const date = new Date()
year.innerText = date.getFullYear()
monthDate.innerText = `${date.getMonth() + 1} 月 ${date.getDate()} 日`
}

innerTitleDate()

function checkLogin() {
  const navList = document.querySelector('.nav-list')
  const dateWrapper = document.querySelector('.date-wrapper')
  const btnPanel = document.querySelector('.btn-panel')
  const btnCreate = document.querySelector('.btn-create')
  const btnLogout = document.querySelector('.btn-logout')
  const hello = document.querySelector('.hello')

  if (!document.cookie.includes('userToken')) {
    return
  } else {
    navList.style.display = "grid"
    dateWrapper.style.display = "grid"
    btnPanel.style.display = "flex"
    btnCreate.style.display = "block"
    btnLogout.style.display = "block"
    hello.style.display = "block"
  }
}

checkLogin()