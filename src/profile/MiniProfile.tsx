import React, { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import {getCurrentUserAsObject} from "../user/userService"
import { loadPetsOfUser } from "../pets/petsService"
import "../styles.css"
import { FollowButton } from "../common/components/FollowButton"

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
    const [pets, setPets] = useState<any[]>()
    const [petsVisible,setPetsVisible] = useState(false)
    const [prof, setProf] = useState<string>()
    let panelMascotas = useRef<HTMLDivElement>(null)

    const loadCurrentUser = ()=>{
        setCurrentUser(getCurrentUserAsObject())
    }

    const loadUserPets = async ()=>{
        setPets(await loadPetsOfUser(props.profile?.user))
    }    

    const changePetFrameVisibility = ()=>{
        setPetsVisible(false)
    }

    const togglePetsVisible = ()=>{
        const node = panelMascotas.current as any
        if(!petsVisible){
            setPetsVisible(true)
            setTimeout(()=>(node.style.maxHeight = "350px"),50)
        } else {
            setTimeout(()=>{changePetFrameVisibility()},700);
            node.style.maxHeight = "0px"
        }
        
    }

    const renderEditButton = () =>{
        if(currentUser?.id === props.profile?.user){
            return (
                <NavLink to="/profile">
                    <span className="float-right btn">
                        <img src="/assets/edit-icon.png" width="20px" alt="Editar Perfil"/>
                    </span>
                </NavLink>
            )
        } else return <FollowButton key={props.profile?._id} float={true} user={prof}/> 
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

    const renderPets = () => {
        return (
            <div ref={panelMascotas} className="card my-2 animationMascotas" hidden={!petsVisible}>
                <div className="card-header text-center text-bold mascotasTitle">
                    <strong>Mis Mascotas</strong>
                </div>
                <div className="card-body ">
                    {
                        pets?.length ? (
                        <div className="tableFixHead">
                            <table className="table table-sm table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" className="bg-secondary">Nombre</th>
                                        <th scope="col" className="bg-secondary">Descripcion</th>
                                        <th scope="col" className="bg-secondary">Cumpleaños</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pets.map((pet:any,index)=>{
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{pet.name}</th>
                                                <td>{pet.description}</td>
                                                <td>{pet.birthDate?.slice(0,10)}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        ) : (
                            <h5 hidden={!petsVisible} className="text-center">Aun no tengo mascotas!</h5>
                        )
                    }
                    
                </div>
            </div>
        )
    }

    useEffect(()=>{
        if(!currentUser) loadCurrentUser()
        if(!pets && props.profile)loadUserPets()
        if(props.profile)setProf(props.profile.user)
        // eslint-disable-next-line
    },[props.profile])

    return (
        <div>
            <div ref={panelMascotas} className="card mb-2 mx-auto" style={{width: "18rem"}}>
                <img src={props.profile?.picture?props.profile.picture:"/assets/default_profile_image.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    {renderProfile()}
                    {renderEditButton()}
                    <div className="text-center">
                        <span className="badge rounded-pill bg-info btn" onClick={()=>{togglePetsVisible()}}> {petsVisible?"Ocultar Mascotas":"Ver Mascotas"} </span>
                    </div>
                </div>
            </div>
            {renderPets()}
        </div>
    )
}