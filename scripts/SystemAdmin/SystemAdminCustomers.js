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

const buttonCustomers = document.querySelector('#buttonCustomers')
const buttonContacts = document.querySelector('#buttonContacts')
const buttonResidents = document.querySelector('#buttonResidents')

const buttonAdd = document.querySelector('#buttonAdd')
const heading = document.querySelector('.wrapper__header')
const textHeading = document.querySelector('.wrapper__header p')
const contentSection = document.querySelector('.content__section')

const dialog = document.querySelector('.dialog')
const dialogContent = document.querySelector('.dialog__content')

buttonCustomers.addEventListener('click', customersPage)
buttonContacts.addEventListener('click', contactsPage)
buttonResidents.addEventListener('click', residentsPage)
customersPage()
function closeDialog(e){
    if (e.target !== dialog) {
        return;
    }
    dialogContent.innerHTML = '';
    dialog.style = 'display: none';
}
dialog.addEventListener('click', closeDialog)
function customersPage() {

    buttonAdd.innerText = 'Add Customer'
    textHeading.innerText = 'All Customers'
    heading.innerHTML =
        `
        <p>All Customers</p> 
        `

    buttonCustomers.classList.add('page_active')
    buttonContacts.classList.remove('page_active')
    buttonResidents.classList.remove('page_active')

    const customersQuery = JSON.parse(localStorage.getItem('customers'))
    let customersQueryCount = Math.ceil(customersQuery.length / 6)
    let pageNumber = 1

    let showPerPage = 6
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 12
        customersQueryCount = Math.ceil(customersQuery.length / 20)
        updateButtons()
        updateList()
    })


    const buttonPagePrev = document.querySelector('#prevPage')
    const buttonPageNext = document.querySelector('#nextPage')

    buttonPagePrev.addEventListener('click', () => {
        pageNumber--
        updateButtons()
        updateList()
    })
    buttonPageNext.addEventListener('click', () => {
        pageNumber++
        updateButtons()
        updateList()
    })

    let buttonPagesArray = []
    updateButtons()
    function updateButtons() {
        const buttonPages = document.querySelector('.button__pages')
        buttonPages.innerHTML = ''
        for(let i = 0; i < customersQueryCount; i++){
            buttonPages.innerHTML +=
                `
        <button id="changePage${i}">${i + 1}</button>
        `
        }
        for(let i = 0; i < customersQueryCount; i++){
            buttonPagesArray[i] = document.querySelector(`#changePage${i}`)
            buttonPagesArray[i].classList.remove('current__page')
            buttonPagesArray[i].addEventListener('click', () => {
                pageNumber = i + 1
                updateButtons()
                updateList()
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
        if(pageNumber >= customersQueryCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateList()
    function updateList() {
        const customersQuery = JSON.parse(localStorage.getItem('customers'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="customers__name">
                                <p>Name</p>
                            </div>
                            <div class="customers__color">
                                <p>Color</p>
                            </div>
                            <div class="customers__number">
                                <p>Number</p>
                            </div>
                            <div class="customers__date">
                                <p>Date</p>
                            </div>
                            <div class="customers__address">
                                <p>Address</p>
                            </div>
                            <div class="customers__city">
                                <p>City</p>
                            </div>
                            <div class="customers__postcode">
                                <p>Postcode</p>
                            </div>
                            <div class="customers__resident">
                                <p>Residents</p>
                            </div>
                            <div class="customers__max__wash">
                                <p>Max Wash</p>
                            </div>
                            <div class="customers__created__by">
                                <p>Created By</p>
                            </div>
                            <div class="edit">
                                <p>Edit</p>
                            </div>
                            <div class="delete">
                                <p>Delete</p>
                            </div>
                        </div>
            `
        for (let i = 0; i < customersQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content__big">
                            <div class="customers__name">
                                <p>${customersQuery[i].name}</p>
                            </div>
                            <div class="customers__color">
                                <div class="customers__color__section" style="background-color: ${customersQuery[i].color}"></div>
                            </div>
                            <div class="customers__number">
                                <p>${customersQuery[i].number}</p>
                            </div>
                            <div class="customers__date">
                                <p>${customersQuery[i].date}</p>
                            </div>
                            <div class="customers__address">
                                <p>${customersQuery[i].address}</p>
                            </div>
                            <div class="customers__city">
                                <p>${customersQuery[i].city}</p>
                            </div>
                            <div class="customers__postcode">
                                <p>${customersQuery[i].postcode}</p>
                            </div>
                            <div class="customers__resident">
                                <p>${customersQuery[i].residents ? 'Yes' : 'No'}</p>
                            </div>
                            <div class="customers__max__wash">
                                <p>${customersQuery[i].maxWash}</p>
                            </div>
                            <div class="customers__created__by">
                                <p>${customersQuery[i].createdBy}</p>
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="edit${customersQuery[i].id}">
                            </div>
                            <div class="delete">
                                <img src="../../src/SystemAdmin/Delete.png" alt="" id="${customersQuery[i].id}">
                            </div>
                        </div>
                    `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const customerId = event.target.id;
                const index = customersQuery.findIndex(customer => customer.id == customerId);
                customersQuery.splice(index, 1);
                localStorage.setItem('customers', JSON.stringify(customersQuery));
                customersPage()
            })
        });
    }
    let name = ''
    let number = ''
    let postcode = ''
    let address = ''
    let city = ''
    let maxWashed = 'Unlimited'
    let color = 'gray'
    let resident = ''
    buttonAdd.addEventListener('click', () => {
        dialog.style.display = 'flex'
        const residentsQuery = JSON.parse(localStorage.getItem('residents'))
        dialogContent.innerHTML =
            `
                        <div class="add__form">
                            <h2>Add Customer</h2>
                            <div class="form__add__column">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Company Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="number">
                                    <p>Company Number</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="postcode">
                                    <p>Postcode</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="address">
                                    <p>Street Address</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="city">
                                    <p>City</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="maxWashed" placeholder="Unlimited">
                                    <p>Max Times Washed</p>
                                </div>                                
                                <div class="select__wrapper">
                                    <select id="resident">
                                        <option value="Nothing">Nothing</option>
                                    </select>
                                    <p>Actions after saving</p>
                                </div>
                                <div class="additional__wrapper">
                                    <div class="color__wrapper">
                                        <p>Color</p>
                                        <input type="color" id="color">
                                    </div>
                                    <div class="checkbox__wrapper">
                                        <input type="checkbox" id="residents">
                                        <p>Have residents</p>
                                    </div>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
        let nameInput = document.querySelector('#name')
        nameInput.addEventListener('input', () => {name = nameInput.value})
        let numberInput = document.querySelector('#number')
        numberInput.addEventListener('input', () => {number = numberInput.value})
        let postcodeInput = document.querySelector('#postcode')
        postcodeInput.addEventListener('input', () => {postcode = postcodeInput.value})
        let addressInput = document.querySelector('#address')
        addressInput.addEventListener('input', () => {address = addressInput.value})
        let cityInput = document.querySelector('#city')
        cityInput.addEventListener('input', () => {city = cityInput.value})
        let maxWashedInput = document.querySelector('#maxWashed')
        maxWashedInput.addEventListener('input', () => {maxWashed = maxWashedInput.value})
        let colorInput = document.querySelector('#color')
        colorInput.addEventListener('input', () => {color = colorInput.value})
        let residentInput = document.querySelector('#residents')
        residentInput.addEventListener('change', () => {resident = residentInput.checked})
        const saveButton = document.querySelector('#save')
        saveButton.addEventListener('click', () => {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            const userQuery = JSON.parse(localStorage.getItem('user'))
            let id = customersQuery.length
            customersQuery.forEach(el => {
                if(id == el.id){
                    id++
                }
            })
            const newCustomer = {
                id: id,
                name: name,
                color: color,
                number: number,
                date: formattedDate,
                postcode: postcode,
                address: address,
                city: city,
                residents: resident,
                maxWash: maxWashed,
                createdBy: `${userQuery.firstName} ${userQuery.lastName}`,
            }
            customersQuery.unshift(newCustomer)
            localStorage.setItem('customers', JSON.stringify(customersQuery))
            dialog.style.display = 'none'
            dialogContent.innerHTML = ''
            customersPage()
        })

    })
    const editButtons = document.querySelectorAll('.edit img');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const customerId = event.target.id.slice(4);
            const index = customersQuery.findIndex(customer => customer.id == customerId);
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Edit Customer ${customersQuery[index].name}</h2>
                            <div class="form__add__column">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Company Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="number">
                                    <p>Company Number</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="postcode">
                                    <p>Postcode</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="address">
                                    <p>Street Address</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="city">
                                    <p>City</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="maxWashed" placeholder="Unlimited">
                                    <p>Max Times Washed</p>
                                </div>                                
                                <div class="select__wrapper">
                                    <select id="resident">
                                        <option value="Nothing">Nothing</option>
                                    </select>
                                    <p>Actions after saving</p>
                                </div>
                                <div class="additional__wrapper">
                                    <div class="color__wrapper">
                                        <p>Color</p>
                                        <input type="color" id="color">
                                    </div>
                                    <div class="checkbox__wrapper">
                                        <input type="checkbox" id="residents">
                                        <p>Have residents</p>
                                    </div>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
            let nameInput = document.querySelector('#name')
            nameInput.addEventListener('input', () => {name = nameInput.value})
            let numberInput = document.querySelector('#number')
            numberInput.addEventListener('input', () => {number = numberInput.value})
            let postcodeInput = document.querySelector('#postcode')
            postcodeInput.addEventListener('input', () => {postcode = postcodeInput.value})
            let addressInput = document.querySelector('#address')
            addressInput.addEventListener('input', () => {address = addressInput.value})
            let cityInput = document.querySelector('#city')
            cityInput.addEventListener('input', () => {city = cityInput.value})
            let maxWashedInput = document.querySelector('#maxWashed')
            maxWashedInput.addEventListener('input', () => {maxWashed = maxWashedInput.value})
            let colorInput = document.querySelector('#color')
            colorInput.addEventListener('input', () => {color = colorInput.value})
            let residentInput = document.querySelector('#residents')
            residentInput.addEventListener('change', () => {resident = residentInput.checked})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                customersQuery[index].name = name
                customersQuery[index].color = color
                customersQuery[index].number = number
                customersQuery[index].postcode = postcode
                customersQuery[index].address = address
                customersQuery[index].city = city
                customersQuery[index].residents = resident
                customersQuery[index].maxWash = maxWashed
                localStorage.setItem('customers', JSON.stringify(customersQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                customersPage()
            })
        })
    });
}
function contactsPage() {
    const customersQuery = JSON.parse(localStorage.getItem('customers'))

    buttonAdd.innerText = 'Add Contact'
    heading.innerHTML =
        `
        <p>All Contacts</p>
        <select id="sorting">
        <option value="nothing">Customer sort</option>
            ${customersQuery.map((customer) => {
                return `<option value="${customer.name}">${customer.name}</option>`
        })}
        </select>   
        `

    buttonCustomers.classList.remove('page_active')
    buttonContacts.classList.add('page_active')
    buttonResidents.classList.remove('page_active')

    let contactsQuery = JSON.parse(localStorage.getItem('contacts'))

    const buttonPages = document.querySelector('.button__pages')

    let sortedArray = [...contactsQuery]

    const sorting = document.querySelector('#sorting')
    sorting.addEventListener('change', () => {
        if(sorting.value === 'nothing'){
            sortedArray = [...contactsQuery]
            updateCountOfPages()
            updateButtons()
            updateList()
        } else {
            sortedArray = []
            contactsQuery.forEach(contact => {
                if(contact.customer == sorting.value){
                    sortedArray.push(contact)
                }
            })
            updateCountOfPages()
            updateButtons()
            updateList()
        }
    })
    let sortedArrayCount = 0
    let buttonPagesArray = []
    let showPerPage = 10
    let pageNumber = 1
    const buttonPagePrev = document.querySelector('#prevPage')
    const buttonPageNext = document.querySelector('#nextPage')

    updateCountOfPages()
    function updateCountOfPages() {
        if(showPerPage === 10){
            sortedArrayCount = Math.ceil(sortedArray.length / 10)
        } else {
            sortedArrayCount = Math.ceil(customersQuery.length / 20)
        }

        buttonPages.innerHTML = ''
        for(let i = 0; i < sortedArrayCount; i++){
            buttonPages.innerHTML +=
                `
            <button id="changePage${i}">${i + 1}</button>
            `
        }
        updateButtons()
    }

    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        sortedArrayCount = Math.ceil(customersQuery.length / 20)
        updateButtons()
        updateList()
        updateCountOfPages()
    })

    buttonPagePrev.addEventListener('click', () => {
        pageNumber--
        updateButtons()
        updateList()
    })
    buttonPageNext.addEventListener('click', () => {
        pageNumber++
        updateButtons()
        updateList()
    })

    updateButtons()
    function updateButtons() {
        for(let i = 0; i < sortedArrayCount; i++){
            buttonPagesArray[i] = document.querySelector(`#changePage${i}`)
            buttonPagesArray[i].classList.remove('current__page')
            buttonPagesArray[i].addEventListener('click', () => {
                pageNumber = i + 1
                updateList()
                updateButtons()
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
        if(pageNumber >= sortedArrayCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateList()
    function updateList() {
        const contactsQuery = JSON.parse(localStorage.getItem('contacts'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="contacts__name">
                                <p>Name</p>
                            </div>
                            <div class="contacts__email">
                                <p>Email</p>
                            </div>
                            <div class="contacts__phone">
                                <p>Phone</p>
                            </div>
                            <div class="contacts__customer">
                                <p>Customer</p>
                            </div>
                            <div class="contacts__title">
                                <p>Title</p>
                            </div>
                            <div class="contacts__updated">
                                <p>Updated</p>
                            </div>
                            <div class="contacts__created__by">
                                <p>Created By</p>
                            </div>
                            <div class="edit">
                                <p>Edit</p>
                            </div>
                            <div class="delete">
                                <p>Delete</p>
                            </div>
                        </div>
            `
        for (let i = 0; i < sortedArray.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="contacts__name">
                                <p>${sortedArray[i].name}</p>
                            </div>
                            <div class="contacts__email">
                                <p>${sortedArray[i].email}</p>
                            </div>
                            <div class="contacts__phone">
                                <p>${sortedArray[i].phone}</p>
                            </div>
                            <div class="contacts__customer">
                                <p>${sortedArray[i].customer}</p>
                            </div>
                            <div class="contacts__title">
                                <p>${sortedArray[i].title}</p>
                            </div>
                            <div class="contacts__updated">
                                <p>${sortedArray[i].updated}</p>
                            </div>
                            <div class="contacts__created__by">
                                <p>${sortedArray[i].createdBy}</p>
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="edit${sortedArray[i].id}">
                            </div>
                            <div class="delete">
                                <img src="../../src/SystemAdmin/Delete.png" alt="" id="${sortedArray[i].id}">
                            </div>
                        </div>
                    `
            }
        }
    }
    const deleteButtons = document.querySelectorAll('.delete img');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const contactId = event.target.id;
            const index = contactsQuery.findIndex(contact => contact.id == contactId);
            contactsQuery.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contactsQuery));
            contactsPage()
        })
    });
    let name = ''
    let email = ''
    let phone = ''
    let title = ''
    let customer = ''

    buttonAdd.addEventListener('click', () => {
        dialog.style.display = 'flex'
        const customersQuery = JSON.parse(localStorage.getItem('customers'))
        dialogContent.innerHTML =
            `
                        <div class="add__form">
                            <h2>Add Customer</h2>
                            <div class="form__add__column">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="email">
                                    <p>Email</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="phone">
                                    <p>Phone</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="title">
                                    <p>Title</p>
                                </div>                           
                                <div class="select__wrapper">
                                    <select id="customer">
                                        <option hidden value="">Choose customer</option>
                                        ${customersQuery.map((customer) => {
                                            return  `<option value="${customer.name}">${customer.name}</option>`
                                        }).join('')}
                                    </select>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
        let nameInput = document.querySelector('#name')
        nameInput.addEventListener('input', () => {name = nameInput.value})
        let emailInput = document.querySelector('#email')
        emailInput.addEventListener('input', () => {email = emailInput.value})
        let phoneInput = document.querySelector('#phone')
        phoneInput.addEventListener('input', () => {phone = phoneInput.value})
        let titleInput = document.querySelector('#title')
        titleInput.addEventListener('input', () => {title = titleInput.value})
        let customerInput = document.querySelector('#customer')
        customerInput.addEventListener('change', () => {customer = customerInput.value})
        const saveButton = document.querySelector('#save')
        saveButton.addEventListener('click', () => {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            const userQuery = JSON.parse(localStorage.getItem('user'))
            if(customer == ''){
                customer = `${customersQuery[0].name}`
            }
            let id = contactsQuery.length
            contactsQuery.forEach(el => {
                if(id == el.id){
                    id++
                }
            })
            const newContact = {
                id: id,
                name: name,
                email: email,
                phone: phone,
                updated: formattedDate,
                title: title,
                customer: customer,
                createdBy: `${userQuery.firstName} ${userQuery.lastName}`,
            }
            contactsQuery.unshift(newContact)
            localStorage.setItem('contacts', JSON.stringify(contactsQuery))
            dialog.style.display = 'none'
            dialogContent.innerHTML = ''
            contactsPage()
        })

    })
    const editButtons = document.querySelectorAll('.edit img');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const contactsQuery = JSON.parse(localStorage.getItem('contacts'))
            const contactId = event.target.id.slice(4);
            const index = contactsQuery.findIndex(contact => contact.id == contactId);
            dialog.style.display = 'flex'
            const customersQuery = JSON.parse(localStorage.getItem('customers'))
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Edit Contact ${contactsQuery[index].name}</h2>
                            <div class="form__add__column">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="email">
                                    <p>Email</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="phone">
                                    <p>Phone</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="title">
                                    <p>Title</p>
                                </div>                           
                                <div class="select__wrapper">
                                    <select id="customer">
                                        ${customersQuery.map((customer) => {
                                            return  `<option value="${customer.name}">${customer.name}</option>`
                                        }).join('')}
                                    </select>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
            let nameInput = document.querySelector('#name')
            nameInput.addEventListener('input', () => {name = nameInput.value})
            let emailInput = document.querySelector('#email')
            emailInput.addEventListener('input', () => {email = emailInput.value})
            let phoneInput = document.querySelector('#phone')
            phoneInput.addEventListener('input', () => {phone = phoneInput.value})
            let titleInput = document.querySelector('#title')
            titleInput.addEventListener('input', () => {title = titleInput.value})
            let customerInput = document.querySelector('#customer')
            customerInput.addEventListener('change', () => {customer = customerInput.value})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                if(customer == ''){
                    customer = `${contactsQuery[index].customer}`
                }
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
                contactsQuery[index].name = name
                contactsQuery[index].email = email
                contactsQuery[index].phone = phone
                contactsQuery[index].updated = formattedDate
                contactsQuery[index].title = title
                contactsQuery[index].customer = customer
                localStorage.setItem('contacts', JSON.stringify(contactsQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                contactsPage()
            })
        })
    });
}

function residentsPage() {
    const customersQuery = JSON.parse(localStorage.getItem('customers'))

    buttonAdd.innerText = 'Add Resident'
    heading.innerHTML =
        `
        <p>All Residents</p>
        <select id="sorting">
        <option value="nothing">Customer sort</option>
            ${customersQuery.map((customer) => {
            return `<option value="${customer.name}">${customer.name}</option>`
        })}
        </select>   
        `



    buttonCustomers.classList.remove('page_active')
    buttonContacts.classList.remove('page_active')
    buttonResidents.classList.add('page_active')

    const residentsQuery = JSON.parse(localStorage.getItem('residents'))
    let pageNumber = 1
    const buttonPages = document.querySelector('.button__pages')
    buttonPages.innerHTML = ''

    let sortedArray = [...residentsQuery]

    const sorting = document.querySelector('#sorting')
    sorting.addEventListener('change', () => {
        if(sorting.value === 'nothing'){
            sortedArray = [...residentsQuery]
            updateCountOfPages()
            updateButtons()
            updateList()
        } else {
            sortedArray = []
            residentsQuery.forEach(resident => {
                if(resident.customer == sorting.value){
                    sortedArray.push(resident)
                }
            })
            updateCountOfPages()
            updateButtons()
            updateList()
        }
    })
    let sortedArrayCount = 0
    let showPerPage = 10
    let buttonPagesArray = []
    const buttonPagePrev = document.querySelector('#prevPage')
    const buttonPageNext = document.querySelector('#nextPage')

    updateCountOfPages()
    function updateCountOfPages() {
        if(showPerPage === 10){
            sortedArrayCount = Math.ceil(sortedArray.length / 10)
        } else {
            sortedArrayCount = Math.ceil(sortedArray.length / 20)
        }

        buttonPages.innerHTML = ''
        for(let i = 0; i < sortedArrayCount; i++){
            buttonPages.innerHTML +=
                `
            <button id="changePage${i}">${i + 1}</button>
            `
        }
        updateButtons()
    }

    buttonPagePrev.addEventListener('click', () => {
        pageNumber--
        updateButtons()
        updateList()
    })
    buttonPageNext.addEventListener('click', () => {
        pageNumber++
        updateButtons()
        updateList()
    })

    updateButtons()
    function updateButtons() {
        for(let i = 0; i < sortedArrayCount; i++){
            buttonPagesArray[i] = document.querySelector(`#changePage${i}`)
            buttonPagesArray[i].classList.remove('current__page')
            buttonPagesArray[i].addEventListener('click', () => {
                pageNumber = i + 1
                contactsPage()
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
        if(pageNumber >= sortedArrayCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        sortedArrayCount = Math.ceil(sortedArray.length / 20)
        updateButtons()
        updateList()
        updateCountOfPages()
    })
    updateList()
    function updateList() {
        const residentsQuery = JSON.parse(localStorage.getItem('residents'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="residents__identify">
                                <p>Identify</p>
                            </div>
                            <div class="residents__room">
                                <p>Room</p>
                            </div>
                            <div class="residents__department">
                                <p>Department</p>
                            </div>
                            <div class="residents__customer">
                                <p>Customer</p>
                            </div>
                            <div class="residents__created">
                                <p>Created</p>
                            </div>
                            <div class="residents__updated">
                                <p>Updated</p>
                            </div>
                            <div class="residents__created__by">
                                <p>Created By</p>
                            </div>
                            <div class="edit">
                                <p>Edit</p>
                            </div>
                            <div class="delete">
                                <p>Delete</p>
                            </div>
                        </div>
            `
        for (let i = 0; i < sortedArray.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="residents__identify">
                                <p>${sortedArray[i].identify}</p>
                            </div>
                            <div class="residents__room">
                                <p>${sortedArray[i].room}</p>
                            </div>
                            <div class="residents__department">
                                <p>${sortedArray[i].department}</p>
                            </div>
                            <div class="residents__customer">
                                <p>${sortedArray[i].customer}</p>
                            </div>
                            <div class="residents__created">
                                <p>${sortedArray[i].created}</p>
                            </div>
                            <div class="residents__updated">
                                <p>${sortedArray[i].updated}</p>
                            </div>
                            <div class="residents__created__by">
                                <p>${sortedArray[i].createdBy}</p>
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="edit${sortedArray[i].id}">
                            </div>
                            <div class="delete">
                                <img src="../../src/SystemAdmin/Delete.png" alt="" id="${sortedArray[i].id}">
                            </div>
                        </div>
                    `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const residentId = event.target.id;
                const index = residentsQuery.findIndex(resident => resident.id == residentId);
                residentsQuery.splice(index, 1);
                localStorage.setItem('residents', JSON.stringify(residentsQuery));
                residentsPage()
            })
        });
    }
    let name = ''
    let room = ''
    let department = ''
    let customer = ''

    buttonAdd.addEventListener('click', () => {
        dialog.style.display = 'flex'
        const residentsQuery = JSON.parse(localStorage.getItem('residents'))
        const customersQuery = JSON.parse(localStorage.getItem('customers'))
        dialogContent.innerHTML =
            `
                        <div class="add__form">
                            <h2>Add Resident</h2>
                            <div class="form__add__column">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="room">
                                    <p>Room Information</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="department">
                                    <p>Department</p>
                                </div>                          
                                <div class="select__wrapper">
                                    <select id="customer">
                                        ${customersQuery.map((customer) => {
                                            return  `<option value="${customer.name}">${customer.name}</option>`
                                        }).join('')}
                                    </select>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
        let nameInput = document.querySelector('#name')
        nameInput.addEventListener('input', () => {name = nameInput.value})
        let roomInput = document.querySelector('#room')
        roomInput.addEventListener('input', () => {room = roomInput.value})
        let departmentInput = document.querySelector('#department')
        departmentInput.addEventListener('input', () => {department = departmentInput.value})
        let customerInput = document.querySelector('#customer')
        customerInput.addEventListener('change', () => {customer = customerInput.value})
        const saveButton = document.querySelector('#save')
        saveButton.addEventListener('click', () => {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            const userQuery = JSON.parse(localStorage.getItem('user'))
            if(customer == ''){
                customer = `${customersQuery[0].name}`
            }
            let id = residentsQuery.length
            residentsQuery.forEach(el => {
                if(id == el.id){
                    id++
                }
            })
            const newResident = {
                id: id,
                identify: name,
                room: room,
                department: department,
                created: formattedDate,
                updated: formattedDate,
                customer: customer,
                createdBy: `${userQuery.firstName} ${userQuery.lastName}`,
            }
            residentsQuery.unshift(newResident)
            localStorage.setItem('residents', JSON.stringify(residentsQuery))
            dialog.style.display = 'none'
            dialogContent.innerHTML = ''
            residentsPage()
        })

    })
    const editButtons = document.querySelectorAll('.edit img');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const residentsQuery = JSON.parse(localStorage.getItem('residents'))
            const residentId = event.target.id.slice(4);
            const index = residentsQuery.findIndex(resident => resident.id == residentId);
            dialog.style.display = 'flex'
            const customersQuery = JSON.parse(localStorage.getItem('customers'))
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Edit Resident ${residentsQuery[index].identify}</h2>
                            <div class="form__add__column">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Name</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="room">
                                    <p>Room Information</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="department">
                                    <p>Department</p>
                                </div>                          
                                <div class="select__wrapper">
                                    <select id="customer">
                                        ${customersQuery.map((customer) => {
                                            return  `<option value="${customer.name}">${customer.name}</option>`
                                        }).join('')}
                                    </select>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
            let nameInput = document.querySelector('#name')
            nameInput.addEventListener('input', () => {name = nameInput.value})
            let roomInput = document.querySelector('#room')
            roomInput.addEventListener('input', () => {room = roomInput.value})
            let departmentInput = document.querySelector('#department')
            departmentInput.addEventListener('input', () => {department = departmentInput.value})
            let customerInput = document.querySelector('#customer')
            customerInput.addEventListener('change', () => {customer = customerInput.value})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
                if(department === ''){
                    department = '-'
                }
                if(customer == ''){
                    customer = `${residentsQuery[index].customer}`
                }
                residentsQuery[index].identify = name
                residentsQuery[index].room = room
                residentsQuery[index].department = department
                residentsQuery[index].updated = formattedDate
                residentsQuery[index].customer = customer
                localStorage.setItem('residents', JSON.stringify(residentsQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                residentsPage()
            })
        })
    });
}