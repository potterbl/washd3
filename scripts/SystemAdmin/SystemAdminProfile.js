const notificationButton = document.querySelector('.notifications')
const notifications = document.querySelector('.notification__off')
notificationButton.addEventListener('click', () => {
    notifications.classList.toggle('notifications__on')
    if(notifications.classList.contains('notifications__on')){
        localStorage.setItem('notifications', 'on')
    } else {
        localStorage.setItem('notifications', 'off')
    }
})

if(localStorage.getItem('notifications')){
    if(localStorage.getItem('notifications') === 'on'){
        notifications.classList.add('notifications__on')
    }
}

const userRequest = JSON.parse(localStorage.getItem('user'))

let nameProfile = ''
let photoUpload = userRequest.profilePic
let oldPass = ''
let newPass = ''
let confirmPass = ''
let oldPin = ''
let newPin = ''
let confirmPin = ''

const nameProfileInput = document.querySelector('#nameProfile')
nameProfileInput.addEventListener('keyup', () => {nameProfile = nameProfileInput.value})
const photoUploadInput = document.querySelector('#photo-upload')
photoUploadInput.addEventListener('change', () => {
    const file = photoUploadInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        photoUpload = reader.result;
        updateImage();
    }

    reader.readAsDataURL(file);
})
const oldPassInput = document.querySelector('#oldPass')
oldPassInput.addEventListener('keyup', () => {oldPass = oldPassInput.value})
const newPassInput = document.querySelector('#newPass')
newPassInput.addEventListener('keyup', () => {newPass = newPassInput.value})
const confirmPassInput = document.querySelector('#confirmPass')
confirmPassInput.addEventListener('keyup', () => {confirmPass = confirmPassInput.value})
const oldPinInput = document.querySelector('#oldPin')
oldPinInput.addEventListener('keyup', () => {oldPin = oldPinInput.value})
const newPinInput = document.querySelector('#newPin')
newPinInput.addEventListener('keyup', () => {newPin = newPinInput.value})
const confirmPinInput = document.querySelector('#confirmPin')
confirmPinInput.addEventListener('keyup', () => {confirmPin = confirmPinInput.value})



const saveProfile = document.querySelector('#saveProfile')
const savePass = document.querySelector('#savePass')
const savePin = document.querySelector('#savePin')

saveProfile.addEventListener('click', () => {
    let nameHolder = nameProfile.split(' ')
    let nameCount = Math.ceil(nameHolder.length / 2)
    let state = []
    for (let i = 0; i < nameCount; i++) {
        state.push(nameHolder[i])
    }
    userRequest.firstName = state.join(" ")
    state = []
    if (nameCount === nameHolder.length) {
        userRequest.lastName = ''
    } else {
        for (let i = nameCount; i < nameHolder.length; i++) {
            state.push(nameHolder[i])
        }
        userRequest.lastName = state.join(" ")
    }
    userRequest.profilePic = photoUpload
    localStorage.setItem('user', JSON.stringify(userRequest))
    console.log(userRequest)
})

savePass.addEventListener('click', () => {
    if(oldPass == userRequest.password && newPass == confirmPass && newPass !== ''){
        userRequest.password = newPass
        localStorage.setItem('user', JSON.stringify(userRequest))
        oldPassInput.value = ''
        newPassInput.value = ''
        confirmPassInput.value = ''
    }
})
savePin.addEventListener('click', () => {
    if(oldPin == userRequest.pin && newPin == confirmPin && newPin !== ''){
        userRequest.pin = newPin
        localStorage.setItem('user', JSON.stringify(userRequest))
        oldPinInput.value = ''
        newPinInput.value = ''
        confirmPinInput.value = ''
    }
})

const profileImg = document.querySelector('.profile__image')
updateImage()
function updateImage(){
    profileImg.style.backgroundImage = `url(${photoUpload})`;
    profileImg.style.backgroundPosition = 'center';
    profileImg.style.backgroundSize = 'cover';
}
