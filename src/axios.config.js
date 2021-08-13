
import axios from 'axios'
//	baseURL: 'http://localhost:4000', baseURL: 'https://dimibook-api.herokuapp.com/',
//can add timeout if needed
const instance = axios.create({
	baseURL: 'http://localhost:5000',

})

export default instance
