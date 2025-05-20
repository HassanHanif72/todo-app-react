import { use, useEffect, useState } from "react"
import { auth } from "./firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import Auth from "./components/Auth"
import TodoList from "./components/TodoList"




function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {!user && (
        <>
          <h1 className="text-3xl font-bold text-black-600 mb-4">Todo App</h1>
        </>
      )
      }

      {user ? (
        <>
          <div className="w-full max-w-xl flex flex-col sm:flex-row gap-5 justify-between items-center">
            <h1 className="text-3xl font-bold text-black-600">{user.email}</h1>
            <button onClick={() => signOut(auth)} className="bg-red-500 cursor-pointer font-medium text-white px-5 py-2 border-2 border-red-500 rounded hover:bg-transparent hover:text-black hover:border-black-500">Logout</button>
          </div>
          <TodoList user={user} />
        </>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  )
}

export default App
