import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import "../styles.css"
import {getCurrentUserAsObject} from "../user/userService"
import { deletePost, loadPost, newPost, savePost } from "./postService"
import ImageUpload from "../common/components/ImageUpload"
import DangerLabel from "../common/components/DangerLabel"
import FormInput from "../common/components/FormInput"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormWarnButton from "../common/components/FormWarnButton"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"
import ErrorLabel from "../common/components/ErrorLabel"

export default function NewPost(props: RouteComponentProps<{ id: string }>) {
    const currentUser =  getCurrentUserAsObject();
    const [postId, setPostId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [picture, setPicture] = useState("")
    const [pets, setPets] = useState ([""])

    const errorHandler = useErrorHandler()

    const loadPostById = async (id: string) => {
        if (id) {
            try {
                const result = await loadPost(id)
                setTitle(result.title)
                setDescription(result.description)
                setPicture(result.picture)
                setPets(result.pets)
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }
    const deleteClick = async () => {
        if (postId) {
            try {
                await deletePost(postId)
                props.history.push("/profile/"+currentUser?.profile)
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    const saveClick = async () => {
        errorHandler.cleanRestValidations()
        if (!name) {
            errorHandler.addError("name", "No puede estar vacío")
        }

        if (errorHandler.hasErrors()) {
            return
        }

        try {
            if (petId) {
                await savePet({ id: petId, name, birthDate, description })
            } else {
                await newPet({ id: petId, name, birthDate, description })
            }
            props.history.push("/pets")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        const id  = props.match.params.id
        if (id) {
            void loadPostById(id)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Nueva Publicacion</FormTitle>

            <Form>
                <FormInput
                    label="Title"
                    name="title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Descripción"
                    name="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    errorHandler={errorHandler} />

                <div className="form-group">
                    <label>Profile Picture</label>
                    <ImageUpload src={getPictureUrl(picture)}
                        onChange={uploadPicture} />
                    <ErrorLabel message={errorHandler.getErrorText("name")} />
                </div>

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Guardar" onClick={saveClick} />

                    <FormWarnButton hidden={!postId} label="Eliminar" onClick={deleteClick} />

                    <FormButton label="Cancelar" onClick={() => goHome(props)} />

                </FormButtonBar>
            </Form >
        </GlobalContent>
    )
}