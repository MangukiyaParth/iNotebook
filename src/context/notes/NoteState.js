import React, { useState } from "react";
import NoteContext from "./noteContext";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const NoteState = (props)=>{
    const host = "http://localhost:5000/";
    const notesinitial = [];
    const [notes, setNotes] = useState(notesinitial);


    // Get all Notes
    const getNotes = async ()=>{
        // API Call
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        setNotes(json.notes);
    }
    
    // Add a Note
    const addNewNote = async (title, description, tag)=>{
        // API Call
        const data = {
            title: title,
            description: description,
            tag: tag
        }
        const response = await fetch(`${host}api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        const note = await response.json(); // parses JSON response into native JavaScript objects
        setNotes(notes.concat(note.savedNote));
    }

    // Delete a Note
    const deleteNote = async (id)=>{
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        // API Call
                        const data = {};
                        const response = await fetch(`${host}api/notes/deletenote/${id}`, {
                            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token': localStorage.getItem('token')
                            },
                            body: JSON.stringify(data) // body data type must match "Content-Type" header
                        });
                        response.json(); // parses JSON response into native JavaScript objects
                        const newNotes = notes.filter((note)=>{return note._id!==id});
                        setNotes(newNotes);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    // Edit a Note
    const editNote = async (id, title, description, tag)=>{
        // API Call
        const data = {
            title: title,
            description: description,
            tag: tag
        }
        const response = await fetch(`${host}api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        response.json(); // parses JSON response into native JavaScript objects

        notes.forEach((note, index) => {
            if(note._id === id)
            {
                note.title = title;
                note.description = description;
                note.tag = tag;
            }
        });
    }

   

    return (
        <NoteContext.Provider value={{notes, getNotes, addNewNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;