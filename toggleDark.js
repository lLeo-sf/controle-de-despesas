const dark = document.querySelector('#darkTheme')
const stylesSheet = document.querySelector('link')


const toggle = () => {
    const menuToggle = document.querySelector('.menuToggle')
    menuToggle.classList.contains('esconde') ? menuToggle.classList.remove('esconde') : menuToggle.classList.add('esconde')
}

let themeOption = localStorage.getItem('theme')

themeOption === 'dark' ? stylesSheet.setAttribute('href', './darkTheme.css') : stylesSheet.setAttribute('hrefc', './style.ss')
themeOption === 'dark' ? dark.checked = true : dark.checked = false

const saveTheme = () => {
    localStorage.setItem('theme', dark.checked ? 'dark' : 'light')
    window.location.reload()
}