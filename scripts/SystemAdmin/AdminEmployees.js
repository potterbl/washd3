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

const buttonEmployees = document.querySelector('#buttonEmployees')
const buttonGroups = document.querySelector('#buttonGroups')
const buttonMS = document.querySelector('#buttonMS')
const buttonFS = document.querySelector('#buttonFS')
const buttonToD = document.querySelector('#buttonToD')
const buttonSL = document.querySelector('#buttonSL')
const buttonRutines = document.querySelector('#buttonRutines')

const mobileScanner = document.querySelector('.mobile__scanners')
const fixedScanner = document.querySelector('.fixed__scanners')
const tODeviations = document.querySelector('.tod')
const sortingLocation = document.querySelector('.sorting__locations')

const buttonAdd = document.querySelector('#buttonAdd')
const textHeading = document.querySelector('.wrapper__header p')
const contentSection = document.querySelector('.content__section')

const dialog = document.querySelector('.dialog')
const dialogContent = document.querySelector('.dialog__content')


employeesPage()

buttonEmployees.addEventListener('click', (e) => {
    employeesPage()
    const contentWrapper = document.querySelector('.content__inner .content__wrapper')
    const contentInner = document.querySelector('.content__inner')

    contentInner.style = ''
    contentWrapper.style = ''
})
buttonGroups.addEventListener('click', (e) => {
    groupsPage()
    const contentWrapper = document.querySelector('.content__inner .content__wrapper')
    const contentInner = document.querySelector('.content__inner')

    contentInner.style = ''
    contentWrapper.style = ''
})
buttonMS.addEventListener('click', (e) => {
    mobileScannerPage()
    const contentWrapper = document.querySelector('.content__inner .content__wrapper')
    const contentInner = document.querySelector('.content__inner')

    contentInner.style = ''
    contentWrapper.style = ''
})
buttonFS.addEventListener('click', (e) => {
    fixedScannerPage()
    const contentWrapper = document.querySelector('.content__inner .content__wrapper')
    const contentInner = document.querySelector('.content__inner')

    contentInner.style = ''
    contentWrapper.style = ''
})
buttonToD.addEventListener('click', (e) => {
    todPage()
    const contentWrapper = document.querySelector('.content__inner .content__wrapper')
    const contentInner = document.querySelector('.content__inner')

    contentInner.style = ''
    contentWrapper.style = ''
})
buttonSL.addEventListener('click', (e) => {
    sortingLocationsPage()
    const contentWrapper = document.querySelector('.content__inner .content__wrapper')
    const contentInner = document.querySelector('.content__inner')

    contentInner.style = ''
    contentWrapper.style = ''
})
buttonRutines.addEventListener('click', (e) => {
    rutinesPage()
})

function showRutines(){
    const rutines = document.querySelector('.rutines')
    const contentWrapper = document.querySelector('.content__inner .content__wrapper')
    const contentInner = document.querySelector('.content__inner')

    contentInner.style = 'justify-content: unset'
    contentWrapper.style.display = 'none'
    rutines.style = ''
}
function hideRutines() {
    const rutines = document.querySelector('.rutines')
    const contentWrapper = document.querySelector('.content__inner .content__wrapper')
    const contentInner = document.querySelector('.content__inner')

    contentInner.style = ''
    contentWrapper.style = ''
    rutines.style.display = 'none'
}

function hideButtonAdd(){
    buttonAdd.style.display = 'none'
}

function showButtonAdd(){
    buttonAdd.style = ''
}
function closeDialog(e){
    if (e.target !== dialog) {
        return;
    }
    dialogContent.innerHTML = '';
    dialog.style = 'display: none';
}
dialog.addEventListener('click', closeDialog)
function employeesPage() {
    hideRutines()
    showButtonAdd()

    buttonAdd.innerText = 'Add Employee'
    textHeading.innerText = 'All Employees'

    const employeesQuery = JSON.parse(localStorage.getItem('employeers'))

    buttonEmployees.classList.add('page_active')
    buttonGroups.classList.remove('page_active')
    buttonMS.classList.remove('page_active')
    buttonFS.classList.remove('page_active')
    buttonToD.classList.remove('page_active')
    buttonSL.classList.remove('page_active')
    buttonRutines.classList.remove('page_active')
    let employeesPageCount = Math.ceil(employeesQuery.length / 10)
    let pageNumber = 1


    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        employeesPageCount = Math.ceil(employeesQuery.length / 20)
        updateButtons()
        updateListEmployees()
    })

    const buttonPagePrev = document.querySelector('#prevPage')
    const buttonPageNext = document.querySelector('#nextPage')

    buttonPagePrev.addEventListener('click', () => {
        pageNumber--
        updateButtons()
        updateListEmployees()
    })
    buttonPageNext.addEventListener('click', () => {
        pageNumber++
        updateButtons()
        updateListEmployees()
    })

    let buttonPagesArray = []
    updateButtons()
    function updateButtons() {
        const buttonPages = document.querySelector('.button__pages')

        buttonPages.innerHTML = ''
        for(let i = 0; i < employeesPageCount; i++){
            buttonPages.innerHTML +=
                `
        <button id="changePage${i}">${i + 1}</button>
        `
        }
        for(let i = 0; i < employeesPageCount; i++){
            buttonPagesArray[i] = document.querySelector(`#changePage${i}`)
            buttonPagesArray[i].classList.remove('current__page')
            buttonPagesArray[i].addEventListener('click', () => {
                pageNumber = i + 1
                updateButtons()
                updateListEmployees()
            })
        }
        if(buttonPagesArray.length){
            buttonPagesArray[pageNumber - 1].classList.add('current__page')
        }

        if(pageNumber <= 1){
            buttonPagePrev.disabled = true
        } else {
            buttonPagePrev.disabled = false
        }
        if(pageNumber >= employeesPageCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }

    updateListEmployees()
    let emailUsername = ''
    let fullName = ''
    let setPin = ''
    let confirmPin = ''
    let password = ''
    let confirmPass = ''
    let mustChangePass = false
    let cantChangePass = false
    function updateListEmployees() {
        const employeesQuery = JSON.parse(localStorage.getItem('employeers'))
        contentSection.innerHTML =
            `
    <div class="row__header">
        <div class="mail">
            <p>Email/Username</p>
        </div>
        <div class="full__name">
            <p>Full Name</p>
        </div>
        <div class="created__by">
            <p>User Created by</p>
        </div>
        <div class="change__pass">
            <p>Change Password</p>
        </div>
        <div class="edit">
            <p>Edit</p>
        </div>
        <div class="reset__pass">
            <p>Reset Password</p>
        </div>
        <div class="reset__pin">
            <p>Reset PIN</p>
        </div>
        <div class="delete">
            <p>Delete</p>
        </div>
    </div>
    `
        for (let i = 0; i < employeesQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
            <div class="row__content">
              <div class="mail">
                  <p>${employeesQuery[i].mailUser}</p>
              </div>
              <div class="full__name">
                  <p>${employeesQuery[i].fullName}</p>
              </div>
              <div class="created__by">
                  <p>${employeesQuery[i].createdBy}</p>
              </div>
              <div class="change__pass">
                  <p>${employeesQuery[i].canChangePass ? 'Yes' : 'No'}</p>
              </div>
              <div class="edit">
                  <img src="../../src/SystemAdmin/Edit.png" alt="" id="editEmployee${employeesQuery[i].id}">
              </div>
              <div class="reset__pass">
                  <img src="../../src/SystemAdmin/ResetPass.png" alt="" id="resetPassEmployee${employeesQuery[i].id}">
              </div>
              <div class="reset__pin">
                  <img src="../../src/SystemAdmin/ResetPin.png" alt="" id="resetPinEmployee${employeesQuery[i].id}">
              </div>
              <div class="delete">
                  <img src="../../src/SystemAdmin/Delete.png" alt="" id="${employeesQuery[i].id}">
              </div>
            </div>
               `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const employeeId = event.target.id;
                const index = employeesQuery.findIndex(employee => employee.id == employeeId);
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Deleted employee ${employeesQuery[index].mailUser}`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
                employeesQuery.splice(index, 1);
                localStorage.setItem('employeers', JSON.stringify(employeesQuery));
                employeesPage()
            })
        });
        const editButtons = document.querySelectorAll('.edit img');
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const employeeId = event.target.id.slice(12);
                const index = employeesQuery.findIndex(employee => employee.id == employeeId);
                dialog.style = 'display: flex'
                dialogContent.innerHTML =
                    `
                    <div class="edit_employee">
                        <h2>Edit ${employeesQuery[index].mailUser}</h2>
                        <div class="form__edit__employee">
                            <div class="input__wrapper">
                                <input type="text" id="emailUsername">
                                <p>Email / Username</p>
                            </div>
                            <div class="input__wrapper">
                                <input type="text" id="fullName">
                                <p>Full Name</p>
                            </div>
                            <div class="input__wrapper">
                                <input type="text" id="setPin">
                                <p>Set PIN</p>
                            </div>
                            <div class="input__wrapper">
                                <input type="text" id="confirmPin">
                                <p>Confirm PIN</p>
                            </div>
                            <div class="input__wrapper">
                                <input type="text" id="password">
                                <p>Password</p>
                            </div>
                            <div class="input__wrapper">
                                <input type="text" id="confirmPass">
                                <p>Confirm Password</p>
                            </div>
                            <div class="checkbox__wrapper">
                                <input type="checkbox" id="mustChangePass">
                                <p>Must change password</p>
                            </div>
                            <div class="checkbox__wrapper">
                                <input type="checkbox" id="cantChangePass">
                                <p>Can't change password</p>
                            </div>
                        </div>
                        <button id="save">Save</button>
                    </div>
                    `
                let emailUsernameInput = document.querySelector('#emailUsername')
                emailUsernameInput.addEventListener('input', () => {
                    emailUsername = emailUsernameInput.value
                })
                let fullNameInput = document.querySelector('#fullName')
                fullNameInput.addEventListener('input', () => {
                    fullName = fullNameInput.value
                })
                let setPinInput = document.querySelector('#setPin')
                setPinInput.addEventListener('input', () => {
                    setPin = setPinInput.value
                })
                let confirmPinInput = document.querySelector('#confirmPin')
                confirmPinInput.addEventListener('input', () => {
                    confirmPin = confirmPinInput.value
                })
                let passwordInput = document.querySelector('#password')
                passwordInput.addEventListener('input', () => {
                    password = passwordInput.value
                })
                let confirmPassInput = document.querySelector('#confirmPass')
                confirmPassInput.addEventListener('input', () => {
                    confirmPass = confirmPassInput.value
                })
                let mustChangePassInput = document.querySelector('#mustChangePass');
                mustChangePassInput.addEventListener('change', () => {
                    mustChangePass = mustChangePassInput.checked;
                });
                let cantChangePassInput = document.querySelector('#cantChangePass');
                cantChangePassInput.addEventListener('change', () => {
                    cantChangePass = cantChangePassInput.checked;
                });
                const buttonSave = document.querySelector('#save')
                buttonSave.addEventListener('click', (e) => {
                    const userQuery = JSON.parse(localStorage.getItem('user'))
                    const employeesQuery = JSON.parse(localStorage.getItem('employeers'))
                    let id = employeesQuery.length
                    employeesQuery.forEach(el => {
                        if(id == el.id){
                            id++
                        }
                    })
                    const editEmployee = {
                        id: id,
                        mailUser: emailUsername,
                        fullName: fullName,
                        createdBy: `${userQuery.firstName} ${userQuery.lastName}`,
                        canChangePass: !cantChangePass,
                        mustChangePass: mustChangePass,
                        pin: setPin,
                        password: password,
                    }
                    if(password == confirmPass && setPin == confirmPin && password !== '' && setPin !== ''){
                        employeesQuery[index] = editEmployee
                        localStorage.setItem('employeers', JSON.stringify(employeesQuery))
                        updateListEmployees()
                        dialogContent.innerHTML = '';
                        dialog.style = 'display: none';
                    }
                    const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0');
                    const day = String(now.getDate()).padStart(2, '0');
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');

                    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    const newLog = {
                        id: systemLogQuery.length,
                        securityLevel: 'None',
                        severity: 'Low',
                        action: `Edited employee ${employeesQuery[index].mailUser}`,
                        description: '-',
                        emailUsername: 'Admin',
                        time: formattedDate,
                    }
                    systemLogQuery.push(newLog)
                    localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
                })

            })
        });
        const resetPassButtons = document.querySelectorAll('.reset__pass img');
        resetPassButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const employeeId = event.target.id.slice(17);
                const index = employeesQuery.findIndex(employee => employee.id == employeeId);
                dialog.style = 'display: flex'
                dialogContent.innerHTML =
                    `
                        <div class="input__wrapper">
                            <input type="text" id="password">
                            <p>Enter Password</p>
                        </div>
                        <div class="input__wrapper">
                            <input type="text" id="confirmPass">
                            <p>Confirm Password</p>
                        </div>
                        <button id="save">Save</button>
                        `
                let passwordInput = document.querySelector('#password')
                passwordInput.addEventListener('input', () => {
                    password = passwordInput.value
                })
                let confirmPassInput = document.querySelector('#confirmPass')
                confirmPassInput.addEventListener('input', () => {
                    confirmPass = confirmPassInput.value
                })
                let buttonSave = document.querySelector('#save')
                buttonSave.addEventListener('click', () => {
                    if(password === confirmPass && password !== ''){
                        employeesQuery[index].password = password
                        localStorage.setItem('employeers', JSON.stringify(employeesQuery))
                        updateListEmployees()
                        dialogContent.innerHTML = '';
                        dialog.style = 'display: none';
                    }
                    const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0');
                    const day = String(now.getDate()).padStart(2, '0');
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');

                    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    const newLog = {
                        id: systemLogQuery.length,
                        securityLevel: 'None',
                        severity: 'Low',
                        action: `Edited employee password ${employeesQuery[index].mailUser}`,
                        description: '-',
                        emailUsername: 'Admin',
                        time: formattedDate,
                    }
                    systemLogQuery.push(newLog)
                    localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
                })
            })
        })
        const resetPinButtons = document.querySelectorAll('.reset__pin img');
        resetPinButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const employeeId = event.target.id.slice(17);
                const index = employeesQuery.findIndex(employee => employee.id == employeeId);
                dialog.style = 'display: flex'
                dialogContent.innerHTML =
                    `
                        <h2>Reset PIN ${employeesQuery[index].mailUser}</h2>
                        <div class="input__wrapper" style="width: 100%">
                            <input type="text" id="pin" style="width: 100%">
                            <p>Enter PIN</p>
                        </div>
                        <div class="input__wrapper" style="width: 100%">
                            <input type="text" id="confirmPin" style="width: 100%">
                            <p>Confirm PIN</p>
                        </div>
                        <button id="save">Save</button>
                        `
                let pinInput = document.querySelector('#pin')
                pinInput.addEventListener('input', () => {
                    setPin = pinInput.value
                })
                let confirmPinInput = document.querySelector('#confirmPin')
                confirmPinInput.addEventListener('input', () => {
                    confirmPin = confirmPinInput.value
                })
                let buttonSave = document.querySelector('#save')
                buttonSave.addEventListener('click', () => {
                    if(setPin === confirmPin && setPin !== ''){
                        employeesQuery[index].pin = setPin
                        localStorage.setItem('employeers', JSON.stringify(employeesQuery))
                        updateListEmployees()
                        dialogContent.innerHTML = '';
                        dialog.style = 'display: none';
                    }
                    const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0');
                    const day = String(now.getDate()).padStart(2, '0');
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');

                    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    const newLog = {
                        id: systemLogQuery.length,
                        securityLevel: 'None',
                        severity: 'Low',
                        action: `Edited employee pin ${employeesQuery[index].mailUser}`,
                        description: '-',
                        emailUsername: 'Admin',
                        time: formattedDate,
                    }
                    systemLogQuery.push(newLog)
                    localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
                })
            })
        })
    }

    buttonAdd.addEventListener('click', showAddEmployee)
    function showAddEmployee() {
        dialog.style = 'display: flex'
        dialogContent.innerHTML =
            `
            <div class="add_employee">
                <h2>Add Employee</h2>
                <div class="form__add__employee">
                    <div class="input__wrapper">
                        <input type="text" id="emailUsername">
                        <p>Email / Username</p>
                    </div>
                    <div class="input__wrapper">
                        <input type="text" id="fullName">
                        <p>Full Name</p>
                    </div>
                    <div class="input__wrapper">
                        <input type="text" id="setPin">
                        <p>Set PIN</p>
                    </div>
                    <div class="input__wrapper">
                        <input type="text" id="confirmPin">
                        <p>Confirm PIN</p>
                    </div>
                    <div class="input__wrapper">
                        <input type="text" id="password">
                        <p>Password</p>
                    </div>
                    <div class="input__wrapper">
                        <input type="text" id="confirmPass">
                        <p>Confirm Password</p>
                    </div>
                    <div class="checkbox__wrapper">
                        <input type="checkbox" id="mustChangePass">
                        <p>Must change password</p>
                    </div>
                    <div class="checkbox__wrapper">
                        <input type="checkbox" id="cantChangePass">
                        <p>Can't change password</p>
                    </div>
                </div>
                <button id="save">Save</button>
            </div>
            `
        let emailUsernameInput = document.querySelector('#emailUsername')
        emailUsernameInput.addEventListener('input', () => {
            emailUsername = emailUsernameInput.value
        })
        let fullNameInput = document.querySelector('#fullName')
        fullNameInput.addEventListener('input', () => {
            fullName = fullNameInput.value
        })
        let setPinInput = document.querySelector('#setPin')
        setPinInput.addEventListener('input', () => {
            setPin = setPinInput.value
        })
        let confirmPinInput = document.querySelector('#confirmPin')
        confirmPinInput.addEventListener('input', () => {
            confirmPin = confirmPinInput.value
        })
        let passwordInput = document.querySelector('#password')
        passwordInput.addEventListener('input', () => {
            password = passwordInput.value
        })
        let confirmPassInput = document.querySelector('#confirmPass')
        confirmPassInput.addEventListener('input', () => {
            confirmPass = confirmPassInput.value
        })
        let mustChangePassInput = document.querySelector('#mustChangePass');
        mustChangePassInput.addEventListener('change', () => {
            mustChangePass = mustChangePassInput.checked;
        });
        let cantChangePassInput = document.querySelector('#cantChangePass');
        cantChangePassInput.addEventListener('change', () => {
            cantChangePass = cantChangePassInput.checked;
        });
        const buttonSave = document.querySelector('#save')
        buttonSave.addEventListener('click', (e) => {
            const userQuery = JSON.parse(localStorage.getItem('user'))
            const employeesQuery = JSON.parse(localStorage.getItem('employeers'))
            let id = employeesQuery.length
            employeesQuery.forEach(el => {
                if(id == el.id){
                    id++
                }
            })
            const newEmployee = {
                id: id,
                mailUser: emailUsername,
                fullName: fullName,
                createdBy: `${userQuery.firstName} ${userQuery.lastName}`,
                canChangePass: !cantChangePass,
                mustChangePass: mustChangePass,
                pin: setPin,
                password: password,
            }
            if(password == confirmPass && setPin == confirmPin && password !== '' && setPin !== ''){
                employeesQuery.unshift(newEmployee)
                localStorage.setItem('employeers', JSON.stringify(employeesQuery))
                updateListEmployees()
                dialogContent.innerHTML = '';
                dialog.style = 'display: none';
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Added employee`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
            }
        })
    }
}

function groupsPage() {
    hideRutines()
    showButtonAdd()

    buttonAdd.innerText = 'Add Group'
    textHeading.innerText = 'All Groups'

    const groupsQuery = JSON.parse(localStorage.getItem('groups'))

    buttonEmployees.classList.remove('page_active')
    buttonGroups.classList.add('page_active')
    buttonMS.classList.remove('page_active')
    buttonFS.classList.remove('page_active')
    buttonToD.classList.remove('page_active')
    buttonSL.classList.remove('page_active')
    buttonRutines.classList.remove('page_active')
    let groupsPageCount = Math.ceil(groupsQuery.length / 10)
    let pageNumber = 1

    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        groupsPageCount = Math.ceil(groupsQuery.length / 20)
        updateButtons()
        updateListGroups()
    })

    const buttonPagePrev = document.querySelector('#prevPage')
    const buttonPageNext = document.querySelector('#nextPage')

    buttonPagePrev.addEventListener('click', () => {
        pageNumber--
        updateButtons()
        updateListGroups()
    })
    buttonPageNext.addEventListener('click', () => {
        pageNumber++
        updateButtons()
        updateListGroups()
    })
    let buttonPagesArray = []
    updateButtons()
    function updateButtons() {
        const buttonPages = document.querySelector('.button__pages')
        buttonPages.innerHTML = ''
        for(let i = 0; i < groupsPageCount; i++){
            buttonPages.innerHTML +=
                `
        <button id="changePage${i}">${i + 1}</button>
        `
        }
        for(let i = 0; i < groupsPageCount; i++){
            buttonPagesArray[i] = document.querySelector(`#changePage${i}`)
            buttonPagesArray[i].classList.remove('current__page')
            buttonPagesArray[i].addEventListener('click', () => {
                pageNumber = i + 1
                updateButtons()
                updateListGroups()
            })
        }
        if(buttonPagesArray.length){
            buttonPagesArray[pageNumber - 1].classList.add('current__page')
        }

        if(pageNumber <= 1){
            buttonPagePrev.disabled = true
        } else {
            buttonPagePrev.disabled = false
        }
        if(pageNumber >= groupsPageCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateListGroups()
    function updateListGroups() {
        const groupsQuery = JSON.parse(localStorage.getItem('groups'))
        contentSection.innerHTML =
            `
        <div class="row__header">
                            <div class="group__name">
                                <p>Name</p>
                            </div>
                            <div class="group__description">
                                <p>Description</p>
                            </div>
                            <div class="system__group">
                                <p>Systemgroup</p>
                            </div>
                            <div class="edit">
                                <p>Edit</p>
                            </div>
                            <div class="delete">
                                <p>Delete</p>
                            </div>
                        </div>
        `
        for (let i = 0; i < groupsQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="group__name">
                                <p>${groupsQuery[i].name}</p>
                            </div>
                            <div class="group__description">
                                <p>${groupsQuery[i].description}</p>
                            </div>
                            <div class="system__group">
                                <p>${groupsQuery[i].systemGroup ? 'Yes' : 'No'}</p>
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="editGroup${groupsQuery[i].id}">
                            </div>
                            <div class="delete">
                                ${groupsQuery[i].systemGroup ? 'No' : `<img src="../../src/SystemAdmin/Delete.png" alt="" id="${groupsQuery[i].id}"/>`}
                            </div>
                        </div>
                    `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const groupId = event.target.id;
                const index = groupsQuery.findIndex(group => group.id == groupId);
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Deleted group ${groupsQuery[index].name}`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
                groupsQuery.splice(index, 1);
                localStorage.setItem('groups', JSON.stringify(groupsQuery));
                groupsPage()
            })
        });
        let name = ''
        let description = ''
        buttonAdd.addEventListener('click', () => {
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Add Group</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input class="big" type="text" id="description">
                                    <p>Description</p>
                                </div>
                                <div class="select__wrapper">
                                    <select>
                                        <option value="">Option 1</option>
                                        <option value="">Option 2</option>
                                        <option default hidden value="Nothing">Nothing</option>
                                    </select>
                                    <p>Action after save</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
            let nameInput = document.querySelector('#name')
            nameInput.addEventListener('input', () => {name = nameInput.value})
            let descriptionInput = document.querySelector('#description')
            descriptionInput.addEventListener('input', () => {description = descriptionInput.value})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                let id = groupsQuery.length
                groupsQuery.forEach(el => {
                    if(id == el.id){
                        id++
                    }
                })
                const newGroup = {
                    id: id,
                    name: name,
                    description: description,
                }
                groupsQuery.unshift(newGroup)
                localStorage.setItem('groups', JSON.stringify(groupsQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                groupsPage()
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Added group`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
            })

        })
        const editButtons = document.querySelectorAll('.edit img');
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const groupId = event.target.id.slice(9);
                const index = groupsQuery.findIndex(group => group.id == groupId);
                dialog.style.display = 'flex'
                dialogContent.innerHTML =
                    `
                        <div class="add__form">
                            <h2>Edit ${groupsQuery[index].name}</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input class="big" type="text" id="description">
                                    <p>Description</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
                let nameInput = document.querySelector('#name')
                nameInput.addEventListener('input', () => {name = nameInput.value})
                let descriptionInput = document.querySelector('#description')
                descriptionInput.addEventListener('input', () => {description = descriptionInput.value})
                const saveButton = document.querySelector('#save')
                saveButton.addEventListener('click', () => {
                    groupsQuery[index].name = name
                    groupsQuery[index].description = description
                    localStorage.setItem('groups', JSON.stringify(groupsQuery))
                    dialog.style.display = 'none'
                    dialogContent.innerHTML = ''
                    groupsPage()
                    const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0');
                    const day = String(now.getDate()).padStart(2, '0');
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');

                    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    const newLog = {
                        id: systemLogQuery.length,
                        securityLevel: 'None',
                        severity: 'Low',
                        action: `Edited group ${groupsQuery[index].name}`,
                        description: '-',
                        emailUsername: 'Admin',
                        time: formattedDate,
                    }
                    systemLogQuery.push(newLog)
                    localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
                })
            })
        });
    }

}
function mobileScannerPage() {
    hideRutines()
    showButtonAdd()

    buttonAdd.innerText = 'Add Scanner'
    textHeading.innerText = 'All Mobile Scanners'

    const mobileScannersQuery = JSON.parse(localStorage.getItem('mobileScanners'))

    buttonEmployees.classList.remove('page_active')
    buttonGroups.classList.remove('page_active')
    buttonMS.classList.add('page_active')
    buttonFS.classList.remove('page_active')
    buttonToD.classList.remove('page_active')
    buttonSL.classList.remove('page_active')
    buttonRutines.classList.remove('page_active')
    let mobileScannersQueryCount = Math.ceil(mobileScannersQuery.length / 10)
    let pageNumber = 1

    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        mobileScannersQueryCount = Math.ceil(mobileScannersQuery.length / 20)
        updateButtons()
        updateListMS()
    })

    const buttonPagePrev = document.querySelector('#prevPage')
    const buttonPageNext = document.querySelector('#nextPage')

    buttonPagePrev.addEventListener('click', () => {
        pageNumber--
        updateButtons()
        updateListMS()
    })
    buttonPageNext.addEventListener('click', () => {
        pageNumber++
        updateButtons()
        updateListMS()
    })
    let buttonPagesArray = []
    updateButtons()
    function updateButtons() {
        const buttonPages = document.querySelector('.button__pages')
        buttonPages.innerHTML = ''
        for(let i = 0; i < mobileScannersQueryCount; i++){
            buttonPages.innerHTML +=
                `
        <button id="changePage${i}">${i + 1}</button>
        `
        }
        for(let i = 0; i < mobileScannersQueryCount; i++){
            buttonPagesArray[i] = document.querySelector(`#changePage${i}`)
            buttonPagesArray[i].classList.remove('current__page')
            buttonPagesArray[i].addEventListener('click', () => {
                pageNumber = i + 1
                updateButtons()
                updateListMS()
            })
        }
        if(buttonPagesArray.length){
            buttonPagesArray[pageNumber - 1].classList.add('current__page')
        }

        if(pageNumber <= 1){
            buttonPagePrev.disabled = true
        } else {
            buttonPagePrev.disabled = false
        }
        if(pageNumber >= mobileScannersQueryCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateListMS()
    function updateListMS() {
        const mobileScannersQuery = JSON.parse(localStorage.getItem('mobileScanners'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="ms__name">
                                <p>Name</p>
                            </div>
                            <div class="ms__id">
                                <p>Id</p>
                            </div>
                            <div class="ms__last__online">
                                <p>Last Online</p>
                            </div>
                            <div class="ms__time__inactive">
                                <p>Time Inactive</p>
                            </div>
                            <div class="ms__signed__in">
                                <p>Signed In</p>
                            </div>
                            <div class="ms__user__signed_in">
                                <p>User Signed In</p>
                            </div>
                            <div class="ms__control__device">
                                <p>Control device</p>
                            </div>
                            <div class="edit">
                                <p>Edit</p>
                            </div>
                            <div class="delete">
                                <p>Delete</p>
                            </div>
                        </div>
            `
        for (let i = 0; i < mobileScannersQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="ms__name">
                                <p>${mobileScannersQuery[i].name}</p>
                            </div>
                            <div class="ms__id">
                                <p>${mobileScannersQuery[i].id}</p>
                            </div>
                            <div class="ms__last__online">
                                <p>${mobileScannersQuery[i].lastOnline}</p>
                            </div>
                            <div class="ms__time__inactive">
                                <p>${mobileScannersQuery[i].timeIncactive}</p>
                            </div>
                            <div class="ms__signed__in">
                                <p>${mobileScannersQuery[i].signedIn}</p>
                            </div>
                            <div class="ms__user__signed_in">
                                <p>${mobileScannersQuery[i].userSignedIn}</p>
                            </div>
                            <div class="ms__control__device">
                                <img src="../../src/SystemAdmin/ControlDevice.png" alt="" id="controlDeviceMS${mobileScannersQuery[i].id}">
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="editMS${mobileScannersQuery[i].id}">
                            </div>
                            <div class="delete">
                                <img src="../../src/SystemAdmin/Delete.png" alt="" id="${mobileScannersQuery[i].id}">
                            </div>    
                        </div>
                    `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const msId = event.target.id;
                const index = mobileScannersQuery.findIndex(ms => ms.id == msId);
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Deleted mobile scanner ${mobileScannersQuery[index].name}`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
                mobileScannersQuery.splice(index, 1);
                localStorage.setItem('mobileScanners', JSON.stringify(mobileScannersQuery));
                mobileScannerPage()
            })
        });
        let name = ''
        let scannerId = 0
        buttonAdd.addEventListener('click', () => {
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Add Scanner</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Scanner Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input class="big" type="text" id="scannerId">
                                    <p>Scanner ID</p>
                                </div>
                                <div class="select__wrapper">
                                    <select>
                                        <option value="">Option 1</option>
                                        <option value="">Option 2</option>
                                        <option default hidden value="Nothing">Nothing</option>
                                    </select>
                                    <p>Action after save</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
            let nameInput = document.querySelector('#name')
            nameInput.addEventListener('input', () => {name = nameInput.value})
            let scannerIdInput = document.querySelector('#scannerId')
            scannerIdInput.addEventListener('input', () => {scannerId = scannerIdInput.value})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                const newScanner = {
                    id: scannerId,
                    name: name,
                    lastOnline: '-',
                    timeIncactive: '-',
                    signedIn: false,
                    userSignedIn: false,
                }
                mobileScannersQuery.unshift(newScanner)
                localStorage.setItem('mobileScanners', JSON.stringify(mobileScannersQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                mobileScannerPage()
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Added mobile scanner`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
            })

        })
        const editButtons = document.querySelectorAll('.edit img');
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const mobileScannerId = event.target.id.slice(6);
                const index = mobileScannersQuery.findIndex(mobileScanner => mobileScanner.id == mobileScannerId);
                dialog.style.display = 'flex'
                dialogContent.innerHTML =
                    `
                        <div class="add__form">
                            <h2>Edit ${mobileScannersQuery[index].name}</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input class="big" type="text" id="scannerId">
                                    <p>Scanner ID</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
                let nameInput = document.querySelector('#name')
                nameInput.addEventListener('input', () => {name = nameInput.value})
                let scannerIdInput = document.querySelector('#scannerId')
                scannerIdInput.addEventListener('input', () => {scannerId = scannerIdInput.value})
                const saveButton = document.querySelector('#save')
                saveButton.addEventListener('click', () => {
                    mobileScannersQuery[index].name = name
                    mobileScannersQuery[index].id = scannerId
                    localStorage.setItem('mobileScanners', JSON.stringify(mobileScannersQuery))
                    dialog.style.display = 'none'
                    dialogContent.innerHTML = ''
                    mobileScannerPage()
                    const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0');
                    const day = String(now.getDate()).padStart(2, '0');
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');

                    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    const newLog = {
                        id: systemLogQuery.length,
                        securityLevel: 'None',
                        severity: 'Low',
                        action: `Edited mobile scanner ${mobileScannersQuery[index].name}`,
                        description: '-',
                        emailUsername: 'Admin',
                        time: formattedDate,
                    }
                    systemLogQuery.push(newLog)
                    localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
                })
            })
        });
    }
}
function fixedScannerPage() {
    hideRutines()
    hideButtonAdd()

    textHeading.innerText = 'All Fixed Scanners'

    const fixedScannersQuery = JSON.parse(localStorage.getItem('fixedScanners'))

    buttonEmployees.classList.remove('page_active')
    buttonGroups.classList.remove('page_active')
    buttonMS.classList.remove('page_active')
    buttonFS.classList.add('page_active')
    buttonToD.classList.remove('page_active')
    buttonSL.classList.remove('page_active')
    buttonRutines.classList.remove('page_active')
    let fixedScannersQueryCount = Math.ceil(fixedScannersQuery.length / 10)
    let pageNumber = 1

    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        fixedScannersQueryCount = Math.ceil(fixedScannersQuery.length / 20)
        updateButtons()
        updateListFS()
    })

    const buttonPagePrev = document.querySelector('#prevPage')
    const buttonPageNext = document.querySelector('#nextPage')

    buttonPagePrev.addEventListener('click', () => {
        pageNumber--
        updateButtons()
        updateListFS()
    })
    buttonPageNext.addEventListener('click', () => {
        pageNumber++
        updateButtons()
        updateListFS()
    })
    let buttonPagesArray = []
    updateButtons()
    function updateButtons() {
        const buttonPages = document.querySelector('.button__pages')
        buttonPages.innerHTML = ''
        for(let i = 0; i < fixedScannersQueryCount; i++){
            buttonPages.innerHTML +=
                `
        <button id="changePage${i}">${i + 1}</button>
        `
        }
        for(let i = 0; i < fixedScannersQueryCount; i++){
            buttonPagesArray[i] = document.querySelector(`#changePage${i}`)
            buttonPagesArray[i].classList.remove('current__page')
            buttonPagesArray[i].addEventListener('click', () => {
                pageNumber = i + 1
                updateButtons()
                updateListFS()
            })
        }
        if(buttonPagesArray.length){
            buttonPagesArray[pageNumber - 1].classList.add('current__page')
        }

        if(pageNumber <= 1){
            buttonPagePrev.disabled = true
        } else {
            buttonPagePrev.disabled = false
        }
        if(pageNumber >= fixedScannersQueryCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateListFS()
    function updateListFS() {
        const fixedScannersQuery = JSON.parse(localStorage.getItem('fixedScanners'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="fs__display__name">
                                <p>Display Name</p>
                            </div>
                            <div class="fs__system__name">
                                <p>System Name</p>
                            </div>
                            <div class="fs__location">
                                <p>Location</p>
                            </div>
                            <div class="fs__location">
                                <p>Last online</p>
                            </div>
                            <div class="fs__activated">
                                <p>Activated</p>
                            </div>
                            <div class="fs__scanning__now">
                                <p>Scanning Now</p>
                            </div>
                            <div class="fs__function">
                                <p>Function</p>
                            </div>
                            <div class="fs__login__required">
                                <p>Login Required</p>
                            </div>
                            <div class="fs__signed__in">
                                <p>Signed In</p>
                            </div>
                            <div class="fs__control__panel">
                                <p>Control Panel</p>
                            </div>
                            <div class="edit">
                                <p>Edit</p>
                            </div>
                        </div>
            `
        for (let i = 0; i < fixedScannersQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="fs__display__name">
                                <p>${fixedScannersQuery[i].name}</p>
                            </div>
                            <div class="fs__system__name">
                                <p>${fixedScannersQuery[i].systemName}</p>
                            </div>
                            <div class="fs__location">
                                <p>${fixedScannersQuery[i].location}</p>
                            </div>
                            <div class="fs__last__online">
                                <p>${fixedScannersQuery[i].lastOnline}</p>
                            </div>
                            <div class="fs__activated">
                                <p>${fixedScannersQuery[i].activated ? 'Yes' : 'No'}</p>
                            </div>
                            <div class="fs__scanning__now">
                                <p>${fixedScannersQuery[i].scanningNow ? 'Yes' : 'No'}</p>
                            </div>
                            <div class="fs__function">
                                <p>${fixedScannersQuery[i].function}</p>
                            </div>
                            <div class="fs__login__required">
                                <p>${fixedScannersQuery[i].loginRequired ? 'Yes' : 'No'}</p>
                            </div>
                            <div class="fs__signed__in">
                                <p>${fixedScannersQuery[i].signedIn === 0 ? 'None' : fixedScannersQuery[i].signedIn}</p>
                            </div>
                            <div class="fs__control__panel">
                                <img src="../../src/SystemAdmin/ControlDevice.png" alt="" id="controlDeviceFS${fixedScannersQuery[i].id}">
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="editFixedScan${fixedScannersQuery[i].id}">
                            </div>
                        </div>
                    `
            }
        }

    }
    let name = ''
    let location = ''
    let scannerId = ''
    buttonAdd.addEventListener('click', () => {
        dialog.style.display = 'flex'
        dialogContent.innerHTML =
            `
                        <div class="add__form">
                            <h2>Add Scanner</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Scanner Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input class="big" type="text" id="scannerId">
                                    <p>Scanner ID</p>
                                </div>
                                <div class="select__wrapper">
                                    <select>
                                        <option value="">Option 1</option>
                                        <option value="">Option 2</option>
                                        <option default hidden value="Nothing">Nothing</option>
                                    </select>
                                    <p>Action after save</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
        let nameInput = document.querySelector('#name')
        nameInput.addEventListener('input', () => {name = nameInput.value})
        let scannerIdInput = document.querySelector('#scannerId')
        scannerIdInput.addEventListener('input', () => {scannerId = scannerIdInput.value})
        const saveButton = document.querySelector('#save')
        saveButton.addEventListener('click', () => {
            const newScanner = {
                id: scannerId,
                name: name,
                lastOnline: '-',
                timeIncactive: '-',
                signedIn: false,
                userSignedIn: false,
            }
            mobileScannersQuery.unshift(newScanner)
            localStorage.setItem('mobileScanners', JSON.stringify(mobileScannersQuery))
            dialog.style.display = 'none'
            dialogContent.innerHTML = ''
            mobileScannerPage()
            const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const newLog = {
                id: systemLogQuery.length,
                securityLevel: 'None',
                severity: 'Low',
                action: `Added fixed scanner`,
                description: '-',
                emailUsername: 'Admin',
                time: formattedDate,
            }
            systemLogQuery.push(newLog)
            localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
        })

    })
    const editButtons = document.querySelectorAll('.edit img');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const fixedScannerId = event.target.id.slice(13);
            const index = fixedScannersQuery.findIndex(fixedScanner => fixedScanner.id == fixedScannerId);
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Edit ${fixedScannersQuery[index].systemName}</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Display Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input class="big" type="text" id="location">
                                    <p>Location</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
            let nameInput = document.querySelector('#name')
            nameInput.addEventListener('input', () => {name = nameInput.value})
            let locationInput = document.querySelector('#location')
            locationInput.addEventListener('input', () => {location = locationInput.value})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                fixedScannersQuery[index].name = name
                fixedScannersQuery[index].location = location
                localStorage.setItem('fixedScanners', JSON.stringify(fixedScannersQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                fixedScannerPage()
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Edited fixed scanner ${fixedScannersQuery[index].systemName}`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
            })
        })
    });
}
function todPage() {
    hideRutines()
    showButtonAdd()

    buttonAdd.innerText = 'Add Deviation Type'
    textHeading.innerText = 'All Deviation Types'

    const todQuery = JSON.parse(localStorage.getItem('tod'))

    buttonEmployees.classList.remove('page_active')
    buttonGroups.classList.remove('page_active')
    buttonMS.classList.remove('page_active')
    buttonFS.classList.remove('page_active')
    buttonToD.classList.add('page_active')
    buttonSL.classList.remove('page_active')
    buttonRutines.classList.remove('page_active')
    let todQueryCount = Math.ceil(todQuery.length / 10)
    let pageNumber = 1

    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        todQueryCount = Math.ceil(todQuery.length / 20)
        updateButtons()
        updateListTOD()
    })

    const buttonPagePrev = document.querySelector('#prevPage')
    const buttonPageNext = document.querySelector('#nextPage')

    buttonPagePrev.addEventListener('click', () => {
        pageNumber--
        updateButtons()
        updateListTOD()
    })
    buttonPageNext.addEventListener('click', () => {
        pageNumber++
        updateButtons()
        updateListTOD()
    })
    let buttonPagesArray = []
    updateButtons()
    function updateButtons() {
        const buttonPages = document.querySelector('.button__pages')
        buttonPages.innerHTML = ''
        for(let i = 0; i < todQueryCount; i++){
            buttonPages.innerHTML +=
                `
        <button id="changePage${i}">${i + 1}</button>
        `
        }
        for(let i = 0; i < todQueryCount; i++){
            buttonPagesArray[i] = document.querySelector(`#changePage${i}`)
            buttonPagesArray[i].classList.remove('current__page')
            buttonPagesArray[i].addEventListener('click', () => {
                pageNumber = i + 1
                updateButtons()
                updateListTOD()
            })
        }
        if(buttonPagesArray.length){
            buttonPagesArray[pageNumber - 1].classList.add('current__page')
        }

        if(pageNumber <= 1){
            buttonPagePrev.disabled = true
        } else {
            buttonPagePrev.disabled = false
        }
        if(pageNumber >= todQueryCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateListTOD()
    function updateListTOD() {
        const todQueryCount = JSON.parse(localStorage.getItem('tod'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="deviation__id">
                                <p>Deviation ID</p>
                            </div>
                            <div class="deviation__name">
                                <p>Deviation Name</p>
                            </div>
                            <div class="deviation__description">
                                <p>Deviation Description</p>
                            </div>
                            <div class="system__deviaton">
                                <p>System Deviation</p>
                            </div>
                            <div class="edit">
                                <p>Edit</p>
                            </div>
                            <div class="delete">
                                <p>Delete</p>
                            </div>
                        </div>
            `
        for (let i = 0; i < todQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="deviation__id">
                                <p>${todQuery[i].id}</p>
                            </div>
                            <div class="deviation__name">
                                <p>${todQuery[i].name}</p>
                            </div>
                            <div class="deviation__description">
                                <p>${todQuery[i].description}</p>
                            </div>
                            <div class="system__deviaton">
                                <p>${todQuery[i].systemDeviation ? 'Yes' : 'No'}</p>
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="editTOD${todQuery[i].id}">
                            </div>
                            <div class="delete">
                                ${todQuery[i].systemDeviation ? 'No' : `<img src="../../src/SystemAdmin/Delete.png" alt="" id="${todQuery[i].id}">`}
                            </div>
                        </div>
                    `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const todId = event.target.id;
                const index = todQuery.findIndex(tod => tod.id == todId);
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Deleted type of deviation ${todQuery[index].name}`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
                todQuery.splice(index, 1);
                localStorage.setItem('tod', JSON.stringify(todQuery));
                todPage()
            })
        });
    }
    let name = ''
    let description = ''
    buttonAdd.addEventListener('click', () => {
        dialog.style.display = 'flex'
        dialogContent.innerHTML =
            `
                        <div class="add__form">
                            <h2>Add Deviation Type</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Deviation Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input class="big" type="text" id="description">
                                    <p>Deviation Description</p>
                                </div>
                                <div class="select__wrapper">
                                    <select>
                                        <option value="">Option 1</option>
                                        <option value="">Option 2</option>
                                        <option default hidden value="Nothing">Nothing</option>
                                    </select>
                                    <p>Action after save</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
        let nameInput = document.querySelector('#name')
        nameInput.addEventListener('input', () => {name = nameInput.value})
        let descriptionInput = document.querySelector('#description')
        descriptionInput.addEventListener('input', () => {description = descriptionInput.value})
        const saveButton = document.querySelector('#save')
        saveButton.addEventListener('click', () => {
            let id = todQuery.length
            todQuery.forEach(el => {
                if(id == el.id){
                    id++
                }
            })
            const newDeviation = {
                id: id,
                name: name,
                description: description,
                systemDeviation: false,
            }
            todQuery.unshift(newDeviation)
            localStorage.setItem('tod', JSON.stringify(todQuery))
            dialog.style.display = 'none'
            dialogContent.innerHTML = ''
            todPage()
            const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const newLog = {
                id: systemLogQuery.length,
                securityLevel: 'None',
                severity: 'Low',
                action: `Added type of deviation`,
                description: '-',
                emailUsername: 'Admin',
                time: formattedDate,
            }
            systemLogQuery.push(newLog)
            localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
        })

    })
    const editButtons = document.querySelectorAll('.edit img');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const todId = event.target.id.slice(7);
            const index = todQuery.findIndex(tod => tod.id == todId);
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Edit ${todQuery[index].name}</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Display Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input class="big" type="text" id="description">
                                    <p>Description</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
            let nameInput = document.querySelector('#name')
            nameInput.addEventListener('input', () => {name = nameInput.value})
            let descriptionInput = document.querySelector('#description')
            descriptionInput.addEventListener('input', () => {description = descriptionInput.value})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                todQuery[index].name = name
                todQuery[index].description = description
                localStorage.setItem('tod', JSON.stringify(todQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                todPage()
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Edited type of deviation ${todQuery[index].name}`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
            })
        })
    });
}
function sortingLocationsPage() {
    hideRutines()
    showButtonAdd()

    buttonAdd.innerText = 'Add Sorting Location'
    textHeading.innerText = 'All Sorting Locations'

    const sortingLocationsQuery = JSON.parse(localStorage.getItem('sortingLocations'))

    buttonEmployees.classList.remove('page_active')
    buttonGroups.classList.remove('page_active')
    buttonMS.classList.remove('page_active')
    buttonFS.classList.remove('page_active')
    buttonToD.classList.remove('page_active')
    buttonSL.classList.add('page_active')
    buttonRutines.classList.remove('page_active')
    let sortingLocationsQueryCount = Math.ceil(sortingLocationsQuery.length / 10)
    let pageNumber = 1

    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        sortingLocationsQueryCount = Math.ceil(sortingLocationsQuery.length / 20)
        updateButtons()
        updateListSL()
    })

    const buttonPagePrev = document.querySelector('#prevPage')
    const buttonPageNext = document.querySelector('#nextPage')

    buttonPagePrev.addEventListener('click', () => {
        pageNumber--
        updateButtons()
        updateListSL()
    })
    buttonPageNext.addEventListener('click', () => {
        pageNumber++
        updateButtons()
        updateListSL()
    })
    let buttonPagesArray = []
    updateButtons()
    function updateButtons() {
        const buttonPages = document.querySelector('.button__pages')
        buttonPages.innerHTML = ''
        for(let i = 0; i < sortingLocationsQueryCount; i++){
            buttonPages.innerHTML +=
                `
        <button id="changePage${i}">${i + 1}</button>
        `
        }
        for(let i = 0; i < sortingLocationsQueryCount; i++){
            buttonPagesArray[i] = document.querySelector(`#changePage${i}`)
            buttonPagesArray[i].classList.remove('current__page')
            buttonPagesArray[i].addEventListener('click', () => {
                pageNumber = i + 1
                updateButtons()
                updateListSL()
            })
        }
        if(buttonPagesArray.length){
            buttonPagesArray[pageNumber - 1].classList.add('current__page')
        }

        if(pageNumber <= 1){
            buttonPagePrev.disabled = true
        } else {
            buttonPagePrev.disabled = false
        }
        if(pageNumber >= sortingLocationsQueryCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateListSL()
    function updateListSL() {
        const sortingLocationsQuery = JSON.parse(localStorage.getItem('sortingLocations'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="sorting__location__name">
                                <p>Name</p>
                            </div>
                            <div class="sorting__location__description">
                                <p>Description</p>
                            </div>
                            <div class="edit">
                                <p>Edit</p>
                            </div>
                            <div class="delete">
                                <p>Delete</p>
                            </div>
                        </div>
            `
        for (let i = 0; i < sortingLocationsQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="sorting__location__name">
                                <p>${sortingLocationsQuery[i].name}</p>
                            </div>
                            <div class="sorting__location__description">
                                <p>${sortingLocationsQuery[i].description}</p>
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="editSL${sortingLocationsQuery[i].id}">
                            </div>
                            <div class="delete">
                                <img src="../../src/SystemAdmin/Delete.png" alt="" id="deleteSL${sortingLocationsQuery[i].id}">
                            </div>
                        </div>
                    `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const slId = event.target.id;
                const index = sortingLocationsQuery.findIndex(sl => sl.id == slId);
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Deleted sorting location`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
                sortingLocationsQuery.splice(index, 1);
                localStorage.setItem('sortingLocations', JSON.stringify(sortingLocationsQuery));
                sortingLocationsPage()
            })
        });
    }
    let name = ''
    let description = ''
    buttonAdd.addEventListener('click', () => {
        dialog.style.display = 'flex'
        dialogContent.innerHTML =
            `
                        <div class="add__form">
                            <h2>Add Sorting Location</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Location Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input class="big" type="text" id="description">
                                    <p>Location Description</p>
                                </div>
                                <div class="select__wrapper">
                                    <select>
                                        <option value="">Option 1</option>
                                        <option value="">Option 2</option>
                                        <option default hidden value="Nothing">Nothing</option>
                                    </select>
                                    <p>Action after save</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
        let nameInput = document.querySelector('#name')
        nameInput.addEventListener('input', () => {name = nameInput.value})
        let descriptionInput = document.querySelector('#description')
        descriptionInput.addEventListener('input', () => {description = descriptionInput.value})
        const saveButton = document.querySelector('#save')
        saveButton.addEventListener('click', () => {
            let id = sortingLocationsQuery.length
            sortingLocationsQuery.forEach(el => {
                if(id == el.id){
                    id++
                }
            })
            const newLocation = {
                id: id,
                name: name,
                description: description,
            }
            sortingLocationsQuery.unshift(newLocation)
            localStorage.setItem('sortingLocations', JSON.stringify(sortingLocationsQuery))
            dialog.style.display = 'none'
            dialogContent.innerHTML = ''
            sortingLocationsPage()
            const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const newLog = {
                id: systemLogQuery.length,
                securityLevel: 'None',
                severity: 'Low',
                action: `Added sorting location`,
                description: '-',
                emailUsername: 'Admin',
                time: formattedDate,
            }
            systemLogQuery.push(newLog)
            localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
        })

    })
    const editButtons = document.querySelectorAll('.edit img');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const sortingId = event.target.id.slice(6);
            const index = sortingLocationsQuery.findIndex(sort => sort.id == sortingId);
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Edit ${sortingLocationsQuery[index].name}</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input class="big" type="text" id="description">
                                    <p>Description</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
            let nameInput = document.querySelector('#name')
            nameInput.addEventListener('input', () => {name = nameInput.value})
            let descriptionInput = document.querySelector('#description')
            descriptionInput.addEventListener('input', () => {description = descriptionInput.value})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                sortingLocationsQuery[index].name = name
                sortingLocationsQuery[index].description = description
                localStorage.setItem('sortingLocations', JSON.stringify(sortingLocationsQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                sortingLocationsPage()
                const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    securityLevel: 'None',
                    severity: 'Low',
                    action: `Edited sorting location ${sortingLocationsQuery[index].name}`,
                    description: '-',
                    emailUsername: 'Admin',
                    time: formattedDate,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
            })
        })
    });
}
function rutinesPage(){
    buttonEmployees.classList.remove('page_active')
    buttonGroups.classList.remove('page_active')
    buttonMS.classList.remove('page_active')
    buttonFS.classList.remove('page_active')
    buttonToD.classList.remove('page_active')
    buttonSL.classList.remove('page_active')
    buttonRutines.classList.add('page_active')

    const rutinesQuery = JSON.parse(localStorage.getItem('rutines'))

    let requirePin = false
    let pin = '0000'
    let confirmPin = ''
    const select = document.querySelector('.pin__require select')
    select.addEventListener('change', () => {
        requirePin = select.value == 'true';
    });
    const pinInput = document.querySelector('#input__pin')
    pinInput.addEventListener('input', () => {
        pin = pinInput.value
    })
    const pinConfrim = document.querySelector('#confirm__pin')
    pinConfrim.addEventListener('input', () => {
        confirmPin = pinConfrim.value
    })
    const saveButton = document.querySelector('.save')
    saveButton.addEventListener('click', () => {
        if(pin === confirmPin){
            rutinesQuery.pinRequired = requirePin
            rutinesQuery.pin = pin
            localStorage.setItem('rutines', JSON.stringify(rutinesQuery))
            pinInput.value = ''
            pinConfrim.value = ''
        }
        const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const newLog = {
            id: systemLogQuery.length,
            securityLevel: 'None',
            severity: 'Low',
            action: `Changed rutines`,
            description: '-',
            emailUsername: 'Admin',
            time: formattedDate,
        }
        systemLogQuery.push(newLog)
        localStorage.setItem('systemLog', JSON.stringify(systemLogQuery))
    })

    showRutines()
    hideButtonAdd()
}