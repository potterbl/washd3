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

const contentSection = document.querySelector('.inner__wrapper')
const printersQuery = JSON.parse(localStorage.getItem('printers'))

contentSection.innerHTML =
    `
                <div class="heading">
                    <div class="name">
                        <p>Printer Name</p>
                    </div>
                    <div class="assigned">
                        <p>Assigned</p>
                    </div>
                    <div class="last__seen">
                        <p>Last Seen</p>
                    </div>
                    <div class="last__status">
                        <p>Last Status</p>
                    </div>
                    <div class="mac">
                        <p>MAC</p>
                    </div>
                    <div class="wan__ip">
                        <p>WAN IP</p>
                    </div>
                    <div class="testprint">
                        <p>Send Testprint</p>
                    </div>
                    <div class="live__status">
                        <p>Live Status</p>
                    </div>
                    <div class="printer__log">
                        <p>Printer Queue/Log</p>
                    </div>
                    <div class="edit">
                        <p>Edit</p>
                    </div>
                </div>
    `

printersQuery.forEach(printer => {
    contentSection.innerHTML +=
        `
                <div class="row">
                    <div class="name">
                        <p>${printer.name}</p>
                    </div>
                    <div class="assigned">
                        <p>${printer.assigned}</p>
                    </div>
                    <div class="last__seen">
                        <p>${printer.lastSeen}</p>
                    </div>
                    <div class="last__status">
                        <p>${printer.lastStatus}</p>
                    </div>
                    <div class="mac">
                        <p>${printer.mac}</p>
                    </div>
                    <div class="wan__ip">
                        <p>${printer.wan}</p>
                    </div>
                    <div class="testprint">
                        <img src="../../src/SystemAdmin/TestPrint.png" alt="" id="tp${printer.id}">
                    </div>
                    <div class="live__status">
                        <img src="../../src/SystemAdmin/LiveStatus.png" alt="" id="live${printer.id}">
                    </div>
                    <div class="printer__log">
                        <img src="../../src/SystemAdmin/PrinterLog.png" alt="" id="log${printer.id}">
                    </div>
                    <div class="edit">
                        <img src="../../src/SystemAdmin/Edit.png" alt="" id="${printer.id}">
                    </div>
                </div>
        `
})