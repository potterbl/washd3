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

textileLogPage()
function textileLogPage() {
    const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))

    const heading = document.querySelector('.wrapper__header')
    heading.innerHTML =
        `
    <select>
        <option value="">Form Type: All</option>
    </select>
    <select id="securityLevel">
        <option value="">Security Level</option>
        ${(() => {
            let state = [];
            return systemLogQuery.map(log => {
                if (state.includes(log.securityLevel)) {
                    return '';
                } else {
                    state.push(log.securityLevel);
                    return `<option value="${log.securityLevel}">${log.securityLevel}</option>`;
                }
            }).join('');
        })()}
    </select>
    <select id="severity">
        <option value="">Severity</option>
        ${(() => {
            let state = [];
            return systemLogQuery.map(log => {
                if (state.includes(log.severity)) {
                    return '';
                } else {
                    state.push(log.severity);
                    return `<option value="${log.severity}">${log.severity}</option>`;
                }
            }).join('');
        })()}
    </select>
    <div class="checkbox__wrapper">
        <input type="checkbox" id="filterSearch">
        <p>Filtered search</p>
    </div>
    `;
    let securityLevel = ''
    let severity = ''
    let filterSearch = document.querySelector('#filterSearch')
    filterSearch.addEventListener('change', () => {
        if(filterSearch.checked){
            return
        } else {
            securityLevelSelect.value = ''
            securityLevel = ''
            severitySelect.value = ''
            severity = ''
            sort()
        }
    })
    let securityLevelSelect = document.querySelector('#securityLevel')
    let severitySelect = document.querySelector('#severity')
    securityLevelSelect.addEventListener('change', () => {
        securityLevel = securityLevelSelect.value
        if(securityLevel !== '' || severity !== ''){
            filterSearch.checked = true
        } else {
            filterSearch.checked = false
        }
        sort()
    })
    severitySelect.addEventListener('change', () => {
        severity = severitySelect.value
        if(severity !== '' || securityLevel !== ''){
            filterSearch.checked = true
        } else {
            filterSearch.checked = false
        }
        sort()
    })
    let filteredLogs = [...systemLogQuery]
    function sort() {
        filteredLogs = systemLog.filter(log => {
            return (log.securityLevel.toLowerCase().match(securityLevel.toLowerCase()) && log.severity.toLowerCase().match(severity.toLowerCase()));
        });

        updateList()
    }


    const contentSection = document.querySelector('.content__section')
    const buttonSystem = document.querySelector('#buttonSystem')

    buttonSystem.classList.add('page_active')

    let filteredLogsCount = Math.ceil(filteredLogs.length / 10)
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
        filteredLogsCount = Math.ceil(filteredLogs.length / 20)
        updateButtons()
        updateList()
    })
    function updateButtons() {
        const buttonPages = document.querySelector('.button__pages')
        buttonPages.innerHTML = ''
        for(let i = 0; i < filteredLogsCount; i++){
            buttonPages.innerHTML +=
                `
            <button id="changePage${i}">${i + 1}</button>
            `
        }
        for(let i = 0; i < filteredLogsCount; i++){
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
        if(pageNumber >= filteredLogsCount){
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
                                <div class="security__level">
                                    <p>Security Level</p>
                                </div>
                                <div class="severity">
                                    <p>Severity</p>
                                </div>
                                <div class="activity">
                                    <p>Customer</p>
                                </div>
                                <div class="description">
                                    <p>Resident</p>
                                </div>
                                <div class="email__username">
                                    <p>Action</p>
                                </div>
                                <div class="occurrence">
                                    <p>Performed by</p>
                                </div>
                            </div>
                `
        for (let i = 0; i < filteredLogs.length; i++) {
            if (i >= (pageNumber - 1) * 10 && i < pageNumber * 10) {
                contentSection.innerHTML +=
                    `
                            <div class="row__content">
                                <div class="security__level">
                                    <p>${filteredLogs[i].securityLevel}</p>
                                </div>
                                <div class="severity">
                                    <p>${filteredLogs[i].severity}</p>
                                </div>
                                <div class="activity">
                                    <p>${filteredLogs[i].activity}</p>
                                </div>
                                <div class="description">
                                    <p>${filteredLogs[i].description}</p>
                                </div>
                                <div class="email__username">
                                    <p>${filteredLogs[i].emailUsername}</p>
                                </div>
                                <div class="occurrence">
                                    <p>${filteredLogs[i].occurrence}</p>
                                </div>
                            </div>
                        `
            }
        }
    }
}