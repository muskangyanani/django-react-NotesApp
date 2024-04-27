import React from 'react';

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{note.title}</h3>
      <p className="text-gray-600 mb-2">{note.content}</p>
      <p className="text-gray-500 text-sm">{formattedDate}</p>
      <button
        onClick={() => onDelete(note.id)}
        className="bg-red-500 text-white px-3 py-1 mt-2 rounded-md hover:bg-red-600 transition-colors duration-300"
      >
        Delete
      </button>
    </div>
  );
}

export default Note;