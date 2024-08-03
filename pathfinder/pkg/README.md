# pathfinder

## Building for wasm

Run the following command to compile the app to wasm

```
wasm-pack build --release --target=web
```

## Running example app

The example app is an HTML web page which uses leaflet to display a map. It fetches the toronto.pbf file, passes it to the compiled pathfinder and retrieves a set of instructions and navigation path that then get inserted into the map. In order to run wasm and fetch the pbf file the index.html file needs to be accessed through a web server, not directly off the file system. An easy tool to do this is `http-server`. It can be installed either with homebrew or npm:

Homebrew:

```
brew install http-server
```

Npm:

```
npm i -g http-server
```

Then just run this command to serve the folder's contents:

```
http-server
```

Now visit `localhost:8080` to see the app in action.