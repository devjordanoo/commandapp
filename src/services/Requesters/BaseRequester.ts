import Axios from 'axios'
import { ENV } from '@/lib/config'

class BaseRequester {
    _instace = Axios.create({
        baseURL: ENV.API_URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export { BaseRequester }