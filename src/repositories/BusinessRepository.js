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

    /**
     * Returns all businesses
     * @returns {Array<Business>} list of businesses
     */
    static async getAll() {
        const url = `/business`
        const response = await axios.get(url, config).then(response => {
            return response.data
        }).catch(error => {
            throw new Error(error)
        })

        return response?.businesses?.map((business) => new Business(business.name, business.businessId)) || []
    }

    /**
     * Stores a new business in the database
     * @param {string} name
     */
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

    /**
     * Updates an existing business in the database
     * @param {{ businessId: string, name: string }} object
     */
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

    /**
     * Deletes a business from the database
     * @param {string} businessId
     */
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