import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavPage from "../AccountNav";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { user, ready, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) subpage = "profile";

    async function logout() {
        await axios.post("/logout");
        setUser(null);
        setRedirect("/");
    }

    if (!ready) return "Loading...";
    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <AccountNavPage />
            {subpage === "profile" && (
                <div className="mt-4 text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})
                    <br />
                    <button onClick={logout} className="primary mt-4 max-w-sm">
                        Logout
                    </button>
                </div>
            )}
            {subpage === "places" && <PlacesPage />}
        </div>
    );
}
