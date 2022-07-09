import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
  const context = useContext(noteContext);
  const {notes, getNotes} = context;
  const [note, setNote] = useState({id: "", title: "", description:"", tag: ""})
  useEffect(()=> {
    getNotes();
    // eslint-disable-next-line
  },[]);
  const ref = useRef(null);
  const updateNote = (note)=>{
    setNote({id: note._id, title: note.title, description:note.description, tag: note.tag});
    document.getElementById("updateModal").querySelector('input.id').value = note._id;
    document.getElementById("updateModal").querySelector('input.title').value = note.title;
    document.getElementById("updateModal").querySelector('textarea.description').innerHTML = note.description;
    document.getElementById("updateModal").querySelector('input.tag').value = note.tag;
    ref.current.click();
  }

  const refClose = useRef(null);
  const closeModal = ()=>{
    refClose.current.click();
  }

  return (
    <>
        <AddNote key="add" isUpdate="0" note={note} setNote={setNote}  showAlert={props.showAlert}/>
        <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal">
            Launch demo modal
        </button>
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateModalLabel">Edit Note</h5>
                        <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <AddNote key="update" isUpdate="1"  note={note} setNote={setNote} showAlert={props.showAlert} closeModal={closeModal}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row my-3">
            <h2>Your Notes</h2>
            {notes && notes.length===0 && <div className='container'>No notes to display</div>}
            {notes && notes.map((note)=>{
                return <NoteItem key={note._id} updateNote={updateNote} note={note} />
            })}
        </div>
    </>
  )
}

export default Notes
