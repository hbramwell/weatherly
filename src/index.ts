import axios from 'axios'
import * as sqlite3 from 'sqlite3'
import inquirer from 'inquirer'
import { program } from 'commander'
import { env } from 'process'
import { config } from 'dotenv'

config()

const API_KEY = env.API_KEY

const conn = new sqlite3.Database('./db.locations')

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
