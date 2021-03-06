document.addEventListener('DOMContentLoaded', function (event) {
  init()
  displayCarTrack()
})

function loadJSON (callback) {
  var xobj = new XMLHttpRequest()
  xobj.overrideMimeType('application/json')
  xobj.open('GET', 'data.json', true)
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText)
    }
  }
  xobj.send(null)
}
var actualJSON
var carsOnTrack = []

function init () {
  loadJSON(function (response) {
    // Parse JSON string into object
    actualJSON = JSON.parse(response)

    // Filling the html from the json  
    for (var i = 0; i < actualJSON.cars.length; i++) {
      // console.log(actualJSON.cars[i].description)
      // append each car to our page
      var div = document.createElement('div')
      div.className = 'car my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'
      const someHtml = `
      <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" id="${actualJSON.cars[i].id}">
        </label>
      <div class="flip-card">
        <!-- Article -->
        <article class="h-340 rounded-lg shadow-lg bg-gray-100 flip-card-inner"  onclick="selectCar('${actualJSON.cars[i].id}')">
        
          <div class="flip-card-front">
                <img alt="Placeholder" class="block h-56 w-full relative car-image" src="${actualJSON.cars[i].image}">

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    ${actualJSON.cars[i].name}
                </h1>
            </header>
          </div>
          <div class="flip-card-back">
                <img alt="Placeholder" class="block h-56 w-full relative car-image" src="${actualJSON.cars[i].image}">

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    ${actualJSON.cars[i].name}
                </h1>
            </header>
            <footer class=" flex items-center justify-between leading-none p-2 md:p-4 ">
                <a class="flex items-center no-underline hover:underline text-black" href="#">
                    <p class="ml-2 text-sm">
                    ${actualJSON.cars[i].description}
                    </p>
                    <p class="ml-2 text-sm">
                    ${actualJSON.cars[i].speed}
                    </p>
                </a>
            </footer>
          </div>
        
        </article>
        <!-- END Article -->
        </div>
      `

      div.innerHTML = someHtml
      var mainContainer = document.getElementById('cars')
      mainContainer.appendChild(div)
    }
    // Display the speed limitations 
    displayLimits(actualJSON)
    // Display the semaphores
    displayTrafficLights(actualJSON)
  })
}

function searchCars () {
  // Declare variables
  var input, filter, cars, i
  input = document.getElementById('searchCar')
  filter = input.value.toUpperCase()
  cars = document.querySelectorAll('.car')

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < cars.length; i++) {
    var name = cars[i].querySelector('.name').innerHTML
    if (name.toUpperCase().indexOf(filter) > -1) {
      cars[i].style.display = ''
    } else {
      cars[i].style.display = 'none'
    }
  }
}
function selectCar (i) {
  var selectedCar = document.getElementById(i) // Passing through i to get that car by id 
  var start = document.getElementsByClassName('track') // This will get all tracks

  if (selectedCar.checked == false) { // simple toogle for the check - uncheck
    selectedCar.checked = true 
    for (var j = 0; j < start.length; j++) { // we are going through all starting div to check if it is empty and to set car image in it
      var item = start[j]
      if (item.innerHTML == '') {
        item.innerHTML = `<img alt="Placeholder" class="absolute w-full car-image-race" src="${actualJSON.cars[i - 1].image}" id="car-race-` + i + '">'
        carsOnTrack.push(i)
        break
      }
    }
  } else {
    if (selectedCar.checked == true) {
      selectedCar.checked = false
      removeElement('car-race-' + i)
    }
  }
}
function displayCarTrack () {
  // var units = distance/10;
  for (var i = 0; i < 10; i++) {
    var div = document.createElement('div')
    var div2 = document.createElement('div')
    var div3 = document.createElement('div')   
    div.className = 'flex-grow bg-orange-100 h-12 border-r-2'
    div2.className = 'flex-grow bg-orange-100 h-12 border-r-2'
    div3.className = 'flex-grow bg-orange-100 h-12 border-r-2'
    document.getElementById('car-track-1').appendChild(div)
    document.getElementById('car-track-2').appendChild(div2)
    document.getElementById('car-track-3').appendChild(div3)
  }
}
function removeElement (elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId)
  element.parentNode.removeChild(element)
}
function start () {
  var animationSpeed = document.getElementById('animation-speed').value
  var currentPosition1 = 0
  var currentPosition2 = 0
  var currentPosition3 = 0
  // console.log(carsOnTrack)
  // Getting selected cars on track
  var carRacing1 = document.getElementById('car-race-' + carsOnTrack[0])
  var carRacing2 = document.getElementById('car-race-' + carsOnTrack[1])
  var carRacing3 = document.getElementById('car-race-' + carsOnTrack[2])
  var finisherPlace = []
  // console.log(carRacing1)
  // Getting car speed for each of the selected car
  var car1Speed = actualJSON.cars[carsOnTrack[0] - 1].speed
  var car2Speed = actualJSON.cars[carsOnTrack[1] - 1].speed
  var car3Speed = actualJSON.cars[carsOnTrack[2] - 1].speed
  // console.log(car1Speed)
  var raceDistance = actualJSON.distance
  // Calculating travel time for each time event/interval
  var travelTime1 = (100 * (raceDistance / car1Speed)) / animationSpeed
  var travelTime2 = (100 * (raceDistance / car2Speed)) / animationSpeed
  var travelTime3 = (100 * (raceDistance / car3Speed)) / animationSpeed
  // console.log(travelTime1)
  var finishPoint = 1086 // Finishing position on the page to stop the race at

  var timeEvent1 = setInterval(function () {
    if (currentPosition1 == 1086) {    
      finisherPlace.push(1)
      if (finisherPlace.length == 3) {
        setMedal()
      }
      clearInterval(timeEvent1)
    } else {
      // console.log(currentPosition1)
      currentPosition1++
      carRacing1.style.left = currentPosition1 + 'px'
    }
  }, travelTime1) // 1000 value is 1 sec
  var timeEvent2 = setInterval(function () {
    if (currentPosition2 == finishPoint) {    
      finisherPlace.push(2)
      if (finisherPlace.length == 3) {
        setMedal()
      }
      clearInterval(timeEvent2)
    } else {
      currentPosition2++
      carRacing2.style.left = currentPosition2 + 'px'
    }
  }, travelTime2)
  var timeEvent3 = setInterval(function () {
    if (currentPosition3 == finishPoint) {    
      finisherPlace.push(3)
      if (finisherPlace.length == 3) {
        setMedal()
      }
      clearInterval(timeEvent3)
    } else {
      currentPosition3++
      carRacing3.style.left = currentPosition3 + 'px'
    }
  }, travelTime3)

  // Change traffic lights 
  var red = document.getElementsByClassName('red-lights')[0] // assuming there is only one semaphore
  var green = document.getElementsByClassName('green-lights')[0]
  red.style.opacity = 0.1
  var changeLights = setInterval(changeLight, 3000)

  function changeLight () {
    if (red.style.opacity == 0.1) {
      red.style.opacity = 1
      green.style.opacity = 0.1
    } else {
      red.style.opacity = 0.1
      green.style.opacity = 1
    }
    if (finisherPlace.length == 3) {
      clearInterval(changeLights) // Traffic lights will stop changing colors when the third car reach the finish line
    }
  }

  function setMedal () {
    document.getElementById('track' + finisherPlace[0]).children[0].className += ' gold'
    document.getElementById('track' + finisherPlace[1]).children[0].className += ' silver'
    document.getElementById('track' + finisherPlace[2]).children[0].className += ' bronze'
  }
}
function displayLimits (actualJSON) {
  for (var i = 0; i < actualJSON.speed_limits.length; i++) {
    var div = document.createElement('div')
    div.className = 'absolute shadow mt-3 mx-auto h-20 w-20 text-4xl rounded-full bg-gray-100 border-4 border-red-500 text-center text-gray-600'
    // Calculating the procentage to put the speed limit sign at
    div.style.left = ((100 * actualJSON.speed_limits[i].position) / actualJSON.distance) + '%'
    const sign = `<span class="align-middle">${actualJSON.speed_limits[i].speed}</span>`
    div.innerHTML = sign
    var mainContainer = document.getElementById('limits')
    mainContainer.appendChild(div)
  }
}
function displayTrafficLights (actualJSON) {
  for (var i = 0; i < actualJSON.traffic_lights.length; i++) {
    var div = document.createElement('div')
    div.className = 'absolute shadow h-24 w-12 rounded-lg bg-gray-100 object-center'
    div.style.left = ((100 * actualJSON.traffic_lights[i].position) / actualJSON.distance) + '%'
    const sign = `
            <div class="red-lights mt-3 mx-auto h-8 w-8 rounded-full bg-red-600"></div>
            <div class="green-lights mt-2 mx-auto h-8 w-8 rounded-full bg-green-500"></div>
    `
    div.innerHTML = sign
    var mainContainer = document.getElementById('limits')
    mainContainer.appendChild(div)
  }
}
