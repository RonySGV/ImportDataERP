// Requests
import axios from 'axios'

// Config URL
//import { URL } from '../UrlRequest'

// Funtion to get the token
//import GetToken from '../components/users/GetToken'

// Startpoint
const API_AXS = "http://127.0.0.1:8000/importdata"

// Get token
const tokn = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OTEsImV4cCI6MTY3MjA2NDA3NCwiaWF0IjoxNjcyMDYwNDc0LCJkYXRhYmFzZSI6ImRlc2Fycm9sbG8iLCJ3YXJlaG91c2UiOiIwMSIsImlzX3N0YWZmIjp0cnVlLCJhY3Rpdml0aWVzIjoiMSIsImlkX2VtcGxveWVlIjoiNTAifQ.zWpMzbOHlubdxqUhnG6A46EeQ0upUo_M3Lgl3Wha-iA"


// Adiciona un registro de EPK 
export async function postEPK(getform) {
	try {
		const url = API_AXS 

		const config = {
			headers: {
				Authorization: tokn,
				'Content-Type': 'application/json',
			}
		}

		 //alert (JSON.stringify(getform))
		const response = await axios.post(url, getform, config)

		return response
	} catch (error) {
		return undefined
	}
}


// Consulta un registro de EPK - DPK
export async function getEPK(getform) {
	try {
		const url = API_AXS + '/epk/epk'

		const config = {
			headers: {
				Authorization: tokn,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			params: getform
		}

		const response = await axios.get(url, config)
		return response.data

	} catch (error) {
		return undefined
	}
}



// Adiciona un registro de DPK
export async function postDPK(getform) {
	try {
		const url = API_AXS + '/epk/dpk'

		const config = {
			headers: {
				Authorization: tokn,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}

		const response = await axios.post(url, getform, config)

		return response
	} catch (error) {
		return undefined
	}
}

// ELIMINAMOS UN ITEM DE DPK
export async function deletetDPK(getform) {
	try {
		const url = API_AXS + '/epk/dpk'

		const config = {
			headers: {
				Authorization: tokn,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: getform
		}

		const response = await axios.delete(url, config)

		return response.data
	} catch (error) {
		return undefined
	}
}