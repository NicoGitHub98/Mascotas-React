import React, { useState, useEffect } from "react"
import "../styles.css"
import MiniProfile from "../profile/MiniProfile"
import Post from "../post/post"
import * as profileService from "../profile/profileService"
import * as postService from "../post/postService"
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

export default function Feed(props: RouteComponentProps<{ profileId: string }>) {
    const [profile,setProfile] = useState<profileService.Profile>()
    const [publications,setPublications] = useState<Publication[]>([])
    const currentUser = getCurrentUserAsObject();

    const getProfile = async (profileId: string) => {
        const profileAux = await profileService.getProfileById(profileId);
        setProfile(profileAux)
    }
    
    const getPublications = async (userId: string) => {
        const publicationsAux = await postService.getPublicationsOfUser(userId)
        setPublications(publicationsAux)
    }

    useEffect(()=>{
        if(!profile){
            getProfile(props.match.params.profileId);
        } else {
            getPublications(profile!.user);
        }
    },[profile])

    const renderPostButton = ()=>{
        if(profile?.user === currentUser!.id){
            return (
                <div className="sticky-top mb-2">
                    <button className="btn btn-primary btn-block">Publicar</button>
                </div>
            )
        }
    }
    
    return (
        <div>
            <MiniProfile profile={profile}/>
            {renderPostButton()}
            {
                publications.map((publication: Publication) => {
                    return (
                        <Post 
                            key={publication._id}
                            publication={publication}
                        />
                    )
                })
            }
        </div>
    )
}
