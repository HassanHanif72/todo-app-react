import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useState } from "react";

const Todo = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);


    const toggleComplete = async () => {
        const todoRef = doc(db, "todos", todo.id);
        await updateDoc(todoRef, { completed: !todo.completed });
    };

    const removeTodo = async () => {
        await deleteDoc(doc(db, "todos", todo.id));
    };

    const saveEdit = async () => {
        if (!newText.trim()) return alert("Todo text cannot be empty");
        const todoRef = doc(db, "todos", todo.id);
        await updateDoc(todoRef, { text: newText });
        setIsEditing(false);
    };
    return (
        <div className="flex items-center justify-between bg-white px-5 py-5 rounded shadow">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={toggleComplete}
                    className="w-4 h-4"
                />
                {isEditing ? (
                    <input
                        className="border-2 px-2 py-1 rounded max-sm:w-[140px]"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                ) : (
                    <span
                        className={`${todo.completed ? "line-through text-gray-400" : ""
                            } text-[18px] font-medium`}
                    >
                        {todo.text}
                    </span>
                )}
            </div>
            <div className="flex gap-2">
                {isEditing ? (
                    <>
                        <button
                            onClick={saveEdit}
                            className="bg-blue-500 border-2 cursor-pointer border-blue-500 text-white px-2 py-1 rounded hover:bg-transparent hover:border-blue-500 hover:text-black"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-red-500 border-2 cursor-pointer border-red-500 text-white px-2 py-1 rounded hover:bg-transparent hover:border-red-500 hover:text-black"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 border-2 cursor-pointer border-blue-500 text-white px-2 py-1 rounded hover:bg-transparent hover:border-blue-500 hover:text-black"
                        >
                            Edit
                        </button>
                        <button
                            onClick={removeTodo}
                            className="bg-red-500 border-2 cursor-pointer border-red-500 text-white px-2 py-1 rounded hover:bg-transparent hover:border-red-500 hover:text-black"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Todo
