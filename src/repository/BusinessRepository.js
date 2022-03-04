import axios from "axios";

const config = {
    headers: {
        'x-api-key': 'EoYGX95kDX5I1zYSzczrx47EM4QuFfKh9OIWCeew',
        'Content-Type': 'application/json'
    },
    baseURL: 'https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod'
}

export default class Business {
    constructor(name, businessId) {
        this.name = name
        this.businessId = businessId
    }

    static async getAll() {
        const url = `/business`
        const response = await axios.get(url, config).then(response => {
            return response.data
        }).catch(error => {
            console.log(error)
        })

        return response?.businesses?.map((business) => new Business(business.name, business.businessId)) || []
    }

    static async create(name) {
        const url = `/business`
        const body = {
            name
        }
        const response = await axios.post(url, body, config).then(response => {
            return response.data
        }).catch(error => {
            console.log(error)
        })

        return response
    }

    static async update(businessId, name) {
        const url = `/business/${businessId}`
        const body = {
            name
        }
        const response = await axios.put(url, body, config).then(response => {
            return response.data
        }).catch(error => {
            console.log(error)
        })

        return response
    }

    static async delete(businessId) {
        const url = `/business/${businessId}`
        const response = await axios.delete(url, config).then(response => {
            return response.data
        }).catch(error => {
            console.log(error)
        })

        return response
    }
}