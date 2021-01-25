import React, { useState, useEffect } from "react"
import "../styles.css"
import * as peopleService from "./peopleService"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { NavLink } from "react-router-dom"
import { RouteComponentProps } from "react-router-dom"
import * as userService from "../user/userService"
import InfiniteScroll from "react-infinite-scroller"

export default function SearchPeople(props: RouteComponentProps) {
    const [nameToSearch, setNameToSearch] = useState<string>("")
    const [profiles, setProfiles] = useState<peopleService.Profile[]>([])
    const [followedPeople, setFollowedPeople] = useState<string[]>([])
    const [profilesToShow, SetProfilesToShow] = useState(20)

    const errorHandler = useErrorHandler()

    const loadFollowedPeople = async () => {
        const currentUser = await userService.reloadCurrentUser();
        setFollowedPeople(currentUser.following)
    }

    const loadProfiles = async (name: string) => {
        try {
            const result = await peopleService.loadProfiles(name)
            setProfiles(result)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const handleFollow = async (userId: string) => {
        try {
            await peopleService.follow(userId)
            const currentUser = await userService.reloadCurrentUser();
            setFollowedPeople(currentUser.following)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const handleUnfollow = async (userId: string) => {
        try {
            await peopleService.unfollow(userId)
            const currentUser = await userService.reloadCurrentUser();
            setFollowedPeople(currentUser.following)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const checkIfFollowed = (userId: string): boolean => {
        var index = followedPeople.indexOf(userId);
        return ((index > -1) ? true : false)
    }

    const renderPeopleToShow = () => {
        let profilesToRender = profiles.filter((x, idx) => (idx <= profilesToShow))
        return profilesToRender.map((profile: peopleService.Profile)=>{
            return (
                <PersonCard key={profile._id} profile={profile} isFollowed={()=>checkIfFollowed(profile.user)} follow={handleFollow} unfollow={handleUnfollow}/>
            )
        })
    }

    useEffect(() => {
        loadFollowedPeople();
      },[]);

    return (
        <div>
            <h1>Descubrir Personas</h1>
            <form className="" action="" onSubmit={() => loadProfiles(nameToSearch)}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Buscar Personas por nombre, apellido o usuario" aria-label="Recipient's username" aria-describedby="button-addon2" value ={nameToSearch} onChange={(event)=> setNameToSearch(event.target.value)} />
                    <button value="Buscar" className="btn btn-outline-primary" type="submit" id="button-addon2">Buscar <img src="/assets/magnifying-glass.svg" alt="Buscar" width="15"/></button>
                </div>
            </form>
            <InfiniteScroll
                className=""
                key={0}
                pageStart={0}
                loadMore={() => SetProfilesToShow(profilesToShow + 2)}
                hasMore={profilesToShow <= profiles.length}
                loader={<div className={"spin-loader-more-container"}><img src="/assets/loadingAnimationIcon.svg" alt="Loading Icon"></img></div>}
            >
                {renderPeopleToShow()}
            </InfiniteScroll>
        </div>
    )
}

export function PersonCard(props: any) {
    const [isFollowed,setIsFollowed] = useState<boolean>(props.isFollowed)
    const user = props.profile.user

    const follow = (userId: string)=>{
        setIsFollowed(true)
        props.follow(userId);
    }
    const unfollow = (userId: string)=>{
        setIsFollowed(false)
        props.unfollow(userId);
    }

    return (
        <div className="card mb-3 people-card">
            <div className="card-body people-card-body">
                <img src={props.profile.picture} className="" alt="..."/>
                <NavLink to={"/profile/"+props.profile._id} className="menu_item h5">{props.profile.name}</NavLink>
                {
                    isFollowed 
                    ? <button className="btn btn-primary" onClick={()=>{unfollow(user);}}>Dejar de Seguir</button> 
                    : <button className="btn btn border border-primary" onClick={()=>{follow(user)}}>Seguir</button>
                }
            </div>
        </div>
    )
}