import React, { useState, useEffect } from "react"
import "../styles.css"
import Post from "../post/post"
//import * as profileService from "../profile/profileService"
import * as feedService from "./feedService"
import { getCurrentUserAsObject } from "../user/userService"
import { RouteComponentProps } from "react-router-dom"

interface Publication {
    _id: string;
    title: string;
    description: string;
    picture: string;
    likes: string[];
    pets: string[];
    updated: string;
    created: string;
    user: string;
}

export default function MyFeed(props: RouteComponentProps) {
    const [publications,setPublications] = useState<Publication[]>([])
    const currentUser = getCurrentUserAsObject();
    
    const getPublications = async (userId: string) => {
        const publicationsAux = await feedService.getMyFeed()
        setPublications(publicationsAux)
    }

    useEffect(()=>{
        getPublications(currentUser!.id);
    },[])
    
    const renderPublications = () => {
        if(publications.length >= 1){
            console.log("Entra if con publicaciones igual a: ",publications)
            let posts = publications.map((publication: Publication) => {
                return (
                    <Post key={publication._id} publication={publication}/>
                )
            })
            return posts;
        } else {
            return <div onClick={()=>console.log(publications)}>Cargando Publicaciones</div>
        }
    }

    return (
        <div>
            {
                renderPublications()    
            }
        </div>
    )
}