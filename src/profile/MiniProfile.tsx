import React from "react"
import "../styles.css"

export default function MiniProfile(props: any) {
    console.log("perfil es: ",props.profile)
    return (
        <div className="card mb-5 mx-auto" style={{width: "18rem"}}>
            <img src={props.profile?props.profile.picture:null} className="card-img-top" alt="..." />
            <div className="card-body">
                <div className="">
                    <h5 className="card-title">{props.profile?props.profile.name:null}</h5>
                    <h5 className="card-title">{props.profile?props.profile.address:null}</h5>
                    <h5 className="card-title">{props.profile?props.profile.phone:null}</h5>
                </div>
                <span className="float-right btn"><img src="/assets/edit-icon.png" width="20px" alt="Editar"/></span>
            </div>
        </div>
    )
}