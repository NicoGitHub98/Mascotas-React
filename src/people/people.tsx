import React, { useState, FormEvent } from "react"
import "../styles.css"
import * as peopleService from "./peopleService"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { NavLink } from "react-router-dom"
import { RouteComponentProps } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroller"
import ErrorLabel from "../common/components/ErrorLabel"
import { FollowButton } from "../common/components/FollowButton"
import PersonCard from "./personCard"

export default function SearchPeople(props: RouteComponentProps) {
    const [nameToSearch, setNameToSearch] = useState<string>("")
    const [profiles, setProfiles] = useState<peopleService.Profile[]>([])
    const [profilesToShow, setProfilesToShow] = useState(20)

    const errorHandler = useErrorHandler()

    const loadProfiles = async (name: string) => {
        try {
            const result = await peopleService.loadProfiles(name)
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

    const handleSubmit = (event: FormEvent, nameToSearch:string) => {
        event.preventDefault()
        errorHandler.cleanRestValidations()
        if(!nameToSearch) errorHandler.addError("peopleSearcher", "No puede estar vacío")
        if (errorHandler.hasErrors()) {
            return
        }
        loadProfiles(nameToSearch)

    }

    return (
        <div>
            <h1>Descubrir Personas</h1>
            <form className="" action="" onSubmit={(e) => handleSubmit(e,nameToSearch)}>
                <div className="input-group mb-3">
                    <input id="peopleSearcher" type="text" className={errorHandler.getErrorClass("peopleSearcher", "form-control")} placeholder="Buscar Personas por nombre, apellido o usuario" aria-label="Recipient's username" aria-describedby="button-addon2" value ={nameToSearch} onChange={(event)=> setNameToSearch(event.target.value)} />
                    <button value="Buscar" className="btn btn-outline-primary" type="submit" id="button-addon2">Buscar <img src="/assets/magnifying-glass.svg" alt="Buscar" width="15"/></button>
                    <ErrorLabel message={errorHandler.getErrorText("peopleSearcher")} />
                </div>
            </form>
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

