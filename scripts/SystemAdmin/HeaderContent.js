const langBtn = document.querySelector('.language')
const flagEn = document.querySelector('#flagEn')
const flagNor = document.querySelector('#flagNor')
const langSelect = document.querySelector('.language__select')
const langSectionEn = document.querySelector('#langEn')
const langSectionNor = document.querySelector('#langNor')

langBtn.addEventListener('click', () => {
    langSelect.classList.toggle('language__opened')
})
updateLanguage()
function updateLanguage() {
    const lang = localStorage.getItem('language')
    if(lang === 'en'){
        langSectionEn.classList.add('lang__chosen')
        langSectionNor.classList.remove('lang__chosen')
        flagEn.style = 'display: block'
        flagNor.style = 'display: none'
    } else if(lang === 'nor') {
        langSectionNor.classList.add('lang__chosen')
        langSectionEn.classList.remove('lang__chosen')
        flagEn.style = 'display: none'
        flagNor.style = 'display: block'
    }
}

langSectionEn.addEventListener('click', () => {
    localStorage.setItem('language', 'en')
    updateLanguage()
})
langSectionNor.addEventListener('click', () => {
    localStorage.setItem('language', 'nor')
    updateLanguage()
})
const profile = document.querySelector('.right__profile')

profile.addEventListener('click', () => {
    window.location.href = './profile.html'
})

const userQuery = JSON.parse(localStorage.getItem('user'))

const profilePic = document.querySelector('.img__profile')
profilePic.style = `background-image: url('${userQuery.profilePic}')`

const profileName = document.querySelector('.profile__textarea h3')
profileName.innerText = `${userQuery.firstName} ${userQuery.lastName}`