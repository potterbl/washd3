const usersQuery = JSON.parse(localStorage.getItem('users'))
let languageQuery = localStorage.getItem('language')
let userResult = []
for(let i = 0; i < usersQuery.length; i++){
    if(usersQuery[i].admin === true){
        userResult.push(usersQuery[i])
    }
}


const languageNor = document.querySelector('#nor')
const languageEn = document.querySelector('#en')

function setLangEn() {
    languageEn.classList.add('lang__active')
    languageNor.classList.remove('lang__active')
    languageQuery = 'en'
    localStorage.setItem('language', languageQuery);
}

function setLangNor () {
    languageEn.classList.remove('lang__active')
    languageNor.classList.add('lang__active')
    languageQuery = 'nor'
    localStorage.setItem('language', languageQuery);
}

languageNor.addEventListener('click', setLangNor)
languageEn.addEventListener('click', setLangEn)

const login = document.querySelector('#login')
const loginLabel = document.querySelector('#label__login p')
const password = document.querySelector('#password')
const passwordLabel = document.querySelector('#label__password p')
function onLoginFocus() {
    loginLabel.style = 'color: rgba(255, 255, 255, 0.6); top: 6px; font-size: 14px;'
}
function onLoginBLur() {
    if (login.value === '') {
        loginLabel.style = ''
    }
}
function onPasswordFocus() {
    passwordLabel.style = 'color: rgba(255, 255, 255, 0.6); top: 6px; font-size: 14px;'
}
function onPasswordBLur() {
    if (password.value === '') {
        passwordLabel.style = ''
    }
}
login.addEventListener('focus', onLoginFocus)
password.addEventListener('focus', onPasswordFocus)
login.addEventListener('blur', onLoginBLur)
password.addEventListener('blur', onPasswordBLur)

const buttonLog = document.querySelector('button')
function loginAcc(loginMail, password) {
    let loginRes = false;
    let passRes = false
    for(let i = 0; i < userResult.length; i++){
        if(loginMail === userResult[i].login){
            loginRes = true;
        }
        if(password === userResult[i].password){
            passRes = true;
        }
        if(loginRes === true && passRes === true){
            localStorage.setItem('user', JSON.stringify(userResult[i]))
            window.location.href = 'pages/SystemAdmin/dashboard.html';
            break
        }
    }
}

buttonLog.addEventListener('click',() => {
    loginAcc(login.value, password.value)
} )
