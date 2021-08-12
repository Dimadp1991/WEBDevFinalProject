
import axios from 'axios'
//	baseURL: 'http://localhost:4000',
const instance = axios.create({
	baseURL: 'https://dimibook-api.herokuapp.com/',
	timeout: 50000,

})

export default instance
