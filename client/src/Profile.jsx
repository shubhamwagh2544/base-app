import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_URL} from "./config.js";

export function Profile() {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axios.get(`${API_URL}/users/${userId}`);
                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchProfile();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>Profile</h2>
            <p>Email: {user.email}</p>

            <br/> <br/> <br/>

            <button onClick={() => {
                localStorage.removeItem('userId')
                navigate("/");
            }}> Sign Out </button>
        </div>
    );
}
