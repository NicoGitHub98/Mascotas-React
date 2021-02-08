import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import "../styles.css"
import * as userService from "../user/userService"
import * as postService from "./postService"
import * as petService from "../pets/petsService"
import * as profileService from "../profile/profileService"

interface postProps{
    publication:{
        _id: string,
        title: string,
        description: string,
        user: string,
        picture: string,
        likes: string[],
        pets: string[],
        created: string,
    }
}

export default function Post(props: postProps) {
    const [likes, setLikes] = useState(props.publication.likes)
    const currentUser = userService.getCurrentUserAsObject()
    const [mascotas, setMascotas]: any[] = useState([]);
    const [profileInfo, setProfileInfo] = useState<any>()
    
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
        let mascotasAux = await petService.getPets(props.publication.pets);
        setMascotas(mascotasAux)
    }

    const  loadProfileInfo = async ()=>{
        setProfileInfo(await profileService.getProfileByUserId(props.publication.user))
    }

    const petsOfPost = () => {
        if(mascotas.length){
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
        return null
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
                <NavLink to={"/posts/edit/"+props.publication._id} className="menu_item btn btn-sm btn-link">
                    <span className="btn">
                        <img src="/assets/edit-icon.png" width="20px" alt="Editar"/>
                    </span>
                </NavLink>
            )
        }
    }

    useEffect(()=>{
        loadPetsOfPost();
        loadProfileInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="card my-4 shadow" id={props.publication._id}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5>{props.publication.title}</h5>
                    {renderEditButton()}
                </div>
                <div>
                    <small style={{"fontSize":12}} className="text-muted">
                        Publicada el {props.publication.created} por <NavLink to={"/profile/"+profileInfo?._id}>{profileInfo?.name}</NavLink>
                    </small>
                </div>
                <hr/>
                <p className="card-text">{props.publication.description}</p>
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
