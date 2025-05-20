import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../Firebase'
import { useEffect, useState } from 'react'
import Todo from './Todo'



const TodoList = ({ user }) => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const q = query(collection(db, "todos"), where("uid", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
    }, [user.uid]);

    const addTodo = async (e) => {
        e.preventDefault();
        if (!text) return(
            alert("Please Add Task Field...")
        );
        await addDoc(collection(db, "todos"), {
            text,
            completed: false,
            uid: user.uid,
        });
        setText("");
    };
    return (
        
        <div className="w-full max-w-xl bg-white p-6 pt-0 rounded-b-sm">
            <hr className='mb-5'/>
            <h2 className='text-2xl font-medium mb-2'>Your Task</h2>
            <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-5 mb-6">
                <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 text-[16px] font-medium px-5 py-5 border-2 rounded" placeholder="Add Task" />
                <button type="submit" className="bg-green-500 cursor-pointer font-medium text-white px-5 py-2 border-2 border-green-500 rounded hover:bg-transparent hover:text-green-600 hover:border-black-500">Add</button>
            </form>
            <div className="space-y-3">
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    )
}

export default TodoList
