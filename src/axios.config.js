
import axios from 'axios'
//	baseURL: 'http://localhost:4000', baseURL: 'https://dimibook-api.herokuapp.com/',
//can add timeout if needed
const instance = axios.create({
	baseURL: 'https://dimibook-api.herokuapp.com/',

})

export default instance
