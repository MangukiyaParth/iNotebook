import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNewNote, editNote} = context;
    const {note, setNote, closeModal, showAlert} = props;

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }
    const handlesubmit = (e)=>{
        e.preventDefault();
        addNewNote(note.title,note.description, note.tag);
        showAlert("Note added successfully","success");
        setNote({id: "", title: "", description:"", tag: ""});
        clearForm();
    }
    const handleupdate = (e)=>{
        e.preventDefault();
        editNote(note.id,note.title,note.description, note.tag);
        showAlert("Note updated successfully","success");
        closeModal();
        setNote({id: "", title: "", description:"", tag: ""});
        clearForm();
    }

    const clearForm = ()=>{
        document.getElementById("updateModal").querySelector('input.id').value = "";
        document.getElementById("updateModal").querySelector('input.title').value = "";
        document.getElementById("updateModal").querySelector('textarea.description').innerHTML = "";
        document.getElementById("updateModal").querySelector('input.tag').value = "";
    }

    return (
        <div className="my-3">
            <h2 className='add-element'>Add Notes</h2>
            <form>
                <input type="hidden" className="form-control id" id="id" name="id" onChange={onChange}/>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control title" id="title" name="title" aria-describedby="emailHelp"  onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control description" name="description" id="description" onChange={onChange} ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control tag" name="tag" id="tag" onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-primary add-element" onClick={handlesubmit}>Add Note</button>
                <button type="submit" disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-primary update-element float-end" onClick={handleupdate}>Update Note</button>
            </form>
        </div>
    )
}

export default AddNote
