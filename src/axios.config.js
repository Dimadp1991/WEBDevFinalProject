
import axios from 'axios'
//	baseURL: 'http://localhost:4000',
const instance = axios.create({
	baseURL: 'https://dimibook-api.herokuapp.com/',

})

export default instance
