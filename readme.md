# Weather Forecast
This CLI app is indented to parse a user input of a location, and provide overview of the weather for the location

# Caveats
1. Currently only works with city names

# Install
On your favourite CLI, run
```
npm link
weather-cli
```

instead, if want to install globally instead of `npm link`,
```
npm install -g ./
```

if don't want to symlink or install, then just
```
npm run weather-cli
```

When prompted, enter a city name. If city name is ambiguous, provide country code followed by comma (e.g. `London, UK`)

# Uninstall
If symlinked,
```
npm unlink
```

If npm global installed,
```
npm uninstall weather-cli
```

# Develop
On your favourite CLI, run
```
npm run dev
```

`dev` because this project is written with TDD

# Version history
## 1.0.1
Bin link is added for running without npm run

## 1.0.0
Initial release
