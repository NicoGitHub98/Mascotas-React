import React, { useEffect, useState } from "react"
import "../styles.css"
import * as userService from "../user/userService"
import * as postService from "./postService"
import * as petService from "../pets/petsService"

export default function Post(props: any) {
    const [likes, setLikes] = useState(props.publication.likes)
    const currentUser = userService.getCurrentUserAsObject()
    const [mascotas, setMascotas]: any[] = useState([]);
    
    const handleLike = (event: any, postId: string) => {
        if(event.target.nodeName === "IMG") event.target = event.target.parentNode
        const likesAux = [...likes]
        try {
            if(currentUser){
                var index = likes.indexOf(currentUser?.id);
                if(index <= -1){
                    postService.likePost(postId);
                    likesAux.push(currentUser?.id)
                } else {
                    postService.dislikePost(postId);
                    likesAux.splice(index,1)
                }
                setLikes(likesAux);
            }
        } catch(err){
            console.log(err)
        }        
    }
    
    const imageOfPost = () => {
        if(props.publication.picture){
            return <img src={props.publication.picture} className="card-img-bottom post-img mx-auto" alt="..."/>
        } else {
            return <div></div>
        }
    }

    const loadPetsOfPost = async () => {
        let mascotasAux = [];
        for (const mascotaId of props.publication.pets) {
            mascotasAux.push(await petService.getPet(mascotaId))
        }
        setMascotas(mascotasAux)
    }

    const petsOfPost = () => {
        let petNames: string[] = [];
        mascotas.forEach((mascota: any)=>{
            petNames.push(mascota.name)
        }) 
        return (
            <p className="card-text text-muted ml-5 mt-3">
                {
                    (petNames.length===1 ? "-Con mi mascota " : "-Con mis mascotas ") + petNames.join(", ")
                }
            </p>
        )
    }

    const checkLiked = () => {
        return likes.indexOf(currentUser!.id)>-1? "btn-primary" : ""
    }

    const checkPeopleThatLikes = () => {
        if(likes.includes(currentUser!.id) && likes.length === 1){
            return "Te gusta esto"
        } else if(likes.includes(currentUser!.id) && likes.length === 2){
            return `A ti y a 1 persona les gusta esto`
        } else if(likes.includes(currentUser!.id) && likes.length > 2) {
            return `A ti y a ${likes.length} personas les gusta esto`
        } else if(likes.length === 1) {
            return `A 1 persona le gusta esto`
        } else if(likes.length > 1) {
            return `A ${likes.length} personas les gusta esto`
        } else {
            return "Se el primero en indicar que te gusta!"
        }
    }

    const renderEditButton = ()=>{
        if(props.publication.user === currentUser!.id) {
            return (
                <span className="btn"><img src="/assets/edit-icon.png" width="20px" alt="Editar"/></span>
            )
        }
    }

    useEffect(()=>{
        loadPetsOfPost();
    },[])

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{props.publication.title}</h5>
                    {renderEditButton()}
                </div>
                <hr/>
                <p className="card-text">{props.publication.description}</p>
                <p className="card-text"><small className="text-muted">Publicada el {props.publication.created}</small></p>
            </div>
            {imageOfPost()}
            {petsOfPost()}
            <hr/>
            <div>
                <button 
                    className={"btn " + checkLiked() + " m-1"} 
                    onClick={(e)=>{handleLike(e,props.publication._id)}}
                >
                    <img 
                        src="/assets/thumbs-up-regular.svg" 
                        width="15px" 
                        alt=""
                    />
                </button> 
                {checkPeopleThatLikes()}
            </div>
        </div>
    )
}
