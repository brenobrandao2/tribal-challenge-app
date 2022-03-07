import axios from "axios";
import Constants from "../utils/Constants";

const config = {
    headers: {
        'x-api-key': Constants.API_KEY,
        'Content-Type': 'application/json'
    },
    baseURL: Constants.BASE_URL
}

export default class Person {
    constructor(name, personId, role, email, phone) {
        this.name = name
        this.personId = personId
        this.role = role
        this.email = email
        this.phone = phone
    }

    static async getAll(businessId) {
        const url = `/business/${businessId}/persons`
        const response = await axios.get(url, config).then(response => {
            return response.data
        }).catch(error => {
            throw new Error(error)
        })

        return response?.persons?.map((person) => new Person(
            person.name,
            person.personId,
            person.role,
            person.email,
            person.phone)) || []
    }

    static async create({ businessId, person }) {
        const url = `/business/${businessId}/persons`
        const response = await axios.post(url, person, config).then(response => {
            return response.data
        }).catch(error => {
            throw new Error(error)
        })

        return response
    }

    static async update({ businessId, personId, person }) {
        const url = `/business/${businessId}/persons/${personId}`
        const response = await axios.put(url, person, config).then(response => {
            return response.data
        }).catch(error => {
            throw new Error(error)
        })

        return response
    }

    static async delete({ businessId, personId }) {
        const url = `/business/${businessId}/persons/${personId}`
        const response = await axios.delete(url, config).then(response => {
            return response.data
        }).catch(error => {
            throw new Error(error)
        })

        return response
    }

    static async deleteMany(businessId, personList) {
        for(let person of personList) {
            await this.delete({ businessId, personId: person.personId })
        }
    }
}