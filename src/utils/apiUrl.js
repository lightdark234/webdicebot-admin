const URL = {
    DEV: 'http://localhost:8001',
    PROD: 'https://api.webdicebot.xyz'
}

const API_URL = window.location.hostname == 'localhost' ? URL.DEV : URL.PROD

export default API_URL