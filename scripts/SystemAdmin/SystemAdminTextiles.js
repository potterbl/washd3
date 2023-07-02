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

const buttonTextiles = document.querySelector('#buttonTextiles')
const buttonCategories = document.querySelector('#buttonCategories')
const buttonColors = document.querySelector('#buttonColors')
const buttonTemperatures = document.querySelector('#buttonTemperatures')
const buttonSizes = document.querySelector('#buttonSizes')

const buttonAdd = document.querySelector('#buttonAdd')
const heading = document.querySelector('.wrapper__header')
const textHeading = document.querySelector('.wrapper__header p')
const contentSection = document.querySelector('.content__section')

const dialog = document.querySelector('.dialog')
const dialogContent = document.querySelector('.dialog__content')

buttonTextiles.addEventListener('click', textilesPage)
buttonCategories.addEventListener('click', categoriesPage)
buttonColors.addEventListener('click', colorsPage)
buttonTemperatures.addEventListener('click', temperaturesPage)
buttonSizes.addEventListener('click', sizesPage)

textilesPage()
function closeDialog(e){
    if (e.target !== dialog) {
        return;
    }
    dialogContent.innerHTML = '';
    dialog.style = 'display: none';
}
dialog.addEventListener('click', closeDialog)
function textilesPage() {
    const customersQuery = JSON.parse(localStorage.getItem('customers'))
    let sortedArray = [...customersQuery]
    const categoriesQuery = JSON.parse(localStorage.getItem('categories'))
    const sizesQuery = JSON.parse(localStorage.getItem('sizes'))
    const colorsQuery = JSON.parse(localStorage.getItem('colors'))

    buttonAdd.style = 'display: none'
    textHeading.innerText = 'All Customers'

    heading.innerHTML =
        `
        <p>All Textiles</p>
        <div class="heading__right">
            <select id="customersSort">
                <option value="">All Customers</option>
                ${customersQuery.map(customer => {
                    return `<option value="${customer.name}">${customer.name}</option>`
                })}
            </select>
            <select id="categoriesSort">
                <option value="">All Categories</option>
                ${categoriesQuery.map(category => {
                    return `<option value="${category.name}">${category.name}</option>`
                })}
            </select>
            <select id="colorsSort">
                <option value="">All Colors</option>
                ${colorsQuery.map(color => {
                    return `<option style="background-color: ${color.value}" value="${color.value}">${color.value}</option>`
                })}
            </select>
            <select id="sizesSort">
                <option value="">All Sizes</option>
                ${sizesQuery.map(size => {
                    return `<option value="${size.size}">${size.size}</option>`
                })}
            </select>
            <select id="typesSort">
                <option value="">All Types</option>
                ${customersQuery.map(customer => {
                    return `<option value="${customer.status}">${customer.status}</option>`
                })}
            </select>
            <select id="actionsSort">
                <option value="">All Actions</option>
                ${customersQuery.map(customer => {
                    return `<option value="${customer.name}">${customer.name}</option>`
                })}
            </select>
            <div class="input__wrapper">
                <input type="text" id="rfidSort" placeholder="RFID">
                <img src="../../src/SystemAdmin/Search.png" alt="" id="searchImg">
            </div>
            <button id="resetAll">Reset All</button>
        </div>
        `

    let customersSort = ''
    let categoriesSort = ''
    let colorsSort = ''
    let sizesSort = ''
    let typesSort = ''
    let actionsSort = ''
    let rfidSort = ''
    function sorting() {
        let state = []
        customersQuery.forEach(el => {
            if (el.name.includes(customersSort) && el.category.includes(categoriesSort) && el.color.includes(colorsSort) && el.size.includes(sizesSort) && el.status.includes(typesSort) && el.rfid.toLowerCase().includes(rfidSort.toLowerCase())) {
                state.push(el)
            }
        })
        sortedArray = state
        updateButtons()
        updateList()
        updatePageCount()
    }

    const customersSortSelect = document.querySelector('#customersSort')
    customersSortSelect.addEventListener('change', () => {
        customersSort = customersSortSelect.value
        sorting()
        updatePageCount()
        updateButtons()
    })
    const categoriesSortSelect = document.querySelector('#categoriesSort')
    categoriesSortSelect.addEventListener('change', () => {
        categoriesSort = categoriesSortSelect.value
        sorting()
        updatePageCount()
        updateButtons()
    })
    const colorsSortSelect = document.querySelector('#colorsSort')
    colorsSortSelect.addEventListener('change', () => {
        colorsSort = colorsSortSelect.value
        sorting()
        updatePageCount()
        updateButtons()
    })
    const sizesSortSelect = document.querySelector('#sizesSort')
    sizesSortSelect.addEventListener('change', () => {
        sizesSort = sizesSortSelect.value
        sorting()
        updatePageCount()
        updateButtons()
    })
    const typesSortSelect = document.querySelector('#typesSort')
    typesSortSelect.addEventListener('change', () => {
        typesSort = typesSortSelect.value
        sorting()
        updatePageCount()
        updateButtons()
    })
    const actionsSortSelect = document.querySelector('#actionsSort')
    actionsSortSelect.addEventListener('change', () => {
        actionsSort = actionsSortSelect.value
    })
    const rfidSortinput = document.querySelector('#rfidSort')
    rfidSortinput.addEventListener('keyup', () => {
        rfidSort = rfidSortinput.value
        sorting()
        updatePageCount()
        updateButtons()
    })
    const resetAll = document.querySelector('#resetAll')
    resetAll.addEventListener('click', () => {
        sortedArray = []
        customersSortSelect.value = ''
        categoriesSortSelect.value = ''
        colorsSortSelect.value = ''
        sizesSortSelect.value = ''
        typesSortSelect.value = ''
        actionsSortSelect.value = ''
        rfidSortinput.value = ''
        customersSort = ''
        categoriesSort = ''
        colorsSort = ''
        sizesSort = ''
        typesSort = ''
        actionsSort = ''
        rfidSort = ''
        sorting()
        updatePageCount()
        updateButtons()
    })

    buttonTextiles.classList.add('page_active')
    buttonCategories.classList.remove('page_active')
    buttonColors.classList.remove('page_active')
    buttonTemperatures.classList.remove('page_active')
    buttonSizes.classList.remove('page_active')

    let pageNumber = 1
    const buttonPages = document.querySelector('.button__pages')
    let sortedArrayCount = Math.ceil(sortedArray.length / 10)
    let buttonPagesArray = []
    let showPerPage = 10

    updatePageCount()
    function updatePageCount() {
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
    }


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

    updateButtons()

    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        sortedArrayCount = Math.ceil(sortedArray.length / 20)
        updatePageCount()
        updateButtons()
        updateList()
    })
    function updateButtons() {
        for(let i = 0; i < sortedArrayCount; i++){
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
        if(pageNumber >= sortedArrayCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateList()
    function updateList() {
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="textiles__company">
                                <p>Company</p>
                            </div>
                            <div class="textiles__category">
                                <p>Category</p>
                            </div>
                            <div class="textiles__color">
                                <p>Color</p>
                            </div>
                            <div class="textiles__size">
                                <p>Size</p>
                            </div>
                            <div class="textiles__uniform">
                                <p>Uniform</p>
                            </div>
                            <div class="textiles__resident">
                                <p>Resident</p>
                            </div>
                            <div class="textiles__t">
                                <p>T, °</p>
                            </div>
                            <div class="textiles__weight">
                                <p>Weight, g</p>
                            </div>
                            <div class="textiles__max__wash">
                                <p>Max Wash</p>
                            </div>
                            <div class="textiles__status">
                                <p>Status</p>
                            </div>
                            <div class="textiles__deviation">
                                <p>Deviation</p>
                            </div>
                            <div class="textiles__rfid">
                                <p>RFID</p>
                            </div>
                            <div class="textiles__track">
                                <p>Track</p>
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
                            <div class="textiles__company">
                                <p>${sortedArray[i].name}</p>
                            </div>
                            <div class="textiles__category">
                                <p>${sortedArray[i].category}</p>
                            </div>
                            <div class="textiles__color">
                                <div class="categoies__color__section" style="background-color: ${sortedArray[i].color}"></div>
                            </div>
                            <div class="textiles__size">
                                <p>${sortedArray[i].size}</p>
                            </div>
                            <div class="textiles__uniform">
                                <p>${sortedArray[i].uniform ? 'Yes' : 'No'}</p>
                            </div>
                            <div class="textiles__resident">
                                <p>${sortedArray[i].residents}</p>
                            </div>
                            <div class="textiles__t">
                                <p>${sortedArray[i].temperature}</p>
                            </div>
                            <div class="textiles__weight">
                                <p>${sortedArray[i].weight}</p>
                            </div>
                            <div class="textiles__max__wash">
                                <p>${sortedArray[i].maxWash}</p>
                            </div>
                            <div class="textiles__status">
                                <p>${sortedArray[i].status}</p>
                            </div>
                            <div class="textiles__deviation">
                                <p>${sortedArray[i].deviation ? sortedArray[i].deviation : '-'}</p>
                            </div>
                            <div class="textiles__rfid">
                                <p>${sortedArray[i].rfid}</p>
                            </div>
                            <div class="textiles__track">
                                <img style="display: ${sortedArray[i].track ? 'none' : 'block'}" src="../../src/SystemAdmin/Track.png" alt="" id="track${sortedArray[i].id}">
                                <img style="display: ${sortedArray[i].track ? 'block' : 'none'}" src="../../src/SystemAdmin/Cancel.png" alt="" id="cancelTrack${sortedArray[i].id}">
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
        const trackButtons = document.querySelectorAll(`[id^="track"]`)
        trackButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const sortedArrayId = event.target.id.slice(5);
                const index = sortedArray.findIndex(customer => customer.id == sortedArrayId);

                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    rfid: `${sortedArray[index].rfid}`,
                    action: `Tracked textile ${sortedArray[index].name}`,
                    resident: `${sortedArray[index].residents}`,
                    customer: `${sortedArray[index].name}`,
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: true,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))

                sortedArray[index].track = true
                localStorage.setItem('customers', JSON.stringify(customersQuery));
                dialog.style.display = 'flex'
                dialogContent.style = 'display: flex; align-items: center;'
                dialogContent.innerHTML =
                    `
                    <p style="float: left;">The search has been started on xx device</p>
                    <img style="margin-left: 16px" src="../../src/SystemAdmin/Cancel.png" alt="" id="closeWindow">
                    `
                const closeWindow = document.querySelector('#closeWindow')
                closeWindow.addEventListener('click', () => {
                    dialog.style.display = 'none'
                    dialogContent.innerHTML = ''
                })
                updateList()
            })
        })
        const cancelTrackButtons = document.querySelectorAll(`[id^="cancel"]`)
        cancelTrackButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const sortedArrayId = event.target.id.slice(11);
                const index = sortedArray.findIndex(customer => customer.id == sortedArrayId);
                sortedArray[index].track = false
                localStorage.setItem('customers', JSON.stringify(customersQuery));
                updateList()
                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    rfid: `${sortedArray[index].rfid}`,
                    action: `Canceled track textile ${sortedArray[index].name}`,
                    resident: `${sortedArray[index].residents}`,
                    customer: `${sortedArray[index].name}`,
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: false,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
            })
        })
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const customerId = event.target.id;
                const index = sortedArray.findIndex(customer => customer.id == customerId);
                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    rfid: `${sortedArray[index].rfid}`,
                    action: `Deleted textile ${sortedArray[index].name}`,
                    resident: `${sortedArray[index].residents}`,
                    customer: `${sortedArray[index].name}`,
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: false,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
                sortedArray.splice(index, 1);
                localStorage.setItem('customers', JSON.stringify(sortedArray));
                updateList()

            })
        });
        let name = '-'
        let category = '-'
        let size = '-'
        let temperature = '-'
        let weight = '-'
        let maxWashed = 'Unlimited'
        let color = 'gray'
        let resident = '-'
        const editButtons = document.querySelectorAll('.edit img');
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const customersQuery = JSON.parse(localStorage.getItem('customers'))
                const customerId = event.target.id.slice(4);
                const index = customersQuery.findIndex(customer => customer.id == customerId);
                const residentsQuery = JSON.parse(localStorage.getItem('residents'))
                const categoriesQuery = JSON.parse(localStorage.getItem('categories'))
                const sizesQuery = JSON.parse(localStorage.getItem('sizes'))
                const temperaturesQuery = JSON.parse(localStorage.getItem('temperatures'))
                dialog.style.display = 'flex'
                dialogContent.innerHTML =
                    `
                        <div class="add__form">
                            <h2>Edit Textile ${customersQuery[index].name}</h2>
                            <div class="form__add__column">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Company Name</p>
                                </div>
                                <div class="select__wrapper">
                                    <select id="category">
                                        <option value="-">-</option>
                                        ${categoriesQuery.map(category => {
                                            return `<option value="${category.name}">${category.name}</option>`
                                        })}}
                                    </select>
                                    <p>Category</p>
                                </div>
                                <div class="select__wrapper">
                                    <select id="size">
                                        <option value="-">-</option>
                                        ${sizesQuery.map(size => {
                                            return `<option value="${size.size}">${size.size}</option>`
                                        })}}
                                    </select>
                                    <p>Size</p>
                                </div>
                                <div class="select__wrapper">
                                    <select id="temperature">
                                        <option value="-">-</option>
                                        ${temperaturesQuery.map(temperature => {
                                            return `<option value="${temperature.temperature}">${temperature.temperature}</option>`
                                        })}}
                                    </select>
                                    <p>Temperature</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="weight">
                                    <p>Weight</p>
                                </div>
                                <div class="input__wrapper">
                                    <input type="text" id="maxWashed" placeholder="Unlimited">
                                    <p>Max Times Washed</p>
                                </div>                                
                                <div class="select__wrapper">
                                    <select id="resident">
                                        <option value="-">-</option>
                                        ${residentsQuery.map(resident => {
                                            return `<option value="${resident.identify}">${resident.identify}</option>`
                                        })}}
                                    </select>
                                    <p>Resident</p>
                                </div>
                                <div class="select__wrapper">
                                    <select id="color">
                                        <option value="-">-</option>
                                        ${colorsQuery.map(color => {
                                            return `<option style="background-color: ${color.value}" value="${color.value}">${color.value}</option>`
                                        })}}
                                    </select>
                                    <p>Color</p>
                                </div>
                            </div>
                            <button id="save">Save</button>
                        </div>
                `
                let nameInput = document.querySelector('#name')
                nameInput.addEventListener('input', () => {name = nameInput.value})
                let categoryInput = document.querySelector('#category')
                categoryInput.addEventListener('input', () => {category = categoryInput.value})
                let sizeInput = document.querySelector('#size')
                sizeInput.addEventListener('input', () => {size = sizeInput.value})
                let temperatureInput = document.querySelector('#temperature')
                temperatureInput.addEventListener('input', () => {temperature = temperatureInput.value})
                let weightInput = document.querySelector('#weight')
                weightInput.addEventListener('input', () => {weight = weightInput.value})
                let maxWashedInput = document.querySelector('#maxWashed')
                maxWashedInput.addEventListener('input', () => {maxWashed = maxWashedInput.value})
                let colorInput = document.querySelector('#color')
                colorInput.addEventListener('change', () => {color = colorInput.value})
                let residentInput = document.querySelector('#resident')
                residentInput.addEventListener('change', () => {resident = residentInput.value})
                const saveButton = document.querySelector('#save')
                saveButton.addEventListener('click', () => {
                    name === '-' ? name = customersQuery[index].name : name = name
                    category === '-' ? category = customersQuery[index].category : category = category
                    size === '-' ? size = customersQuery[index].size : size = size
                    temperature === '-' ? temperature = customersQuery[index].temperature : temperature = temperature
                    weight === '-' ? weight = customersQuery[index].weight : weight = weight
                    maxWashed === 'Unlimited' ? maxWashed = customersQuery[index].maxWash : maxWashed = maxWashed
                    color === 'gray' ? color = customersQuery[index].color : color = color
                    resident === '-' ? resident = customersQuery[index].residents : resident = resident
                    customersQuery[index].name = name
                    customersQuery[index].category = category
                    customersQuery[index].size = size
                    customersQuery[index].temperature = temperature
                    customersQuery[index].weight = weight
                    customersQuery[index].color = color
                    customersQuery[index].residents = resident
                    customersQuery[index].maxWash = maxWashed
                    localStorage.setItem('customers', JSON.stringify(customersQuery))
                    dialog.style.display = 'none'
                    dialogContent.innerHTML = ''
                    textilesPage()
                    const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0');
                    const day = String(now.getDate()).padStart(2, '0');
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');

                    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    const newLog = {
                        id: systemLogQuery.length,
                        rfid: `${customersQuery[index].rfid}`,
                        action: `Edited textile ${customersQuery[index].name}`,
                        resident: `${customersQuery[index].residents}`,
                        customer: `${customersQuery[index].name}`,
                        performedBy: 'Admin',
                        time: formattedDate,
                        track: false,
                    }
                    systemLogQuery.push(newLog)
                    localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
                })
            })
        });
    }

}

function categoriesPage() {

    buttonAdd.innerText = 'Add Category'
    buttonAdd.style.display = ''
    heading.innerHTML =
        `
        <p>All Categories</p>
        `

    const categoriesQuery = JSON.parse(localStorage.getItem('categories'))

    buttonTextiles.classList.remove('page_active')
    buttonCategories.classList.add('page_active')
    buttonColors.classList.remove('page_active')
    buttonTemperatures.classList.remove('page_active')
    buttonSizes.classList.remove('page_active')

    let categoriesQueryCount = Math.ceil(categoriesQuery.length / 10)
    let pageNumber = 1

    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        categoriesQueryCount = Math.ceil(categoriesQuery.length / 20)
        updateButtons()
        updateList()
    })
    const buttonPages = document.querySelector('.button__pages')
    buttonPages.innerHTML = ''
    for(let i = 0; i < categoriesQueryCount; i++){
        buttonPages.innerHTML +=
            `
        <button id="changePage${i}">${i + 1}</button>
        `
    }
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
        for(let i = 0; i < categoriesQueryCount; i++){
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
        if(pageNumber >= categoriesQueryCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }

    updateList()
    function updateList() {
        const categoriesQuery = JSON.parse(localStorage.getItem('categories'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="categories__name">
                                <p>Name</p>
                            </div>
                            <div class="categories__description">
                                <p>Description</p>
                            </div>
                            <div class="categories__created">
                                <p>Created</p>
                            </div>
                            <div class="categories__updated">
                                <p>Updated</p>
                            </div>
                            <div class="categories__created__by">
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
        for (let i = 0; i < categoriesQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="categories__name">
                                <p>${categoriesQuery[i].name}</p>
                            </div>
                            <div class="categories__description">
                                <p>${categoriesQuery[i].description}</p>
                            </div>
                            <div class="categories__created">
                                <p>${categoriesQuery[i].created}</p>
                            </div>
                            <div class="categories__updated">
                                <p>${categoriesQuery[i].updated}</p>
                            </div>
                            <div class="categories__created__by">
                                <p>${categoriesQuery[i].createdBy}</p>
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="edit${categoriesQuery[i].id}">
                            </div>
                            <div class="delete">
                                <img src="../../src/SystemAdmin/Delete.png" alt="" id="${categoriesQuery[i].id}">
                            </div>
                        </div>
                    `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const categoryId = event.target.id;
                const index = categoriesQuery.findIndex(category => category.id == categoryId);
                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    rfid: '-',
                    action: `Deleted category ${categoriesQuery[index].name}`,
                    resident: '-',
                    customer: '-',
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: false,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
                categoriesQuery.splice(index, 1);
                localStorage.setItem('categories', JSON.stringify(categoriesQuery));
                updateList()
            })
        });
    }
    let name = '-'
    let description = '-'
    buttonAdd.addEventListener('click', () => {
        dialog.style.display = 'flex'
        dialogContent.innerHTML =
            `
                        <div class="add__form">
                            <h2>Add Category</h2>
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
        nameInput.addEventListener('keyup', () => {name = nameInput.value})
        let descriptionInput = document.querySelector('#description')
        descriptionInput.addEventListener('keyup', () => {description = descriptionInput.value})
        const saveButton = document.querySelector('#save')
        saveButton.addEventListener('click', () => {
            const currentDate = new Date();
            let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            const userQuery = JSON.parse(localStorage.getItem('user'))
            let id = categoriesQuery.length
            categoriesQuery.forEach(el => {
                if(id == el.id){
                    id++
                }
            })
            const newCategory = {
                id: id,
                name: name,
                description: description,
                created: formattedDate,
                updated: formattedDate,
                createdBy: `${userQuery.firstName} ${userQuery.lastName}`
            }
            categoriesQuery.unshift(newCategory)
            const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const newLog = {
                id: systemLogQuery.length,
                rfid: '-',
                action: `Added category`,
                resident: '-',
                customer: '-',
                performedBy: 'Admin',
                time: formattedDate,
                track: false,
            }
            systemLogQuery.push(newLog)
            localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
            localStorage.setItem('categories', JSON.stringify(categoriesQuery))
            dialog.style.display = 'none'
            dialogContent.innerHTML = ''
            categoriesPage()
        })

    })
    const editButtons = document.querySelectorAll('.edit img');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const categoryId = event.target.id.slice(6);
            const index = categoriesQuery.findIndex(category => category.id == categoryId);
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Edit Category ${categoriesQuery[index].name}</h2>
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
                const currentDate = new Date();
                let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
                categoriesQuery[index].name = name
                categoriesQuery[index].description = description
                categoriesQuery[index].updated = formattedDate
                localStorage.setItem('categories', JSON.stringify(categoriesQuery))

                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    rfid: '-',
                    action: `Edited category ${categoriesQuery[index].name}`,
                    resident: '-',
                    customer: '-',
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: false,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))

                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                categoriesPage()
            })
        })
    });
}
function colorsPage() {

    buttonAdd.innerText = 'Add Color'
    buttonAdd.style.display = ''
    heading.innerHTML =
        `
        <p>All Colors</p>
        `

    const colorsQuery = JSON.parse(localStorage.getItem('colors'))

    buttonTextiles.classList.remove('page_active')
    buttonCategories.classList.remove('page_active')
    buttonColors.classList.add('page_active')
    buttonTemperatures.classList.remove('page_active')
    buttonSizes.classList.remove('page_active')

    let colorsQueryCount = Math.ceil(colorsQuery.length / 10)
    let pageNumber = 1

    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        colorsQueryCount = Math.ceil(colorsQuery.length / 20)
        updateButtons()
        updateList()
    })
    const buttonPages = document.querySelector('.button__pages')
    buttonPages.innerHTML = ''
    for(let i = 0; i < colorsQueryCount; i++){
        buttonPages.innerHTML +=
            `
        <button id="changePage${i}">${i + 1}</button>
        `
    }
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
        for(let i = 0; i < colorsQueryCount; i++){
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
        if(pageNumber >= colorsQueryCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateList()
    function updateList() {
        const colorsQuery = JSON.parse(localStorage.getItem('colors'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="colors__name">
                                <p>Name</p>
                            </div>
                            <div class="colors__value">
                                <p>Value</p>
                            </div>
                            <div class="colors__created">
                                <p>Created</p>
                            </div>
                            <div class="colors__updated">
                                <p>Updated</p>
                            </div>
                            <div class="colors__created__by">
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
        for (let i = 0; i < colorsQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="colors__name">
                                <p>${colorsQuery[i].name}</p>
                            </div>
                            <div class="colors__value">
                                <div class="colors__color__section" style="background: ${colorsQuery[i].value};"></div>
                            </div>
                            <div class="colors__created">
                                <p>${colorsQuery[i].created}</p>
                            </div>
                            <div class="colors__updated">
                                <p>${colorsQuery[i].updated}</p>
                            </div>
                            <div class="colors__created__by">
                                <p>${colorsQuery[i].createdBy}</p>
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="edit${colorsQuery[i].id}">
                            </div>
                            <div class="delete">
                                <img src="../../src/SystemAdmin/Delete.png" alt="" id="${colorsQuery[i].id}">
                            </div>
                        </div>
                    `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const colorId = event.target.id;
                const index = colorsQuery.findIndex(color => color.id == colorId);

                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    rfid: '-',
                    action: `Deleted color ${colorsQuery[index].name}`,
                    resident: '-',
                    customer: '-',
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: false,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))

                colorsQuery.splice(index, 1);
                localStorage.setItem('colors', JSON.stringify(colorsQuery));
                updateList()
            })
        });
    }
    let name = '-'
    let color = 'gray'
    buttonAdd.addEventListener('click', () => {
        dialog.style.display = 'flex'
        dialogContent.innerHTML =
            `
                        <div class="add__form">
                            <h2>Add Category</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Name</p>
                                </div>
                                <div class="color__wrapper">
                                        <p>Color</p>
                                        <input type="color" id="color">
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
        nameInput.addEventListener('keyup', () => {name = nameInput.value})
        let colorInput = document.querySelector('#color')
        colorInput.addEventListener('change', () => {color = colorInput.value})
        const saveButton = document.querySelector('#save')
        saveButton.addEventListener('click', () => {
            const currentDate = new Date();
            let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            const userQuery = JSON.parse(localStorage.getItem('user'))
            let id = colorsQuery.length
            colorsQuery.forEach(el => {
                if(id == el.id){
                    id++
                }
            })
            const newColor = {
                id: id,
                name: name,
                value: color,
                created: formattedDate,
                updated: formattedDate,
                createdBy: `${userQuery.firstName} ${userQuery.lastName}`
            }
            colorsQuery.unshift(newColor)
            localStorage.setItem('colors', JSON.stringify(colorsQuery))
            dialog.style.display = 'none'
            dialogContent.innerHTML = ''
            systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const newLog = {
                id: systemLogQuery.length,
                rfid: '-',
                action: `Added color`,
                resident: '-',
                customer: '-',
                performedBy: 'Admin',
                time: formattedDate,
                track: false,
            }
            systemLogQuery.push(newLog)
            localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
            colorsPage()
        })

    })
    const editButtons = document.querySelectorAll('.edit img');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const colorId = event.target.id.slice(4);
            const index = colorsQuery.findIndex(color => color.id == colorId);
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Edit ${colorsQuery[index].name}</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="name">
                                    <p>Name</p>
                                </div>
                                <div class="color__wrapper">
                                        <p>Color</p>
                                        <input type="color" id="color">
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
            nameInput.addEventListener('keyup', () => {name = nameInput.value})
            let colorInput = document.querySelector('#color')
            colorInput.addEventListener('change', () => {color = colorInput.value})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                const currentDate = new Date();
                let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
                const userQuery = JSON.parse(localStorage.getItem('user'))
                colorsQuery[index].name = name
                colorsQuery[index].value = color
                colorsQuery[index].updated = formattedDate
                localStorage.setItem('colors', JSON.stringify(colorsQuery))
                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    rfid: '-',
                    action: `Edited color ${colorsQuery[index].name}`,
                    resident: '-',
                    customer: '-',
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: false,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                colorsPage()
            })
        })
    });
}
function temperaturesPage() {

    buttonAdd.innerText = 'Add Temperature'
    buttonAdd.style.display = ''
    heading.innerHTML =
        `
        <p>All Temperatures</p>
        `

    const temperaturesQuery = JSON.parse(localStorage.getItem('temperatures'))

    buttonTextiles.classList.remove('page_active')
    buttonCategories.classList.remove('page_active')
    buttonColors.classList.remove('page_active')
    buttonTemperatures.classList.add('page_active')
    buttonSizes.classList.remove('page_active')

    let temperaturesQueryCount = Math.ceil(temperaturesQuery.length / 10)
    let pageNumber = 1

    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        temperaturesQueryCount = Math.ceil(temperaturesQuery.length / 20)
        updateButtons()
        updateList()
    })
    const buttonPages = document.querySelector('.button__pages')
    buttonPages.innerHTML = ''
    for(let i = 0; i < temperaturesQueryCount; i++){
        buttonPages.innerHTML +=
            `
        <button id="changePage${i}">${i + 1}</button>
        `
    }
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
        for(let i = 0; i < temperaturesQueryCount; i++){
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
        if(pageNumber >= temperaturesQueryCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateList()
    function updateList() {
        const colorsQuery = JSON.parse(localStorage.getItem('colors'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="temperatures__temperature">
                                <p>Temperature</p>
                            </div>
                            <div class="temperatures__created">
                                <p>Created</p>
                            </div>
                            <div class="temperatures__updated">
                                <p>Updated</p>
                            </div>
                            <div class="temperatures__created__by">
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
        for (let i = 0; i < temperaturesQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="temperatures__temperature">
                                <p>${temperaturesQuery[i].temperature}</p>
                            </div>
                            <div class="temperatures__created">
                                <p>${temperaturesQuery[i].created}</p>
                            </div>
                            <div class="temperatures__updated">
                                <p>${temperaturesQuery[i].updated}</p>
                            </div>
                            <div class="temperatures__created__by">
                                <p>${temperaturesQuery[i].createdBy}</p>
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="edit${temperaturesQuery[i].id}">
                            </div>
                            <div class="delete">
                                <img src="../../src/SystemAdmin/Delete.png" alt="" id="${temperaturesQuery[i].id}">
                            </div>
                        </div>
                    `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const temperatureId = event.target.id;
                const index = temperaturesQuery.findIndex(temperature => temperature.id == temperatureId);
                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    rfid: '-',
                    action: `Deleted temperature ${temperaturesQuery[index].temperature}`,
                    resident: '-',
                    customer: '-',
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: false,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
                temperaturesQuery.splice(index, 1);
                localStorage.setItem('temperatures', JSON.stringify(temperaturesQuery));
                updateList()
            })
        });
    }
    let temperature = '-'
    buttonAdd.addEventListener('click', () => {
        dialog.style.display = 'flex'
        dialogContent.innerHTML =
            `
                        <div class="add__form">
                            <h2>Add Category</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="temperature">
                                    <p>Temperature</p>
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
        let temperatureInput = document.querySelector('#temperature')
        temperatureInput.addEventListener('keyup', () => {temperature = temperatureInput.value})
        const saveButton = document.querySelector('#save')
        saveButton.addEventListener('click', () => {
            const currentDate = new Date();
            let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            const userQuery = JSON.parse(localStorage.getItem('user'))
            let id = temperaturesQuery.length
            temperaturesQuery.forEach(el => {
                if(id == el.id){
                    id++
                }
            })
            const newTemperature = {
                id: id,
                temperature: temperature,
                created: formattedDate,
                updated: formattedDate,
                createdBy: `${userQuery.firstName} ${userQuery.lastName}`
            }
            temperaturesQuery.unshift(newTemperature)
            localStorage.setItem('temperatures', JSON.stringify(temperaturesQuery))
            dialog.style.display = 'none'
            dialogContent.innerHTML = ''
            const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const newLog = {
                id: systemLogQuery.length,
                rfid: '-',
                action: `Added temperature`,
                resident: '-',
                customer: '-',
                performedBy: 'Admin',
                time: formattedDate,
                track: false,
            }
            systemLogQuery.push(newLog)
            localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
            temperaturesPage()
        })

    })
    const editButtons = document.querySelectorAll('.edit img');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const temperatureId = event.target.id.slice(4);
            const index = temperaturesQuery.findIndex(temperature => temperature.id == temperatureId);
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Edit ${temperaturesQuery[index].temperature}</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="temperature">
                                    <p>Temperature</p>
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
            let temperatureInput = document.querySelector('#temperature')
            temperatureInput.addEventListener('keyup', () => {temperature = temperatureInput.value})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                const currentDate = new Date();
                let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
                temperaturesQuery[index].temperature = temperature
                temperaturesQuery[index].updated = formattedDate
                localStorage.setItem('temperatures', JSON.stringify(temperaturesQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    rfid: '-',
                    action: `Edited temperature ${temperaturesQuery[index].temperature}`,
                    resident: '-',
                    customer: '-',
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: false,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
                temperaturesPage()
            })
        })
    });
}
function sizesPage() {

    buttonAdd.innerText = 'Add Size'
    buttonAdd.style.display = ''
    heading.innerHTML =
        `
        <p>All Sizes</p>
        `

    const sizesQuery = JSON.parse(localStorage.getItem('sizes'))

    buttonTextiles.classList.remove('page_active')
    buttonCategories.classList.remove('page_active')
    buttonColors.classList.remove('page_active')
    buttonTemperatures.classList.remove('page_active')
    buttonSizes.classList.add('page_active')

    let sizesQueryCount = Math.ceil(sizesQuery.length / 10)
    let pageNumber = 1

    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        sizesQueryCount = Math.ceil(sizesQuery.length / 20)
        updateButtons()
        updateList()
    })
    const buttonPages = document.querySelector('.button__pages')
    buttonPages.innerHTML = ''
    for(let i = 0; i < sizesQueryCount; i++){
        buttonPages.innerHTML +=
            `
        <button id="changePage${i}">${i + 1}</button>
        `
    }
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
        for(let i = 0; i < sizesQueryCount; i++){
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
        if(pageNumber >= sizesQueryCount){
            buttonPageNext.disabled = true
        } else {
            buttonPageNext.disabled = false
        }
    }
    updateList()
    function updateList() {
        const sizesQuery = JSON.parse(localStorage.getItem('sizes'))
        contentSection.innerHTML =
            `
                        <div class="row__header">
                            <div class="sizes__size">
                                <p>Size</p>
                            </div>
                            <div class="sizes__created">
                                <p>Created</p>
                            </div>
                            <div class="sizes__updated">
                                <p>Updated</p>
                            </div>
                            <div class="sizes__created__by">
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
        for (let i = 0; i < sizesQuery.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                        <div class="row__content">
                            <div class="sizes__size">
                                <p>${sizesQuery[i].size}</p>
                            </div>
                            <div class="sizes__created">
                                <p>${sizesQuery[i].created}</p>
                            </div>
                            <div class="sizes__updated">
                                <p>${sizesQuery[i].updated}</p>
                            </div>
                            <div class="sizes__created__by">
                                <p>${sizesQuery[i].createdBy}</p>
                            </div>
                            <div class="edit">
                                <img src="../../src/SystemAdmin/Edit.png" alt="" id="edit${sizesQuery[i].id}">
                            </div>
                            <div class="delete">
                                <img src="../../src/SystemAdmin/Delete.png" alt="" id="${sizesQuery[i].id}">
                            </div>
                        </div>
                    `
            }
        }
        const deleteButtons = document.querySelectorAll('.delete img');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const sizeId = event.target.id;
                const index = sizesQuery.findIndex(size => size.id == sizeId);
                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
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
                    rfid: '-',
                    action: `Deleted size ${sizesQuery[index].size}`,
                    resident: '-',
                    customer: '-',
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: false,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
                sizesQuery.splice(index, 1);
                localStorage.setItem('sizes', JSON.stringify(sizesQuery));
                updateList()
            })
        });
    }
    let size = '-'
    buttonAdd.addEventListener('click', () => {
        dialog.style.display = 'flex'
        dialogContent.innerHTML =
            `
                        <div class="add__form">
                            <h2>Add Size</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="size">
                                    <p>Size</p>
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
        let sizeInput = document.querySelector('#size')
        sizeInput.addEventListener('keyup', () => {size = sizeInput.value})
        const saveButton = document.querySelector('#save')
        saveButton.addEventListener('click', () => {
            const currentDate = new Date();
            let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            const userQuery = JSON.parse(localStorage.getItem('user'))
            let id = sizesQuery.length
            sizesQuery.forEach(el => {
                if(id == el.id){
                    id++
                }
            })
            const newSize = {
                id: id,
                size: size,
                created: formattedDate,
                updated: formattedDate,
                createdBy: `${userQuery.firstName} ${userQuery.lastName}`
            }
            sizesQuery.unshift(newSize)
            localStorage.setItem('sizes', JSON.stringify(sizesQuery))
            dialog.style.display = 'none'
            dialogContent.innerHTML = ''
            const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const newLog = {
                id: systemLogQuery.length,
                rfid: '-',
                action: `Added size`,
                resident: '-',
                customer: '-',
                performedBy: 'Admin',
                time: formattedDate,
                track: false,
            }
            systemLogQuery.push(newLog)
            localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
            sizesPage()
        })

    })
    const editButtons = document.querySelectorAll('.edit img');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const sizeId = event.target.id.slice(4);
            const index = sizesQuery.findIndex(size => size.id == sizeId);
            dialog.style.display = 'flex'
            dialogContent.innerHTML =
                `
                        <div class="add__form">
                            <h2>Edit ${sizesQuery[index].size}</h2>
                            <div class="form__add__inner">
                                <div class="input__wrapper">
                                    <input type="text" id="size">
                                    <p>Size</p>
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
            let sizeInput = document.querySelector('#size')
            sizeInput.addEventListener('keyup', () => {size = sizeInput.value})
            const saveButton = document.querySelector('#save')
            saveButton.addEventListener('click', () => {
                const currentDate = new Date();
                let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
                sizesQuery[index].size = size
                sizesQuery[index].updated = formattedDate
                localStorage.setItem('sizes', JSON.stringify(sizesQuery))
                dialog.style.display = 'none'
                dialogContent.innerHTML = ''
                const systemLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const newLog = {
                    id: systemLogQuery.length,
                    rfid: '-',
                    action: `Edited size ${sizesQuery[index].size}`,
                    resident: '-',
                    customer: '-',
                    performedBy: 'Admin',
                    time: formattedDate,
                    track: false,
                }
                systemLogQuery.push(newLog)
                localStorage.setItem('textileLog', JSON.stringify(systemLogQuery))
                sizesPage()
            })
        })
    });
}