import React, { useState, useEffect } from "react"
import "../styles.css"
import Post from "../post/post"
//import * as profileService from "../profile/profileService"
import * as feedService from "./feedService"
import { getCurrentUserAsObject } from "../user/userService"
import { NavLink, RouteComponentProps } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroller"

interface Publication {
    _id: string;
    title: string;
    description: string;
    picture: string;
    likes: string[];
    pets: string[];
    updated: string;
    created: string;
    user: string;
}

export default function MyFeed(props: RouteComponentProps) {
    const [publications,setPublications] = useState<Publication[]>([])
    const [currentUser,setCurrentUser] = useState<any>({});
    const [postsToShow, setPostsToShow] = useState(2)
    
    const getPublications = async (userId: string) => {
        const publicationsAux = await feedService.getMyFeed()
        setPublications(publicationsAux)
    }

    useEffect(()=>{
        if(!currentUser) setCurrentUser(getCurrentUserAsObject())
        getPublications(currentUser!.id);
    },[currentUser])
    
    const renderPublications = () => {
        const postsToRender:any = publications.filter((x, idx) => (idx <= postsToShow))
        if(publications.length >= 1){
            let posts = postsToRender.map((publication: Publication) => {
                return (
                    <Post key={publication._id} publication={publication}/>
                )
            })
            return posts;
        } else if(publications.length === 0){
            return (
                <div>
                    <h5 className="text-center">No Hay Publicaciones para Mostrar</h5>
                    <div className="text-center">
                        <NavLink to="/browsePeople">
                            <small>Sigue a Alguien para ver Publicaciones</small>
                        </NavLink>
                    </div>
                </div>
            )
        }
    }

    return (
        <div style={{overflow: "hidden"}}>
            <h3 className="text-center">Mi Feed</h3>
            <hr/>
            <InfiniteScroll
                className=""
                key={0}
                pageStart={0}
                loadMore={() => setPostsToShow(postsToShow + 2)}
                hasMore={postsToShow <= publications.length}
                loader={<div key={0} className={"spin-loader-more-container"}><img src="/assets/loadingAnimationIcon.svg" alt="Loading Icon"></img></div>}
            >
            {
                renderPublications()    
            }
            </InfiniteScroll>
        </div>
    )
}