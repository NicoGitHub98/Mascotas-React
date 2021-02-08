import React, { useState, useEffect, FormEvent } from "react"
import "../../styles.css"
import * as peopleService from "../../people/peopleService"
import { useErrorHandler } from "../utils/ErrorHandler"
import * as userService from "../../user/userService"
import { timeStamp } from "console"

export function FollowButton(props: any) {
    const [isFloat,setIsFloat] = useState(props.float)
    const [isFollowed,setIsFollowed] = useState<boolean>(false)
    const [user,setUser] = useState<string>(props.user?.user)
    const [currentUser,setCurrentUser] = useState<any>()

    const errorHandler = useErrorHandler()

    const checkIfFollowed = (userId: string) => {
        var index = currentUser?.following.indexOf(userId);
        setIsFollowed((index > -1) ? true : false)
    }

    const follow = async (userId: string) => {
        try {
            await peopleService.follow(userId)
            setCurrentUser(await userService.reloadCurrentUser());
            setIsFollowed(true)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const unfollow = async (userId: string) => {
        try {
            await peopleService.unfollow(userId)
            setCurrentUser(await userService.reloadCurrentUser());
            setIsFollowed(false)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const loadCurrentUser = async () => {
        setCurrentUser(await userService.getCurrentUserAsObject());
    }

    const loadInitialData = async () => {
        if(props.user)setUser(props.user)
        if(!currentUser)await loadCurrentUser();
        if(user)checkIfFollowed(user);
    }

    useEffect(()=>{
        loadInitialData();
    },[props.user,currentUser])


    return (
        isFollowed 
        ? <button className={"btn btn-primary " + (isFloat?"float-right":"")} onClick={()=>{unfollow(user);}}>Dejar de Seguir</button> 
        : <button className={"btn btn border border-primary " + (isFloat?"float-right":"")} onClick={()=>{follow(user)}}>Seguir</button>
    )
}