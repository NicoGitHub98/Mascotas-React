import React, { useEffect, useState } from "react"
import Select from 'react-select'
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import "../styles.css"
import { Pet,loadPets } from "../pets/petsService"
import {getCurrentUserAsObject} from "../user/userService"
import { deletePost, loadPost, newPost, savePost, getPictureUrl } from "./postService"
import ImageUpload from "../common/components/ImageUpload"
import DangerLabel from "../common/components/DangerLabel"
import FormInput from "../common/components/FormInput"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormWarnButton from "../common/components/FormWarnButton"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import { RouteComponentProps } from "react-router-dom"
import ErrorLabel from "../common/components/ErrorLabel"
import { loadPet } from "../pets/petsService"
import { optionFocusAriaMessage } from "react-select/src/accessibility"

export default function NewPost(props: RouteComponentProps<{ id: string }>) {
    const currentUser =  getCurrentUserAsObject();
    const [postId, setPostId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [picture, setPicture] = useState("")
    const [pets, setPets] = useState<Pet[]>([])
    const [taggedPets, setTaggedPets] = useState<string[]>([])
    const [selectOptions, setSelectOptions] = useState<any[]>([])
    const [selectedValues, setSelectedValues] = useState<any[]>([])
    const [loaded,setLoaded] = useState(false)

    const errorHandler = useErrorHandler()

    const loadPostById = async (id: string) => {
        if (id) {
            try {
                const result = await loadPost(id)
                setPostId(result.id)
                setTitle(result.title)
                setDescription(result.description)
                setPicture(result.picture)
                setTaggedPets(result.pets)
                setLoaded(true);
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
    }

    const loadPetNames = async () => {
        try {
            const result = await loadPets()
            setPets(result)
        } catch (error) {
            errorHandler.processRestValidations(error)
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
        if (!title) {
            errorHandler.addError("title", "No puede estar vacío")
        }
        if (!description) {
            errorHandler.addError("description", "No puede estar vacío")
        }

        if (errorHandler.hasErrors()) {
            return
        }

        try {
            if (postId) {
                await savePost({ id: postId, title, description, picture, pets: taggedPets})
            } else {
                await newPost({ id: postId, title, description, picture: "", pets: taggedPets })
            }
            props.history.push("/profile/"+currentUser?.profile+"#"+postId)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const uploadPicture = async (image: string) => {
        try {
            setPicture(image)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const handleSelect = (actualSelections:any) => {
        let taggedPetsAux = []
        if(actualSelections){
            for (const option of actualSelections) {
                taggedPetsAux.push(option.value)
            }
        } 
        setSelectedValues(actualSelections)
        setTaggedPets(taggedPetsAux)

        //let taggedPetId = taggedPet[0].value

        //let selectedValuesAux = selectedValues
        //if(taggedPetsAux.includes(taggedPetId)) taggedPetsAux.splice(taggedPetsAux.indexOf(taggedPetId),1)
        //else taggedPetsAux.push(taggedPetId)
        //setTaggedPets(taggedPetsAux)
        //console.log("selectedValues es: ", selectedValuesAux)
        //let indexOfOption = selectedValuesAux.findIndex(option=>option.value == taggedPetId)
        //if(indexOfOption>-1){
        //    console.log("entra por splice")
        //    selectedValuesAux.splice(indexOfOption,1)
        //} else {
        //    console.log("entra por push")
        //    selectedValuesAux.push(taggedPet[0])
        //}
        //setSelectedValues(selectedValuesAux)
    }

    const cargarSelectedValues = ()=>{
        let selectedValuesAux: any[] = [];
        for (const pet of pets) {
            if(taggedPets.includes(pet.id)){
                selectedValuesAux.push({value: pet.id, label: pet.name})
            }
        }
        setSelectedValues(selectedValuesAux)
    }

    useEffect(()=>{
        const id  = props.match.params.id

        if (id && !loaded) {
            void loadPostById(id)
        }
        if(!pets.length){
            void loadPetNames()
        }
        if(pets.length && !selectOptions.length){
            let optionsAux:any[] = []
            pets.forEach((pet)=>{optionsAux.push({value:pet.id,label:pet.name})})
            setSelectOptions(optionsAux)
        }
        // eslint-disable-next-line
    }, [pets,taggedPets])

    useEffect(()=>{
        if(taggedPets.length && pets.length){
            cargarSelectedValues()
        }
    }, [selectOptions,taggedPets])


    return (
        <div className="container">
            <FormTitle>Nueva Publicacion</FormTitle>

            <Form>
                <FormInput
                    label="Title"
                    name="title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    errorHandler={errorHandler} />

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea className="form-control" value={description} name="description" rows={3} onChange={event => setDescription(event.target.value)}></textarea>
                </div>

                <div className="form-group">
                    <label>Imagen</label>
                    <ImageUpload src={getPictureUrl(picture)}
                        onChange={uploadPicture} />
                    <ErrorLabel message={errorHandler.getErrorText("name")} />
                </div>

                <Select
                    value={selectedValues}
                    isMulti
                    name="mascotas"
                    options={selectOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelect}
                />

                <br/>

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Guardar" onClick={saveClick} />

                    <FormWarnButton hidden={!postId} label="Eliminar" onClick={deleteClick} />

                    <FormButton label="Cancelar" onClick={() => goHome(props)} />

                </FormButtonBar>
            </Form >
        </div>
    )
}