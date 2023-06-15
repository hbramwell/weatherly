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
		'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY, city TEXT)'
	)
})

async function getWeather(city: string): Promise<any> {
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
	const response = await axios.get(url)
	return response.data
}
