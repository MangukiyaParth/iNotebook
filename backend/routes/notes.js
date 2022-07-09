const express = require('express');
const router = express.Router();
var fetchuser = require('../middlewere/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Rout 1: Fetch All Notes using: Get "/api/notes/createuser". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try{
        const notes = await Notes.find({user: req.user.id});
        res.json({status: 1, notes: notes});
    } catch (error){
        res.status(500).json({ status:0, error: "Internal server error"});
    }
})

// Rout 2: Add new notes using: POST "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, 
    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 charecters').isLength({ min: 5 }),
    ], 
    async (req, res)=>{
        let status = 0;
        // Validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ status:status, errors: errors.array() });
        }
        
        const {title,description,tag} = req.body;
        try{
            const note = new Notes({
                title: title,
                description: description,
                tag: tag, 
                user: req.user.id
            });
            const savedNote = await note.save();
            status=1;
            res.json({status:status, savedNote:savedNote});
        } catch (error){
            console.log(error);
            res.status(500).json({ status:status, error: "Internal server error"});
        }
        
})

// Rout 3: Update an existing note using: PUT "/api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser, 
    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 charecters').isLength({ min: 5 }),
    ], 
    async (req, res)=>{
        let status = 0;
        // Validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status:status, errors: errors.array() });
        }
        
        const {title,description,tag} = req.body;
        try{
            // Create note
            const newNote = {};
            if(title){newNote.title = title}
            if(description){newNote.description = description}
            if(tag){newNote.tag = tag}

            // Find Note to be updated
            let note = await Notes.findById(req.params.id);
            if(!note){return res.status(400).json({ status:status, errors: "Not Found!" });}
            
            if(note.user.toString() !== req.user.id)
            {
                return res.status(401).json({ status:status, errors: "Unauthorised request!" });
            }
            
            note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
            status = 1;
            res.json({ status:status, note:note});
        } catch (error){
            console.log(error);
            res.status(500).json({ status:0, error: "Internal server error"});
        }
        
})

// Rout 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
        try{
            let status = 0;
            // Find Note to be deleted
            let note = await Notes.findById(req.params.id);
            if(!note){return res.status(400).json({ status:status, errors: "Not Found!" });}
            
            // If note not auther of note
            if(note.user.toString() !== req.user.id)
            {
                return res.status(401).json({ status:status, errors: "Unauthorised request!" });
            }
            
            note = await Notes.findByIdAndDelete(req.params.id);
            status=1;
            res.json({status: status, note: note});
        } catch (error){
            console.log(error);
            res.status(500).json({ status:0, error: "Internal server error"});
        }
        
})

module.exports = router;