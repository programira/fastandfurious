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
    console.log(response)
    actualJSON = JSON.parse(response)
    console.log(actualJSON.cars.length)
    console.log(actualJSON.cars[2].description)
    // Filling the html from the json  
    for (var i = 0; i < actualJSON.cars.length; i++) {
      console.log(actualJSON.cars[i].description)
      // append each car to our page
      var div = document.createElement('div')
      div.className = 'my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'
      const someHtml = `
        <!-- Article -->
        <article class="overflow-hidden rounded-lg shadow-lg bg-gray-100">

            <a href="#">
                <img alt="Placeholder" class="block h-56 w-full" src="${actualJSON.cars[i].image}">
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black" href="#">
                    ${actualJSON.cars[i].name}
                    </a>
                </h1>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4 hidden">
                <a class="flex items-center no-underline hover:underline text-black" href="#">
                    <p class="ml-2 text-sm">
                    ${actualJSON.cars[i].description}
                    </p>
                </a>
            </footer>

        </article>
        <!-- END Article -->
      `

      div.innerHTML = someHtml
      var mainContainer = document.getElementById('cars')
      mainContainer.appendChild(div)
    }
  })
}
