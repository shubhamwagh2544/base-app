import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {API_URL} from "./config.js";

export function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function signUp() {
        if (!email.trim() || !password.trim()) {
            setMessage("Both fields are required");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setMessage("Enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setMessage("Password should be at least 6 characters");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/users`, { email, password });

            if (response.status === 201 && response.data) {
                const user = response.data;

                // OPTIONAL: store user id or token for future requests
                localStorage.setItem("userId", user.id);

                setMessage("Signup successful!");

                // Redirect to profile
                navigate("/profile");
                return;
            }

            setMessage("Signup success, but unexpected response format.");
        } catch (err) {
            if (err.response) {
                // Backend responded with error status (400, 409, 500, etc.)
                const msg = err.response.data?.message || "Signup failed";
                setMessage(msg);
            }
            // Axios couldn't reach server
            else if (err.request) {
                setMessage("No response from server. Check your network.");
            }
            // Something else broke in code
            else {
                setMessage("Unexpected error occurred");
            }
        }
    }

    return (
        <div className="container">
            <div className="card">
                <h2>Create Account</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={signUp} className="btn">
                    Sign Up
                </button>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}
