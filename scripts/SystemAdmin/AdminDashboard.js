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

const greetingName = document.querySelector('.greetings span')
if(userQuery.gender === 'Male'){
    greetingName.innerText = `Mr.${userQuery.lastName}`
} else if(userQuery.gender === 'Female'){
    greetingName.innerText = `Mrs.${userQuery.lastName}`
}

const manPic = document.querySelector('#man')
const womanPic = document.querySelector('#woman')

if(userQuery.gender === 'Male'){
    womanPic.style = 'display: none;'
    manPic.style = 'display: block'
} else {
    manPic.style = 'display: none'
    womanPic.style = 'display: block;'
}

const todayProc = document.querySelector('.processed__today .card__wrapper')
const totalProc = document.querySelector('.processed__total .card__wrapper')

const date = new Date();
const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

state = []
const ordersPageRequest = JSON.parse(localStorage.getItem('ordersPage'))
ordersPageRequest.forEach(listItem => {
    listItem.orders.forEach(order => {
        if(order.date == formattedDate){
            state.push(order)
        }
    })
})
processedTod[0].count = state.length
state = []
ordersPageRequest.forEach(listItem => {
    listItem.orders.forEach(order => {
        if(order.date == formattedDate){
            state.push(order)
        }
    })
})
processedTod[1].count = state.length
state = []
ordersPageRequest.forEach(listItem => {
    listItem.orders.forEach(order => {
        if(order.date == formattedDate && order.status == 'To wash'){
            state.push(order)
        }
    })
})
processedTod[2].count = state.length
state = []
ordersPageRequest.forEach(listItem => {
    listItem.orders.forEach(order => {
        if(order.date == formattedDate && order.status == 'To dry'){
            state.push(order)
        }
    })
})
processedTod[3].count = state.length
state = []
ordersPageRequest.forEach(listItem => {
    listItem.orders.forEach(order => {
        if(order.date == formattedDate && order.status == 'Ready for sorting'){
            state.push(order)
        }
    })
})
processedTod[4].count = state.length
state = []
ordersPageRequest.forEach(listItem => {
    listItem.orders.forEach(order => {
        if(order.date == formattedDate && order.status == 'Sorted'){
            state.push(order)
        }
    })
})
processedTod[5].count = state.length
state = []
ordersPageRequest.forEach(listItem => {
    listItem.orders.forEach(order => {
        if(order.date == formattedDate && order.status == 'Delivered'){
            state.push(order)
        }
    })
})
processedTod[6].count = state.length

processedTod.map((processed) => {
    todayProc.innerHTML += `<div class="card">
    <img src="../../${processed.img}" alt="">
    <h2>${processed.count}</h2>
    <p>${processed.title}</p>
</div>`;

})

state = []
ordersPageRequest.forEach(listItem => {
    listItem.orders.forEach(order => {
        state.push(order)
    })
})
processedTot[0].count = state.length
state = []
const textileLogQuery = JSON.parse(localStorage.getItem('textileLog'))
textileLogQuery.forEach(listItem => {
    state.push(listItem)
})
processedTot[1].count = state.length
state = []
ordersPageRequest.forEach(listItem => {
    listItem.orders.forEach(order => {
        if(order.status == 'Delivered'){
            state.push(order)
        }
    })
})
processedTot[2].count = state.length
state = []
const customersQuery = JSON.parse(localStorage.getItem('customers'))
customersQuery.forEach(listItem => {
    state.push(listItem)
})
processedTot[3].count = state.length
state = []
const residentsQuery = JSON.parse(localStorage.getItem('residents'))
residentsQuery.forEach(listItem => {
    state.push(listItem)
})
processedTot[4].count = state.length
state = []
const employeersQuery = JSON.parse(localStorage.getItem('employeers'))
employeersQuery.forEach(listItem => {
    state.push(listItem)
})
processedTot[5].count = state.length
state = []
const systemLogQuery = JSON.parse(localStorage.getItem('systemLog'))
systemLogQuery.forEach(listItem => {
    state.push(listItem)
})
processedTot[6].count = state.length

processedTot.map((processedTot) => {
    totalProc.innerHTML += `
    <div class="card">
    <img src="../../${processedTot.img}" alt="">
    <h2>${processedTot.count}</h2>
    <p>${processedTot.title}</p>
</div>
    `
})

const latestProc = []
for(let i = 0; i < processedTod.length; i++){
    latestProc.unshift(processedTod[i])
}