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

const headerDateFrom = document.querySelector('#headerDateFrom');
const monthYearFrom = headerDateFrom.querySelector('p');
const prevMonthButtonFrom = document.querySelector('#calendarFromPrev');
const nextMonthButtonFrom = document.querySelector('#calendarFromNext');
const calendarSection = document.querySelector('#calendarBodyFrom');
let currentMonthFrom = new Date().toLocaleString('en-US', { month: 'long' })
const currentDayFrom = new Date().getDate()
let currentDateFrom = new Date();

let chosenPeriodFrom = 0;
const selectFrom = document.querySelector('#selectFrom')
const calendarFrom = document.querySelector('#calendarFrom')
const calendarFromPar = document.querySelector('#calendarFromPar');
selectFrom.addEventListener('click', showCloseCalendarFrom)
function showCloseCalendarFrom(e) {
    if (e.target === calendarFrom || e.target.closest('#calendarFrom')) {
        return;
    }
    calendarFrom.classList.toggle('calendar__shown')
}
fillCalendar();
prevMonthButtonFrom.addEventListener('click', () => {
    currentDateFrom = new Date(currentDateFrom.getFullYear(), currentDateFrom.getMonth() - 1, 1);
    fillCalendar();
});
nextMonthButtonFrom.addEventListener('click', () => {
    currentDateFrom = new Date(currentDateFrom.getFullYear(), currentDateFrom.getMonth() + 1, 1);
    fillCalendar();
});
function fillCalendar() {
    calendarSection.innerHTML =
        `
        <div class="body__row">
            <div class="box__week__from">
                <p>Su</p>
            </div>
            <div class="box__week__from">
                <p>Mo</p>
            </div>
            <div class="box__week__from">
                <p>Tu</p>
            </div>
            <div class="box__week__from">
                <p>We</p>
            </div>
            <div class="box__week__from">
                <p>Th</p>
            </div>
            <div class="box__week__from">
                <p>Fr</p>
            </div>
            <div class="box__week__from">
                <p>Sa</p>
            </div>
        </div>
        `
    const daysInMonth = new Date(currentDateFrom.getFullYear(), currentDateFrom.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDateFrom.getFullYear(), currentDateFrom.getMonth(), 1).getDay();
    const daysInLastWeek = 7 - ((firstDayOfMonth + daysInMonth) % 7);
    const numberOfRows = Math.ceil((daysInMonth + daysInLastWeek) / 7);
    for (let i = 1; i <= numberOfRows; i++) {
        calendarSection.innerHTML += `
            <div class="body__row"></div>
          `;
        const calendarRow = document.querySelectorAll('.body__row');
        for (let j = 1; j <= 7; j++) {
            const dayIndex = (i - 1) * 7 + j - firstDayOfMonth;
            if (dayIndex >= 1 && dayIndex <= daysInMonth) {
                calendarRow[i - 1].innerHTML += `
                    <div class="box__from">
                      <p>${dayIndex}</p>
                    </div>
                  `;
            } else {
                calendarRow[i - 1].innerHTML += `
                    <div class="box__from"></div>
                  `;
            }
        }
    }
    let chosenDay = currentDayFrom
    let chosenMonth = currentMonthFrom
    let month = currentDateFrom.toLocaleString('en-US', { month: 'long' })
    updateDay()
    function updateDay() {
        const boxes = document.querySelectorAll('.box__from p')
        boxes.forEach(box => {
            if (box.textContent == chosenDay && month == chosenMonth) {
                box.style = 'text-decoration: underline blue 2px;'
            } else {
                box.style = ''
            }
            box.addEventListener('click', () => {
                chosenDay = box.innerText
                chosenMonth = month
                calendarFromPar.textContent = `${month.slice(0, 3)} / ${chosenDay} / ${currentDateFrom.getFullYear()}`
                let year = currentDateFrom.getFullYear();
                let monthIndex = currentDateFrom.getMonth() + 1;
                let day = box.innerText.padStart(2, '0');
                chosenPeriodFrom = `${year}-${monthIndex}-${day}`
                updateDay()
                sort()
            })
        })
    }
    monthYearFrom.textContent = `${currentDateFrom.toLocaleString('en-US', { month: 'long' })} ${currentDateFrom.getFullYear()}`;
}

const headerDateTo = document.querySelector('#headerDateTo');
const monthYearTo = headerDateTo.querySelector('p');
const prevMonthButtonTo = document.querySelector('#calendarToPrev');
const nextMonthButtonTo = document.querySelector('#calendarToNext');
const calendarSectionTo = document.querySelector('#calendarBodyTo');
let currentMonthTo = new Date().toLocaleString('en-US', { month: 'long' })
const currentDayTo = new Date().getDate()
let currentDateTo = new Date();

let chosenPeriodTo = new Date(currentDateTo.getFullYear() + 20, currentDateTo.getMonth() , 1);


const selectTo = document.querySelector('#selectTo')
const calendarTo = document.querySelector('#calendarTo')
const calendarToPar = document.querySelector('#calendarToPar');
selectTo.addEventListener('click', showCloseCalendarTo)
function showCloseCalendarTo(e) {
    if (e.target === calendarTo || e.target.closest('#calendarTo')) {
        return;
    }
    calendarTo.classList.toggle('calendar__shown')
}
fillCalendarTo();
prevMonthButtonTo.addEventListener('click', () => {
    currentDateTo = new Date(currentDateTo.getFullYear(), currentDateTo.getMonth() - 1, 1);
    fillCalendarTo();
});
nextMonthButtonTo.addEventListener('click', () => {
    currentDateTo = new Date(currentDateTo.getFullYear(), currentDateTo.getMonth() + 1, 1);
    fillCalendarTo();
});
function fillCalendarTo() {
    calendarSectionTo.innerHTML =
        `
        <div class="body__row">
            <div class="box__week__to">
                <p>Su</p>
            </div>
            <div class="box__week__to">
                <p>Mo</p>
            </div>
            <div class="box__week__to">
                <p>Tu</p>
            </div>
            <div class="box__week__to">
                <p>We</p>
            </div>
            <div class="box__week__to">
                <p>Th</p>
            </div>
            <div class="box__week__to">
                <p>Fr</p>
            </div>
            <div class="box__week__to">
                <p>Sa</p>
            </div>
        </div>
        `
    const daysInMonth = new Date(currentDateTo.getFullYear(), currentDateTo.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDateTo.getFullYear(), currentDateTo.getMonth(), 1).getDay();
    const daysInLastWeek = 7 - ((firstDayOfMonth + daysInMonth) % 7);
    const numberOfRows = Math.ceil((daysInMonth + daysInLastWeek) / 7);
    for (let i = 1; i <= numberOfRows; i++) {
        calendarSectionTo.innerHTML += `
            <div class="body__row__to"></div>
          `;
        const calendarRow = document.querySelectorAll('.body__row__to');
        for (let j = 1; j <= 7; j++) {
            const dayIndex = (i - 1) * 7 + j - firstDayOfMonth;
            if (dayIndex >= 1 && dayIndex <= daysInMonth) {
                calendarRow[i - 1].innerHTML += `
                    <div class="box__to">
                      <p>${dayIndex}</p>
                    </div>
                  `;
            } else {
                calendarRow[i - 1].innerHTML += `
                    <div class="box__to"></div>
                  `;
            }
        }
    }
    let chosenDay = currentDayTo
    let chosenMonth = currentMonthTo
    let month = currentDateTo.toLocaleString('en-US', { month: 'long' })
    updateDay()
    function updateDay() {
        const boxes = document.querySelectorAll('.box__to p')
        boxes.forEach(box => {
            if (box.textContent == chosenDay && month == chosenMonth) {
                box.style = 'text-decoration: underline blue 2px;'
            } else {
                box.style = ''
            }
            box.addEventListener('click', () => {
                chosenDay = box.innerText
                chosenMonth = month
                calendarToPar.textContent = `${month.slice(0, 3)} / ${chosenDay} / ${currentDateTo.getFullYear()}`
                let year = currentDateTo.getFullYear();
                let monthIndex = currentDateTo.getMonth() + 1;
                let day = box.innerText.padStart(2, '0');
                chosenPeriodTo = `${year}-${monthIndex}-${day}`
                updateDay()
                sort()
            })
        })
    }
    monthYearTo.textContent = `${currentDateTo.toLocaleString('en-US', { month: 'long' })} ${currentDateTo.getFullYear()}`;
}
const textileLogQuery = JSON.parse(localStorage.getItem('textileLog'))
let filteredLog = [...textileLogQuery]
let customer = ''
let customerSelect = ''
selectCustomer()
function selectCustomer() {
    const customersQuery = JSON.parse(localStorage.getItem('customers'))
    const customerSelectSection = document.querySelector('.customer__select')
    customerSelectSection.innerHTML =
        `
            <select id="customersSort">
                <option value="">All Customers</option>
                ${customersQuery.map(customer => {
                    return `<option value="${customer.name}">${customer.name}</option>`
                })}
            </select>
        `
    customerSelect = document.querySelector('#customersSort')
    customerSelect.addEventListener('change', () => {
        customer = customerSelect.value
        sort()
    })
}
let action = ''
let actionsSelect = ''
actionCustomer()
function actionCustomer() {
    const actionsQuery = JSON.parse(localStorage.getItem('actions'))
    const actionSelectSection = document.querySelector('.action__select')
    actionSelectSection.innerHTML =
        `
            <select id="actionsSort">
                <option value="">All Actions</option>
                ${actionsQuery.map(customer => {
                    return `<option value="${customer.action}">${customer.action}</option>`
                })}
            </select>
        `
    actionsSelect = document.querySelector('#actionsSort')
    actionsSelect.addEventListener('change', () => {
        action = actionsSelect.value
        sort()
    })
}


function sort() {
    const customersQuery = JSON.parse(localStorage.getItem('customers'))
    filteredLog = textileLogQuery.filter(item => {
        const itemDate = new Date(item.time);
        const fromDate = new Date(chosenPeriodFrom);
        const toDate = new Date(chosenPeriodTo);
        return itemDate >= fromDate && itemDate <= toDate;
    });

    if (customer !== '') { // check if customer is not empty
        filteredLog = filteredLog.filter(item => {
            const customerObj = customersQuery.find(c => c.name === item.customer); // get the customer object corresponding to the current item
            return customerObj && customerObj.name.toLowerCase().includes(customer.toLowerCase()); // check if the customer value is contained within the name property of the customer object
        });
    }

    if (action !== '') { // check if action is not empty
        filteredLog = filteredLog.filter(item => {
            const customerObj = customersQuery.find(c => c.action === item.action); // get the customer object corresponding to the current item
            return customerObj && customerObj.action.toLowerCase().includes(action.toLowerCase()); // check if the action value is contained within the action property of the customer object
        });
    }
    console.log(filteredLog)
    textileLogPage();
}


const resetAllButton = document.querySelector('#resetAll')
resetAllButton.addEventListener('click', () => {
    customerSelect.value = ""
    actionsSelect.value = ""
    chosenPeriodTo = new Date(currentDateTo.getFullYear() + 20, currentDateTo.getMonth() , 1);
    chosenPeriodFrom = 0
    calendarFromPar.textContent = 'mm / dd / yyyy'
    calendarToPar.textContent = 'mm / dd / yyyy'
    filteredLog = [...textileLogQuery]
    textileLogPage()
})

textileLogPage()
function textileLogPage() {

    const contentSection = document.querySelector('.content__section')
    const buttonTextiles = document.querySelector('#buttonTextiles')

    buttonTextiles.classList.add('page_active')

    let  filteredLogCount = Math.ceil(filteredLog.length / 10)
    let pageNumber = 1

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
    let showPerPage = 10
    const buttonMore = document.querySelector('.footer__left button')
    buttonMore.classList.remove('button__more')
    buttonMore.addEventListener('click', () => {
        buttonMore.classList.add('button__more')
        pageNumber > 1 ? pageNumber -= 1 : pageNumber = pageNumber
        showPerPage = 20
        filteredLogCount = Math.ceil(filteredLog.length / 20)
        updateButtons()
        updateList()
    })
    function updateButtons() {
        const buttonPages = document.querySelector('.button__pages')
        buttonPages.innerHTML = ''
        for(let i = 0; i < filteredLogCount; i++){
            buttonPages.innerHTML +=
                `
            <button id="changePage${i}">${i + 1}</button>
            `
        }
        for(let i = 0; i < filteredLogCount; i++){
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
        if(pageNumber >= filteredLogCount){
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
                                <div class="time">
                                    <p>Time</p>
                                </div>
                                <div class="rfid">
                                    <p>RFID</p>
                                </div>
                                <div class="customer">
                                    <p>Customer</p>
                                </div>
                                <div class="resident">
                                    <p>Resident</p>
                                </div>
                                <div class="action">
                                    <p>Action</p>
                                </div>
                                <div class="performed__by">
                                    <p>Performed by</p>
                                </div>
                                <div class="track">
                                    <p>Track</p>
                                </div>
                            </div>
                `
        for (let i = 0; i < filteredLog.length; i++) {
            if (i >= (pageNumber - 1) * showPerPage && i < pageNumber * showPerPage) {
                contentSection.innerHTML +=
                    `
                            <div class="row__content">
                                <div class="time">
                                    <p>${filteredLog[i].time}</p>
                                </div>
                                <div class="rfid">
                                    <p>${filteredLog[i].rfid}</p>
                                </div>
                                <div class="customer">
                                    <p>${filteredLog[i].customer}</p>
                                </div>
                                <div class="resident">
                                    <p>${filteredLog[i].resident}</p>
                                </div>
                                <div class="action">
                                    <p>${filteredLog[i].action}</p>
                                </div>
                                <div class="performed__by">
                                    <p>${filteredLog[i].performedBy}</p>
                                </div>
                                <div class="track">
                                    <img style="display: ${filteredLog[i].track ? 'block' : 'none'} " src="../../src/SystemAdmin/Cancel.png" alt="" id="cancel${filteredLog[i].id}">
                                    <img style="display: ${filteredLog[i].track ? 'none' : 'block'}" src="../../src/SystemAdmin/Track.png" alt="" id="track${filteredLog[i].id}">
                                </div>
                            </div>
                        `
            }
        }
        const trackButtons = document.querySelectorAll(`[id^="track"]`)
        trackButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const dialog = document.querySelector('.dialog')
                const dialogContent = document.querySelector('.dialog__content')
                const sortedArrayId = event.target.id.slice(5);
                const textileLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const index = filteredLog.findIndex(customer => customer.id == sortedArrayId);
                filteredLog[index].track = !filteredLog[index].track
                textileLogQuery[index].track = !textileLogQuery[index].track
                localStorage.setItem('textileLog', JSON.stringify(textileLogQuery));
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
                const sortedArrayId = event.target.id.slice(6);
                const textileLogQuery = JSON.parse(localStorage.getItem('textileLog'))
                const index = filteredLog.findIndex(customer => customer.id == sortedArrayId);
                filteredLog[index].track = !filteredLog[index].track
                textileLogQuery[index].track = !textileLogQuery[index].track
                localStorage.setItem('textileLog', JSON.stringify(textileLogQuery));
                updateList()
            })
        })
    }
}

