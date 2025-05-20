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
    <div className="min-h-screen bg-cover flex flex-col items-center p-4" style={{backgroundImage: "url(https://miro.medium.com/v2/resize:fit:8000/1*B4cpY9n3aiWgjiM_dY6Jjw.jpeg)"}}>
      {!user && (
        <>
          <h1 className="text-3xl font-bold text-white mb-4">Todo App</h1>
        </>
      )
      }

      {user ? (
        <>
          <div className="w-full max-w-xl flex flex-col sm:flex-row gap-5 justify-between items-center bg-white p-6 rounded-t-sm">
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
