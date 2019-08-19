## Fast and furious App
## About
This is a Car race simulation, single page web application that shows car information from the api (local data json file). Every car has name, description, image and speed. Technologies used are JavaScript, html and css.

## Motivation
> The motivation for this project is a job application for a company named Htec

## Implemented
- Car display in boxes (image, title, description and speed)
- Box flipping and showing extra data
- Search functionality of the cars
- Selecting car functionality 
- Showing road scale
- Showing speed limit signs
- Showing traffic lights
- Changing traffic lights
- Start / car race
- Animating / moving cars based on their speed
- Showing finisher place (medal)

## Next to implement (todos):
- Car race based on road speed limits and trafic lights
- Write tests


## Code style
Keeping to a consistent code style throughout the project makes it easier to contribute and collaborate. 

Style guide that is used on project is: Javascript standard
https://github.com/standard/standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

 
## Screenshots
Full page screenshot

![Display](https://i.ibb.co/9yfc20D/screencapture-localhost-8080-2019-08-19-01-02-54.png)

After hovering the car box we can see extra details about the car

![After hovering the car box](https://i.ibb.co/DDhchDK/download.png)

After selecting the car for the race, each car is displayed in the track

![Choosing cars for the race](https://i.ibb.co/WkPHsQX/Screenshot-2.png)

After starting the race, cars are moved to he right based on their speed. 
Speed limits and traffic lights are displayed on positions from the data json

![Moving](https://i.ibb.co/TWgSQG2/Screenshot-1.png)

After getting to the finish line cars are marked in medal colors. Traffic lights stops to change

![Finish](https://i.ibb.co/XY95M3z/Screenshot-4.png)

## Responsive
Based on the resolution, the display is changed accordingly, breaking into 1 or 2 columns. The application has these breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## Tech/framework used
Tailwind css framework
https://tailwindcss.com/

## Extensions for Visual Studio Code
Javascript standard style guide https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs

Tailwind https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

## Installation
This app requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and start the server.
```sh
$ cd fastandfurious
$ npm install
```

npm install standard --save-dev

npx standard

npx standard --fix

npm install tailwindcss

npx tailwind init --full

npm i -D postcss-loader

npm install xmlhttprequest

## Starting the application
```sh
$ npm run dev
```
## Tests


 © PrograMira