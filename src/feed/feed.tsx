import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import "../styles.css"
import MiniProfile from "../profile/MiniProfile"
import Post from "../post/post"
import * as profileService from "../profile/profileService"
import * as postService from "../post/postService"
import { getCurrentUserAsObject } from "../user/userService"
import { RouteComponentProps } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroller';

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

export default function Feed(props: RouteComponentProps<{ profileId: string }>) {
    const [profile,setProfile] = useState<profileService.Profile>()
    const [publications,setPublications] = useState<Publication[]>([])
    const [postsToShow, setPostsToShow] = useState(20)
    const [currentUser,setCurrentUser] = useState<any>();

    const getProfile = async (profileId: string) => {
        const profileAux = await profileService.getProfileById(profileId);
        setProfile(profileAux)
    }
    
    const getPublications = async (userId: string) => {
        const publicationsAux = await postService.getPublicationsOfUser(userId)
        setPublications(publicationsAux)
    }

    useEffect(()=>{
        if(!currentUser) setCurrentUser(getCurrentUserAsObject())
        if(!profile){
            getProfile(props.match.params.profileId);
        } else {
            getPublications(profile!.user);
        }
        // eslint-disable-next-line
    },[profile,currentUser])

    const renderPostButton = ()=>{
        if(profile?.user === currentUser?.id){
            return (
                <div className=" mb-2 sticky-top stickyButton">
                    <NavLink to="/posts/newPost" className="btn btn-primary btn-block">Publicar</NavLink>
                </div>
            )
        }
    }

    const renderPosts = ()=>{
        const postsToRender:any = publications.filter((x, idx) => (idx <= postsToShow))
        return postsToRender.map((publication: Publication) => {
            return (
                <Post 
                    key={publication._id}
                    publication={publication}
                />
            )
        })
    }
    
    
    return (
        <div>
            <MiniProfile profile={profile}/>
            {renderPostButton()}
            <InfiniteScroll
                className=""
                key={0}
                pageStart={0}
                loadMore={() => setPostsToShow(postsToShow + 20)}
                hasMore={postsToShow <= publications.length}
                loader={<div className={"spin-loader-more-container"}><img src="/assets/loadingAnimationIcon.svg" alt="Loading Icon"></img></div>}
            >
                {renderPosts()}
            </InfiniteScroll>
            
        </div>
    )
}
