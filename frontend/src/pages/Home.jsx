import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import Note from '../components/Notes'

function Home() {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
    api.get("/api/notes/")
    .then(res => res.data)
    .then((data)=>{setNotes(data); console.log(data);}) 
    .catch((err)=>alert(err)); 
  }

  const deleteNote = (id) =>{
    api.delete(`/api/notes/delete/${id}/`)
    .then(res => {
      if (res.status === 204){
        alert("Note deleted successfully")
      }else{
        alert("Failed to delete note.")
      }
      getNotes()
    }).catch(err => alert(err))
    
  }

  const createNote = (e) =>{
    e.preventDefault()
    api.post("/api/notes/", {title, content})
    .then(res =>{
      if (res.status === 201){
        alert("Note created successfully")
      }else{
        alert("Failed to create note.")
      }
      getNotes()
    }).catch(err => alert(err))
  }

  return (
  <div className="bg-white text-gray-800 p-10 max-w-6xl mx-auto">
    <div>
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      {notes.map((note)=> 
        (<Note note={note} onDelete={deleteNote} key={note.id}/>
      ))}
    </div>
    <h2 className="text-2xl font-bold mb-4">Create a note</h2>
    <form onSubmit={createNote} className="mb-8">
      <div className="mb-4">
        <label htmlFor="title" className="block font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-gray-400 px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block font-bold mb-2">
          Content:
        </label>
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-400 px-3 py-2 w-full resize-none"
        ></textarea>
      </div>
      <input
        type="submit"
        value="Create"
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
      />
    </form>
  </div>
  )
}

export default Home