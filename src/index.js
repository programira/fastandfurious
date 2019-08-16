document.addEventListener('DOMContentLoaded', function (event) {
  init()
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
            <a href="#">
                <img alt="Placeholder" class="block h-56 w-full relative car-image" src="${actualJSON.cars[i].image}">
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="name no-underline hover:underline text-black" href="#">
                    ${actualJSON.cars[i].name}
                    </a>
                </h1>
            </header>
          </div>
          <div class="flip-card-back">
            <a href="#">
                <img alt="Placeholder" class="block h-56 w-full relative car-image" src="${actualJSON.cars[i].image}">
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="name no-underline hover:underline text-black" href="#">
                    ${actualJSON.cars[i].name}
                    </a>
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
  var selectedCar =  document.getElementById(i)
  if (selectedCar.checked == false) {
    selectedCar.checked = true 
  } else {
    if (selectedCar.checked == true) {
      selectedCar.checked = false
    }
  }
}
