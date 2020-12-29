import axios from "axios"
import { environment } from "../app/environment/environment"

export interface Profile {
    _id: string;
    name: string;
    picture: string;
    user: string;
}

export async function loadProfiles(name: string): Promise<Profile[]> {
    try {
        const res = (await axios.get(environment.backendUrl + `/v1/profile/find?name=${name}`)).data as Profile[]
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function follow(userId: string): Promise<Profile> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/users/"+userId+"/follow")).data as Profile
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function unfollow(userId: string): Promise<Profile> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/users/"+userId+"/unfollow")).data as Profile
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}