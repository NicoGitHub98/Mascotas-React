import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import {getCurrentUserAsObject} from "../user/userService"
import "../styles.css"

interface MiniProfileProps{
    profile: {
        name: string,
        phone: string,
        address: string,
        province: string,
        picture: string,
        posts: Array<any>,
        user: string
    }
}

export default  function MiniProfile(props: any) {
    const [currentUser,setCurrentUser] = useState<any>()

    const loadCurrentUser = ()=>{
        setCurrentUser(getCurrentUserAsObject())
    }

    const renderEditButton = () =>{
        if(currentUser?.id === props.profile?.user){
            return (
                <NavLink to="/profile">
                    <span className="float-right btn">
                        <img src="/assets/edit-icon.png" width="20px" alt="Editar"/>
                    </span>
                </NavLink>
            )
        } else return null
    }

    const renderProfile = ()=>{
        if(props.profile?.name || props.profile?.address || props.profile?.phone){
            return (
            <div className="">
                <h5 className="card-title">{props.profile?.name}</h5>
                <h5 className="card-title">{props.profile?.address}</h5>
                <h5 className="card-title">{props.profile?.phone}</h5>
            </div>
            )
        } else {
            return <h5>La información de este perfil no esta disponible</h5>
        }
    }
    useEffect(()=>{
        loadCurrentUser()
        //es-ignore-next-line
    },[])

    return (
        <div className="card mb-5 mx-auto" style={{width: "18rem"}}>
            <img src={props.profile?.picture?props.profile.picture:"/assets/default_profile_image.jpg"} className="card-img-top" alt="..." />
            <div className="card-body">
                {renderProfile()}
                {renderEditButton()}
            </div>
        </div>
    )
}