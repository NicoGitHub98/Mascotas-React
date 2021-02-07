import React, { useState, FormEvent } from "react"
import "../styles.css"
import { NavLink } from "react-router-dom"
import { FollowButton } from "../common/components/FollowButton"

export default function PersonCard(props: any) {

    return (
        <div className="card mb-3 people-card">
            <div className="card-body people-card-body">
                <img src={props.profile.picture||"/assets/default_profile_image.jpg"} className="" alt="..."/>
                <NavLink to={"/profile/"+props.profile._id} className="menu_item h5">{props.profile.name}</NavLink>
                {
                    <FollowButton key={props.profile._id} user={props.profile.user}/>
                }
            </div>
        </div>
    )
}