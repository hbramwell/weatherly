import axios from 'axios'
import inquirer from 'inquirer'
import { program } from 'commander'
import { env } from 'process'
import { config } from 'dotenv'
import sqlite3 from 'sqlite3'

config()

const API_KEY = env.API_KEY

if (!API_KEY) {
	console.error('API key not found')
	process.exit(1)
}

const conn = new sqlite3.Database('weather.db')

conn.serialize(() => {
	conn.run(
		'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY, city TEXT)',
		(err) => {
			if (err) {
				console.error('Failed to create locations table:', err)
				process.exit(1)
			} else {
				console.log('Locations table created successfully')
			}
		}
	)
})

async function getWeather(city: string): Promise<any> {
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
	try {
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		console.error(error)
	}
}

function saveLocation(city: string): void {
	conn.run('INSERT INTO locations (city) VALUES (?)', [city], (err) => {
		if (err) {
			console.error('Failed to save location:', err)
		} else {
			console.log(`Location "${city}" saved successfully`)
		}
	})
}

function showSavedLocations(): Promise<any[]> {
	return new Promise((resolve, reject) => {
		conn.all('SELECT * FROM locations', (err, rows) => {
			if (err) {
				reject(new Error(`Failed to retrieve locations: ${err.message}`))
			} else {
				resolve(rows)
			}
		})
	})
}

function deleteLocation(city: string): void {
	conn.run('DELETE FROM locations WHERE city = ?', [city], (err) => {
		if (err) {
			console.error('Failed to delete location:', err)
		} else {
			console.log(`Location "${city}" deleted successfully`)
		}
	})
}

async function main(): Promise<void> {
	program
		.name('Weather App')
		.description('A simple weather forecast application')
		.version('1.0.0')

	program
		.command('get <city>')
		.description('Get weather forecast by city name')
		.action(async (city: string) => {
			try {
				const weatherData = await getWeather(city)
				console.log(weatherData)

				const { save } = await inquirer.prompt([
					{
						type: 'confirm',
						name: 'save',
						message: 'Do you want to save this location?',
						default: false,
					},
				])

				if (save) {
					saveLocation(city)
				}
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message)
				}
			}
		})

	program
		.command('show')
		.description('Show saved locations')
		.action(async () => {
			try {
				const locations = await showSavedLocations()
				locations.forEach((location) => console.log(location))
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message)
				}
			}
		})

	program
		.command('delete <city>')
		.description('Delete a saved location')
		.action(async (city: string) => {
			try {
				deleteLocation(city)
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message)
				}
			}
		})

	try {
		await program.parseAsync(process.argv)
	} catch (error) {
		console.error('An error occurred:', error)
	}
}

main()
