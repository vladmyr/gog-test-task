## GOG.com home assignment ##
#### Description ####
This is a resut of a test task provided by [GOG.com](http://www.gog.com/) as a part of a recruitment process.

### Technological stack ###
Web application constists only of the front-end part. It is built using:
- React as a view layer
- Redux for handling state
- Compass stylesheet authoring environment
- Gulp and webpack as building automation tools
- Various libraries. Worth to mention:
	- [rc-slider](https://github.com/react-component/slider) - slider
	- [react-circular-progress](https://github.com/wmartins/react-circular-progress) - circular progress bar
	- [react-slick](https://github.com/akiran/react-slick) - carousel

### Developer's notes ###
#### Pre-requirements ####
In order to be able to download and install project dependencies you need to have installed [Node.js](https://nodejs.org/en/) with NPM. Project also uses [Compass](http://compass-style.org/) therefore you need to have Ruby installed.

#### How to install? ####
Execute the following commands:
```cmd
git clone https://github.com/vladmyr/gog-test-task
cd gog-test-task
npm install
```
You may also need to install webpack, webpack-dev-server and gulp globally
```cmd
npm install webpack webpack-dev-server gulp -g
```

#### How to run? ####
Inside the root directory of the project execute
```cmd
npm run dev
```
that will transpile and build project's files and run webpack-dev-server. Afer that you can navigate to [http://localhost:8080/webpack-dev-server](http://localhost:8080/webpack-dev-server) to see the result.