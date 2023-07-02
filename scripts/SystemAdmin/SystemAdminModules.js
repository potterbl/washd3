const processedTot = JSON.parse(localStorage.getItem('processedTotal'))
const processedTod = JSON.parse(localStorage.getItem('processedToday'))

const profile = document.querySelector('.content__section__second__header .right')
profile.addEventListener('click', () => {
    window.location.href = './profile.html'
})
const userQuery = JSON.parse(localStorage.getItem('user'))
const profileName = document.querySelector('.right .text__area h3')
profileName.innerText = `${userQuery.firstName} ${userQuery.lastName}`

const profileImage = document.querySelector('.profile__img .img__wrapper')
profileImage.style = `background: url(${userQuery.profilePic}); background-size: cover; background-position: center;`


const dialog = document.querySelector('.dialog')
const dialogContent = document.querySelector('.dialog__content')


orderingPortalPage()
function orderingPortalPage() {
    const orderingPortalButton = document.querySelector('#orderingPortal')
    const vismaIntegrationButton = document.querySelector('#vismaIntegration')

    const onOff = document.querySelector('.off')
    const slider = document.querySelector('.slider')

    orderingPortalButton.innerText = 'Ordering Portal'
    vismaIntegrationButton.innerText = 'Visma Integration'
    orderingPortalButton.classList.add('page_active')
    vismaIntegrationButton.classList.remove('page_active')

    const mainHeading = document.querySelector('.main__heading')
    const textSection = document.querySelector('.text__section')
    onOff.addEventListener('click', () => {
        if(onOff.classList.contains('on')){
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                <div class="disable">
                <div class="dialog__header">
                    <h2>Disable Ordering Portal</h2>
                    <img src="../../src/SystemAdmin/X.png" alt="" id="closeDialog">
                </div>
                <div class="disable__body">
                    <p>
                        Are you sure you want to disable the <span>Ordering Portal?</span> <br><br>
                        By confirming this your created portals will be deactivated. You can always enable your portal again  in the future.
                    </p>
                </div>
                <div class="disable__footer">
                    <button id="cancelDisable">Cancel</button>
                    <button id="confirmDisable">Confirm</button>
                </div>
            </div>
                `
            const confirmDisable = document.querySelector('#confirmDisable')
            const cancelDisable = document.querySelector('#cancelDisable')
            const closeDialogImg = document.querySelector('#closeDialog')
            confirmDisable.addEventListener('click', () => {
                onOff.classList.remove('on')
                slider.classList.remove('slider__on')
                hideOrdersList()
                dialog.style.display = ''
                textSection.innerHTML =
                    `
                <h2>Enable Ordering Portal</h2>
                        <p>By enabling this module you will be invoiced a one-time setup fee of 15 000, -eks. mva. The monthly cost will be 990, -eks. mva. pr portal.</p>
                `
                mainHeading.innerHTML =
                    `
                    <div class="left">
                        <button id="orderingPortal" class="page_active">Ordering Portal</button>
                        <button id="vismaIntegration">Visma Integration</button>
                    </div>
                `
            })
            closeDialogImg.addEventListener('click', () => {
                dialog.style.display = ''
            })
            cancelDisable.addEventListener('click', () => {
                dialog.style.display = ''
            })
            dialog.addEventListener('click', (e) => {
                if(e.target === dialog){
                    dialog.style.display = ''
                } else {
                    return
                }
            })
        } else {
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                <div class="enable">
                <div class="dialog__header">
                    <h2>Enable Ordering Portal</h2>
                    <img src="../../src/SystemAdmin/X.png" alt="" id="closeDialog">
                </div>
                <div class="enable__body">
                    <p>
                        Are you sure you want to enable the <span>Ordering Portal?</span> <br><br>
                        By enabling this module you will be invoiced a one-time setup fee of 15 000, -eks. mva. The monthly cost will be 990, -eks. mva. pr portal.
                    </p>
                </div>
                <div class="enable__footer">
                    <button id="cancelEnable">Cancel</button>
                    <button id="confirmEnable">Confirm</button>
                </div>
            </div>
                `
            const confirmEnable = document.querySelector('#confirmEnable')
            const cancelEnable = document.querySelector('#cancelEnable')
            const closeDialogImg = document.querySelector('#closeDialog')
            confirmEnable.addEventListener('click', () => {
                onOff.classList.add('on')
                slider.classList.add('slider__on')
                addPortal()
                textSection.innerHTML =
                    `
                    <p class="success">Ordering Portal has been successfully enabled</p>
                    `
                mainHeading.innerHTML =
                    `
                    <div class="left">
                        <button id="orderingPortal" class="page_active">Ordering Portal</button>
                        <button id="vismaIntegration">Visma Integration</button>
                    </div>
                    <div class="right">
                        <button id="buttonAddPortal">Add Portal</button>
                        <img src="../../src/SystemAdmin/Plus.png" alt="">
                    </div>
                    `
                const buttonAddPortal = document.querySelector('#buttonAddPortal')
                buttonAddPortal.addEventListener('click', () => {
                    addPortal()
                })
            })
            closeDialogImg.addEventListener('click', () => {
                dialog.style.display = ''
            })
            cancelEnable.addEventListener('click', () => {
                dialog.style.display = ''
            })
            dialog.addEventListener('click', (e) => {
                if(e.target === dialog){
                    dialog.style.display = ''
                } else {
                    return
                }
            })
        }
    })
}

function addPortal() {
    const mainHeading = document.querySelector('.main__heading')
    const textSection = document.querySelector('.text__section')
    const customerQuery = JSON.parse(localStorage.getItem('customers'))
    showOrdersList()
    let customer = ''
    dialog.style.display = 'flex'
    dialogContent.innerHTML =
        `
                        <div class="add__customer">
                            <div class="dialog__header">
                                <h2>Add Ordering Portal</h2>
                                <img src="../../src/SystemAdmin/X.png" alt="" id="closeDialogImg">
                            </div>
                            <select id="customerChoose">
                                <option value="" hidden>Select a customer</option>
                                ${customerQuery.map(customer => {
            return `<option value="${customer.name}">${customer.name}</option>`
        })}
                            </select>
                            <div class="customer__footer">
                                <button id="saveCustomer">Save</button>
                            </div>
                        </div>
                        `

    let customerChoose = document.querySelector('#customerChoose')
    customerChoose.addEventListener('change', () => {customer = customerChoose.value})
    const saveCustomer = document.querySelector('#saveCustomer')
    const closeDialogImg = document.querySelector('#closeDialogImg')
    closeDialogImg.addEventListener('click', () => {
        dialog.style.display = ''
        dialogContent.innerHTML = ''
    })
    dialog.addEventListener('click', (e) => {
        if(e.target === dialog){
            dialog.style.display = ''
            dialogContent.innerHTML = ''
        } else {
            return
        }
    })
    saveCustomer.addEventListener('click', () => {
        const ordersPageQuery = JSON.parse(localStorage.getItem('ordersPage'))
        let id = ordersPageQuery.length
        ordersPageQuery.forEach(el => {
            if(id == el.id){
                id++
            }
        })
        const newCustomer = {
            id: id,
            customer: customer,
            accounts: [],
            orders: []
        }
        ordersPageQuery.push(newCustomer)
        localStorage.setItem('ordersPage', JSON.stringify(ordersPageQuery))
        dialog.style.display = 'flex'
        dialogContent.innerHTML =
            `
                            <div class="successfully__created">
                                <h2>Successfully Created</h2>
                                <img src="../../src/SystemAdmin/Win.png" alt="">
                                <p>
                                    Ordering portal for <span>${customer}</span> was successfully created <br><br>
                                    Now you can start creating user accounts. Create accounts for the employees of the organization who can make orders on behalf of this company.
                                </p>
                                <button id="createAccount">Create Account</button>
                            </div>
                            `
        textSection.innerHTML =
            `
                        <h2>Ordering portal enabled</h2>
                        `
        dialog.addEventListener('click', (e) => {
            if(e.target === dialog){
                dialog.style.display = ''
                dialogContent.innerHTML = ''
            } else {
                return
            }
        })
        showOrdersList()
        const createAccount = document.querySelector('#createAccount')
        createAccount.addEventListener('click', () => {
            showOrdersList()
            dialogContent.innerHTML =
                `
                            <div class="create__account">
                                <h2>Create Account</h2>
                                <div class="create__account__form">
                                    <div class="input__wrapper">
                                        <input type="text" id="name">
                                        <p>Name</p>
                                    </div>
                                    <div class="input__wrapper">
                                        <input type="text" id="emailUsername">
                                        <p>Email / Username</p>
                                    </div>
                                    <div class="input__wrapper">
                                        <input type="text" id="phone">
                                        <p>Phone</p>
                                    </div>
                                    <div class="input__wrapper">
                                        <input type="text" id="department">
                                        <p>Department</p>
                                    </div>
                                </div>
                                <button id="saveAccount">Create</button>
                            </div>
                            `
            let name = ''
            let emailUsername = ''
            let phone = ''
            let department = ''
            let nameInput = document.querySelector('#name')
            nameInput.addEventListener('input', () => {name = nameInput.value})
            let emailUsernameInput = document.querySelector('#emailUsername')
            emailUsernameInput.addEventListener('input', () => {emailUsername = emailUsernameInput.value})
            let phoneInput = document.querySelector('#phone')
            phoneInput.addEventListener('input', () => {phone = phoneInput.value})
            let departmentInput = document.querySelector('#department')
            departmentInput.addEventListener('input', () => {department = departmentInput.value})
            let saveAccount = document.querySelector('#saveAccount')
            saveAccount.addEventListener('click', () => {
                let id = ordersPageQuery.length
                ordersPageQuery.forEach(el => {
                    if(id == el.id){
                        id++
                    }
                })
                const newAccount = {
                    id: id,
                    name: name,
                    emailUsername: emailUsername,
                    phone: phone,
                    resident: department,
                }
                ordersPageQuery[ordersPageQuery.length - 1].accounts.push(newAccount)
                localStorage.setItem('ordersPage', JSON.stringify(ordersPageQuery))
                dialogContent.innerHTML =
                    `
                                <div class="successfully__created">
                                    <h2>New account has been successfully created</h2>
                                    <img src="../../src/SystemAdmin/Mail.png" alt="">
                                    <p>
                                        The registration link was sent to the specified email address.  The user will be able to create a password and log in to make an order
                                    </p>
                                    <button id="done">Done</button>
                                </div>
                                `
                const done = document.querySelector('#done')
                done.addEventListener('click', () => {
                    showOrdersList()
                    dialog.style.display = ''
                    dialogContent.innerHTML = ''
                })
            })
        })
    })
}

function showOrdersList() {
    const contentWrapper = document.querySelector('.portal__customers')
    const portalsSection = document.querySelector('.customers__list')
    const ordersPageQuery = JSON.parse(localStorage.getItem('ordersPage'))
    contentWrapper.style.display = 'block'
    portalsSection.innerHTML =
        `
                    <div class="list__header">
                        <div class="customer__name">
                            <p>Customer</p>
                        </div>
                        <div class="accounts__orders">
                            <p>Accounts & orders</p>
                        </div>
                        <div class="delete__customer">
                            <p>Delete</p>
                        </div>
                    </div>
                    `
    ordersPageQuery.forEach(el => {
        portalsSection.innerHTML +=
            `
                        <div class="list__row">
                            <div class="customer__name">
                                <p>${el.customer}</p>
                            </div>
                            <div class="accounts__orders">
                                <img src="../../src/SystemAdmin/Search.png" alt="" id="accOrd${el.id}">
                            </div>
                            <div class="delete__customer">
                                <img src="../../src/SystemAdmin/Delete.png" alt="" id="${el.id}">
                            </div>
                        </div>
                        `
    })
    const deleteButtons = document.querySelectorAll('.delete__customer img')
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const listId = event.target.id;
            console.log(listId)
            const index = ordersPageQuery.findIndex(list => list.id == listId);
            ordersPageQuery.splice(index, 1)
            localStorage.setItem('ordersPage', JSON.stringify(ordersPageQuery))
            showOrdersList()
        })
    })
    const accountOrdersButtons = document.querySelectorAll('.accounts__orders img')
    accountOrdersButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const listId = event.target.id.slice(6);
            const index = ordersPageQuery.findIndex(list => list.id == listId);
            customerAccPage(index)
        })
    })
}

function customerAccPage(index){
    const orderingPortalButton = document.querySelector('#orderingPortal')
    const vismaIntegrationButton = document.querySelector('#vismaIntegration')


    orderingPortalButton.innerText = 'Accounts'
    vismaIntegrationButton.innerText = 'Orders'
    orderingPortalButton.classList.add('page_active')
    vismaIntegrationButton.classList.remove('page_active')

    vismaIntegrationButton.addEventListener('click', () => {
        customerOrdersPage(index)
    })


    const buttonAddPortal = document.querySelector('#buttonAddPortal')
    buttonAddPortal.style.display = ''
    buttonAddPortal.innerText = 'Add Account'
    const customersList = document.querySelector('.customers__list')
    const ordersPageQuery = JSON.parse(localStorage.getItem('ordersPage'))
    buttonAddPortal.addEventListener('click', () => {
        customerAccPage(index)
        dialog.style.display = 'flex'
        dialogContent.innerHTML =
            `
                            <div class="create__account">
                                <h2>Create Account</h2>
                                <div class="create__account__form">
                                    <div class="input__wrapper">
                                        <input type="text" id="name">
                                        <p>Name</p>
                                    </div>
                                    <div class="input__wrapper">
                                        <input type="text" id="emailUsername">
                                        <p>Email / Username</p>
                                    </div>
                                    <div class="input__wrapper">
                                        <input type="text" id="phone">
                                        <p>Phone</p>
                                    </div>
                                    <div class="input__wrapper">
                                        <input type="text" id="department">
                                        <p>Department</p>
                                    </div>
                                </div>
                                <button id="saveAccount">Create</button>
                            </div>
                            `
        let name = ''
        let emailUsername = ''
        let phone = ''
        let department = ''
        let nameInput = document.querySelector('#name')
        nameInput.addEventListener('input', () => {name = nameInput.value})
        let emailUsernameInput = document.querySelector('#emailUsername')
        emailUsernameInput.addEventListener('input', () => {emailUsername = emailUsernameInput.value})
        let phoneInput = document.querySelector('#phone')
        phoneInput.addEventListener('input', () => {phone = phoneInput.value})
        let departmentInput = document.querySelector('#department')
        departmentInput.addEventListener('input', () => {department = departmentInput.value})
        let saveAccount = document.querySelector('#saveAccount')
        saveAccount.addEventListener('click', () => {
            let id = ordersPageQuery[index].accounts.length
            ordersPageQuery[index].accounts.forEach(el => {
                if(id === el.id){
                    id+=1
                }
            })
            const newAccount = {
                id: id,
                name: name,
                emailUsername: emailUsername,
                phone: phone,
                department: department,
            }
            ordersPageQuery[index].accounts.push(newAccount)
            localStorage.setItem('ordersPage', JSON.stringify(ordersPageQuery))
            customerAccPage(index)
            dialogContent.innerHTML =
                `
                                <div class="successfully__created">
                                    <h2>New account has been successfully created</h2>
                                    <img src="../../src/SystemAdmin/Mail.png" alt="">
                                    <p>
                                        The registration link was sent to the specified email address.  The user will be able to create a password and log in to make an order
                                    </p>
                                    <button id="done">Done</button>
                                </div>
                                `
            const done = document.querySelector('#done')
            done.addEventListener('click', () => {
                customerAccPage(index)
                dialog.style.display = ''
                dialogContent.innerHTML = ''
            })
        })
    })
    customersList.innerHTML =
        `
                    <div class="list__header">
                        <div class="account__name">
                            <p>Name</p>
                        </div>
                        <div class="account__emailUsername">
                            <p>Email / Username</p>
                        </div>
                        <div class="account__phone">
                            <p>Phone</p>
                        </div>
                        <div class="account__department">
                            <p>Department</p>
                        </div>
                        <div class="account__edit">
                            <p>Edit</p>
                        </div>
                        <div class="account__delete">
                            <p>Delete</p>
                        </div>
                    </div>
                    `
    if (ordersPageQuery[index].accounts){
        ordersPageQuery[index].accounts.forEach(account => {
            customersList.innerHTML +=
                `
                            <div class="list__row">
                                <div class="account__name">
                                    <p>${account.name}</p>
                                </div>
                                <div class="account__emailUsername">
                                    <p>${account.emailUsername}</p>
                                </div>
                                <div class="account__phone">
                                    <p>${account.phone}</p>
                                </div>
                                <div class="account__department">
                                    <p>${account.department}</p>
                                </div>
                                <div class="account__edit">
                                    <img src="../../src/SystemAdmin/Edit.png" alt="" id="edit${account.id}">
                                </div>
                                <div class="account__delete">
                                    <img src="../../src/SystemAdmin/Delete.png" alt="" id="${account.id}">
                                </div>
                            </div>
                            `
        })
        let id = index
        const deleteButtons = document.querySelectorAll('.account__delete img')
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const accountId = event.target.id;
                const index = ordersPageQuery[id].accounts.findIndex(account => account.id == accountId);
                ordersPageQuery[id].accounts.splice(index, 1)
                localStorage.setItem('ordersPage', JSON.stringify(ordersPageQuery))
                customerAccPage(id)
            })
        })
        const editButtons = document.querySelectorAll('.account__edit img')
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const accountId = event.target.id.slice(4);
                const index = ordersPageQuery[id].accounts.findIndex(account => account.id == accountId);
                localStorage.setItem('ordersPage', JSON.stringify(ordersPageQuery))
                dialog.style.display = 'flex'
                dialogContent.innerHTML =
                    `
                            <div class="create__account">
                                <h2>Edit Account ${ordersPageQuery[id].accounts[index].emailUsername}</h2>
                                <div class="create__account__form">
                                    <div class="input__wrapper">
                                        <input type="text" id="name">
                                        <p>Name</p>
                                    </div>
                                    <div class="input__wrapper">
                                        <input type="text" id="emailUsername">
                                        <p>Email / Username</p>
                                    </div>
                                    <div class="input__wrapper">
                                        <input type="text" id="phone">
                                        <p>Phone</p>
                                    </div>
                                    <div class="input__wrapper">
                                        <input type="text" id="department">
                                        <p>Department</p>
                                    </div>
                                </div>
                                <button id="saveAccount">Create</button>
                            </div>
                            `
                let name = ''
                let emailUsername = ''
                let phone = ''
                let department = ''
                let nameInput = document.querySelector('#name')
                nameInput.addEventListener('input', () => {
                    name = nameInput.value
                })
                let emailUsernameInput = document.querySelector('#emailUsername')
                emailUsernameInput.addEventListener('input', () => {
                    emailUsername = emailUsernameInput.value
                })
                let phoneInput = document.querySelector('#phone')
                phoneInput.addEventListener('input', () => {
                    phone = phoneInput.value
                })
                let departmentInput = document.querySelector('#department')
                departmentInput.addEventListener('input', () => {
                    department = departmentInput.value
                })
                let saveAccount = document.querySelector('#saveAccount')
                saveAccount.addEventListener('click', () => {
                    ordersPageQuery[id].accounts[index].name = name
                    ordersPageQuery[id].accounts[index].emailUsername = emailUsername
                    ordersPageQuery[id].accounts[index].phone = phone
                    ordersPageQuery[id].accounts[index].department = department

                    localStorage.setItem('ordersPage', JSON.stringify(ordersPageQuery))
                    dialog.style.display = ''
                    dialogContent.innerHTML = ''
                    customerAccPage(id)
                })
            })
        })
    }
}

function customerOrdersPage(index) {
    const orderingPortalButton = document.querySelector('#orderingPortal')
    const vismaIntegrationButton = document.querySelector('#vismaIntegration')


    orderingPortalButton.innerText = 'Accounts'
    vismaIntegrationButton.innerText = 'Orders'
    orderingPortalButton.classList.remove('page_active')
    vismaIntegrationButton.classList.add('page_active')

    orderingPortalButton.addEventListener('click', () => {
        customerAccPage(index)
    })


    const buttonAddPortal = document.querySelector('#buttonAddPortal')
    buttonAddPortal.style.display = 'none'
    const customersList = document.querySelector('.customers__list')
    const ordersPageQuery = JSON.parse(localStorage.getItem('ordersPage'))
    customersList.innerHTML =
        `
                    <div class="list__header">
                        <div class="order__number">
                            <p>Order Number</p>
                        </div>
                        <div class="order__date">
                            <p>Date</p>
                        </div>
                        <div class="order__admin">
                            <p>Admin</p>
                        </div>
                        <div class="order__status">
                            <p>Status</p>
                        </div>
                        <div class="order__details">
                            <p>Details</p>
                        </div>
                    </div>
                    `
    if (ordersPageQuery[index].orders){
        ordersPageQuery[index].orders.forEach(order => {
            customersList.innerHTML +=
                `
                            <div class="list__row">
                                <div class="order__number">
                                    <p>${order.id}</p>
                                </div>
                                <div class="order__date">
                                    <p>${order.date}</p>
                                </div>
                                <div class="order__admin">
                                    <p>${order.admin}</p>
                                </div>
                                <div class="order__status">
                                    <p>${order.status}</p>
                                </div>
                                <div class="order__details">
                                    <img src="../../src/SystemAdmin/Search.png" alt="" id="${order.id}">
                                </div>
                            </div>
                            `
        })
        let id = index
        const detailsButtons = document.querySelectorAll('.order__details img')
        detailsButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const orderId = event.target.id;
                const index = ordersPageQuery[id].orders.findIndex(order => order.id == orderId);
                dialog.style.display = 'flex'
                if(typeof ordersPage[id].orders[index].amount === 'string') {
                    dialogContent.innerHTML =
                        `
                    <div class="order__info">
                    <h2>Order ${ordersPageQuery[id].orders[index].id}</h2>
                        <div class="order__form">
                            <div class="order__form__header">
                                <div class="info__dateAdmin">
                                    <p class="heading__info">Date</p>
                                    <p>${ordersPageQuery[id].orders[index].date}</p>
                                </div>
                                <div class="info__dateAdmin">
                                    <p class="heading__info">Admin</p>
                                    <p>${ordersPageQuery[id].orders[index].admin}</p>
                                </div>
                                <div class="info__item">
                                    <div class="item__name">
                                        <p class="heading__info">Item</p>
                                        <p>${ordersPage[id].orders[index].item}</p>
                                    </div>
                                    <div class="item__amount">
                                        <p class="heading__info">Amount</p>
                                        <p>${ordersPage[id].orders[index].amount}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="sub__info">
                                        <p class="heading__info">Order reference</p>
                                        <p>${ordersPage[id].orders[index].orderReference}</p>
                            </div>
                            <div class="sub__info">
                                        <p class="heading__info">Delivery address</p>
                                        <p>${ordersPage[id].orders[index].deliveryAddress}</p>
                            </div>
                            <button id="close">Close</button>
                        </div>
                    </div>
                    `
                    const closeButton = document.querySelector('#close')
                    closeButton.addEventListener('click', () => {
                        dialog.style.display = ''
                        dialogContent.innerHTML = ''
                    })
                } else {
                    dialogContent.innerHTML =
                        `
                    <div class="order__info">
                    <h2>Order ${ordersPageQuery[id].orders[index].id}</h2>
                        <div class="order__form">
                            <div class="order__form__header">
                                <div class="info__dateAdmin">
                                    <p class="heading__info">Date</p>
                                    <p>${ordersPageQuery[id].orders[index].date}</p>
                                </div>
                                <div class="info__dateAdmin">
                                    <p class="heading__info">Admin</p>
                                    <p>${ordersPageQuery[id].orders[index].admin}</p>
                                </div>
                                
                            </div>
                            <div class="sub__info">
                                        <p class="heading__info">Order reference</p>
                                        <p>${ordersPage[id].orders[index].orderReference}</p>
                            </div>
                            <div class="sub__info">
                                        <p class="heading__info">Delivery address</p>
                                        <p>${ordersPage[id].orders[index].deliveryAddress}</p>
                            </div>
                            <button id="close">Close</button>
                        </div>
                    </div>
                    `
                    const infoItem = document.querySelector('.order__form__header')
                    for(let i = 0; i < ordersPage[id].orders[index].amount.length; i++){
                        infoItem.innerHTML +=
                            `
                                <div class="info__item">
                                    <div class="item__name">
                                        <p class="heading__info">Item</p>
                                        <p>${ordersPage[id].orders[index].item[i]}</p>
                                    </div>
                                    <div class="item__amount">
                                        <p class="heading__info">Amount</p>
                                        <p>${ordersPage[id].orders[index].amount[i]}</p>
                                    </div>
                                </div>
                                `
                    }

                    const closeButton = document.querySelector('#close')
                    closeButton.addEventListener('click', () => {
                        dialog.style.display = ''
                        dialogContent.innerHTML = ''
                    })
                }
            })
        })
    }
}

function hideOrdersList() {
    const contentWrapper = document.querySelector('.portal__customers')
    const portalsSection = document.querySelector('.customers__list')
    contentWrapper.style.display = ''
    portalsSection.innerHTML = ''
}