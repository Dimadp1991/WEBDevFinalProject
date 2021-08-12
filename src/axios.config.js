
import axios from 'axios'
//	baseURL: 'http://localhost:4000',
const instance = axios.create({
	baseURL: 'https://dimibook-ver1.herokuapp.com/',
	timeout: 50000,

})

export default instance
