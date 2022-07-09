import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const {note, updateNote} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    return (
    <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{note.title}</h5>
                    <div style={{fontSize: "13px", position: "absolute", top: "2px", right: "2px"}}>
                        <i className="fa-solid text-primary fa-pen-to-square icon-btn" onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-solid text-danger fa-xmark mx-2 icon-btn" onClick={()=>{deleteNote(note._id)}}></i>
                    </div>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    </div>
  )
}

export default NoteItem
