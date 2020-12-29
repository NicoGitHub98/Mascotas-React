import React, { useState, useEffect } from "react"
import "../styles.css"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"
import { getCurrentProfile } from "../profile/profileService"

export default function Feed(props: RouteComponentProps) {
    const [publications, setPublications] = useState([])
    const [profile, setProfile] = useState({})

    const getProfile = (userId: string) => {

    }

    useEffect(()=>{
        getProfile(userId)
    })
    
    return (
        true
    )
}
