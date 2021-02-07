import React, { useState, useEffect } from "react"
import "../styles.css"
import * as peopleService from "./peopleService"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { reloadCurrentUser } from "../user/userService"
import { RouteComponentProps } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroller"
import PersonCard from "./personCard"

export default function MyPeople(props: RouteComponentProps) {
    const [profiles, setProfiles] = useState<peopleService.Profile[]>([])
    const [profilesToShow, setProfilesToShow] = useState(20)
    const [currentUser, setCurrentUser] = useState<any>()

    const errorHandler = useErrorHandler()

    const loadProfiles = async () => {
        try {
            const result = await peopleService.loadFollowedProfiles(currentUser.following)
            setProfiles(result)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const renderPeopleToShow = () => {
        let profilesToRender = profiles.filter((x, idx) => (idx <= profilesToShow))
        return profilesToRender.map((profile: peopleService.Profile)=>{
            return (
                <PersonCard key={profile._id} profile={profile}/>
            )
        })
    }

    useEffect(()=>{
        if(!currentUser)reloadCurrentUser().then((res)=>{setCurrentUser(res)})
        loadProfiles();
    },[currentUser])

    return (
        <div>
            <h1>Mis Seguidos</h1>
            <InfiniteScroll
                className=""
                key={0}
                pageStart={0}
                loadMore={() => setProfilesToShow(profilesToShow + 2)}
                hasMore={profilesToShow <= profiles.length}
                loader={<div className={"spin-loader-more-container"}><img src="/assets/loadingAnimationIcon.svg" alt="Loading Icon"></img></div>}
            >
                {renderPeopleToShow()}
            </InfiniteScroll>
        </div>
    )
}

