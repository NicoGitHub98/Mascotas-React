import axios from "axios"
import { environment } from "../app/environment/environment"


export async function loadPublications(userId: string): Promise<any[]> {
    try {
        const res = (await axios.get(environment.backendUrl + `/v1/profile/find?name=${userId}`)).data as any[]
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getMyFeed(): Promise<any[]> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/myFeed")).data as any[]
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}