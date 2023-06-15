## Weatherly - A CLI Weather Forecast App

Weatherly is a command-line interface (CLI) application that allows users to retrieve weather forecasts for specific cities and manage saved locations. It provides a seamless and interactive experience for accessing weather information using the OpenWeatherMap API.

### Installation

To install Weatherly, follow these steps:

1. Clone the repository from GitHub: `git clone https://github.com/your-username/weatherly.git`
2. Navigate to the project directory: `cd weatherly`
3. Install the dependencies: `npm install`
4. Run the application: `npm start`

### Usage

Weatherly offers the following commands:

#### Get Command

The `get` command retrieves the weather forecast for a specific city.

```shell
$ weatherly get <city>
```

Replace `<city>` with the name of the city for which you want to retrieve the weather forecast.

#### Show Command

The `show` command displays the list of saved locations.

```shell
$ weatherly show
```

#### Delete Command

The `delete` command removes a saved location from the list.

```shell
$ weatherly delete <city>
```

Replace `<city>` with the name of the city you want to delete from the saved locations.

### Examples

Here are a few examples to illustrate how to use Weatherly:

1. Retrieve the weather forecast for London and save it as a location:

```shell
$ weatherly get London
$ Do you want to save this location? (y/n): y
```

2. Show the list of saved locations:

```shell
$ weatherly show
```

3. Delete a saved location:

```shell
$ weatherly delete Paris
```

### Dependencies

Weatherly relies on the following dependencies:

- `axios`: For making HTTP requests to the OpenWeatherMap API.
- `inquirer`: For interactive prompts and confirmations.
- `commander`: For creating the CLI interface and handling commands.
- `dotenv`: For loading environment variables.
- `sqlite3`: For managing the SQLite database.

Make sure these dependencies are installed by running `npm install` before using Weatherly.

### Credits

Weatherly was developed by brmwll as a showcase application using the OpenWeatherMap API.

### License

This project is licensed under the [LICENSE](LICENSE).

