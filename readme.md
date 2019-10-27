# Weather Forecast
This CLI app is indented to parse a user input of a location, and provide overview of the weather for the location

# Caveats
1. Currently only works with city names

# Install
On your favourite CLI, run (replace ssh with https if ssh is not set)
```
npm install -g git+ssh://git@github.com:kairun/weather-cli.git#1.0.1
```

if don't want to install through npm, then clone the repo, and
```
npm link
weather-cli
```

if don't want to symlink or install, then clone the repo, and just
```
npm run weather-cli
```

When prompted, enter a city name. If city name is ambiguous, provide country code followed by comma (e.g. `London, UK`)

# Uninstall
If npm global installed,
```
npm uninstall weather-cli
```

If symlinked,
```
npm unlink
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
