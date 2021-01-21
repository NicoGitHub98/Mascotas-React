import axios from "axios"
import { environment } from "../app/environment/environment"

export interface Post {
    id: string;
    title: string;
    description: string;
    picture: string;
    pets: string[];
}

export function getPictureUrl(image: string) {
    if (image && image.length > 0) {
        return image
    } else {
        return "/assets/profile.png"
    }
}

export async function likePost(postId: string): Promise<any[]> {
    try {
        const res = (await axios.post(environment.backendUrl + `/v1/posts/${postId}/like`)).data
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function dislikePost(postId: string): Promise<any[]> {
    try {
        const res = (await axios.post(environment.backendUrl + `/v1/posts/${postId}/dislike`)).data
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getPublicationsOfUser(userId: string): Promise<any[]> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/"+userId+"/posts")).data
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function loadPost(id: string): Promise<Post> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/posts/" + id)).data as Post
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function newPost(payload: Post): Promise<Post> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/posts/publish", payload)).data as Post
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function savePost(payload: Post): Promise<Post> {
    try {
        const res = (await axios.put(environment.backendUrl + "/v1/posts/"+payload.id+"/update", payload)).data as Post
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function deletePost(id: string): Promise<void> {
    try {
        await axios.delete(environment.backendUrl + "/v1/posts/"+id+"/delete")
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}