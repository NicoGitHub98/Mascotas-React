import React, { useState, useEffect } from "react"
import { Pet, loadPets } from "./petsService"
import "../styles.css"
import * as userService from "../user/userService"
import * as postService from "./postService"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"
import { getCurrentProfile } from "../profile/profileService"

export default function Post(props: any) {
    const [likes, setLikes] = useState([])
    const currentUser = userService.getCurrentUser()

    const handleLike = () => {
        const likesAux = [...likes]
        try {
            var index = likes.indexOf(currentUser.id);
            if(index > -1){
                postService.likePost(currentUser.id);
                likesAux.push(currentUser.id)
            } else {
                postService.dislikePost(currentUser.id);
                likesAux.splice(index,1)
            }
            setLikes(likesAux);
        } catch(err){

        }        
    }
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <p className="card-text"><small className="text-muted">Created on {props.created}</small></p>
            </div>
            <img src={props.picture} className="card-img-bottom" alt="..."/>
            <div>
                <button onClick={()=>{handleLike()}}><img src="/assets/thumbs-up-regular.svg" alt=""/></button> {likes.length?`A ${likes.length} personas les gusta esto`:"Se el primero en indicar que te gusta!"}
            </div>
        </div>
    )
}
