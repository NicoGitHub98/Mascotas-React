import axios from "axios"
import { environment } from "../app/environment/environment"

export async function likePost(postId: string, userId: string): Promise<any[]> {
    try {
        const res = (await axios.post(environment.backendUrl + `/v1/${postId}/like`)).data
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function dislikePost(postId: string, userId: string): Promise<any[]> {
    try {
        const res = (await axios.post(environment.backendUrl + `/v1/${postId}/dislike`)).data
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}