import { useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const Auth = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCred = isLogin
                ? await signInWithEmailAndPassword(auth, email, password)
                : await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCred.user);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">
                {isLogin ? "Login" : "Register"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" placeholder="Email" className="w-full px-3 py-3 border-2 rounded font-medium" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="w-full px-3 py-3 border-2 rounded font-medium" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="w-full border-2 font-medium cursor-pointer border-blue-600 bg-blue-600 text-white py-3 rounded hover:bg-transparent hover:text-blue-600">{isLogin ? "Login" : "Register"}</button>
            </form>
            <button className="mt-4 cursor-pointer text-black-600 hover:underline text-[18px] font-medium" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Need an account?" : "Have an account?"}
            </button>
        </div>
    );
}

export default Auth
