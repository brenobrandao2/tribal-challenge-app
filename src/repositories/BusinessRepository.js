import axios from "axios";
import Constants from "../utils/Constants";

const config = {
    headers: {
        'x-api-key': Constants.API_KEY,
        'Content-Type': 'application/json'
    },
    baseURL: Constants.BASE_URL
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
            throw new Error(error)
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
            throw new Error(error)
        })

        return response
    }

    static async update({ businessId, name }) {
        const url = `/business/${businessId}`
        const body = {
            name
        }
        const response = await axios.put(url, body, config).then(response => {
            return response.data
        }).catch(error => {
            throw new Error(error)
        })

        return response
    }

    static async delete(businessId) {
        const url = `/business/${businessId}`
        const response = await axios.delete(url, config).then(response => {
            return response.data
        }).catch(error => {
            throw new Error(error)
        })

        return response
    }
}