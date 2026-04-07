import { useContext, createContext, useState , useEffect } from "react";
const Api_link = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [accessToken, setaccessToken] = useState(null);
    const [loading, setloading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, seterror] = useState(null);
    const [user, setuser]= useState(null);

    useEffect(() => {

        const refresh = async () => {
            try {
                seterror(null);

                const res = await fetch(`${Api_link}/auth/refresh`, {
                    method: "POST",
                    credentials: "include",
                });

                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        throw new Error("Unauthorized");
                    }
                    throw new Error(`Authentication service failed with status: ${res.status}`);
                }

                const contentType = res.headers.get("content-type");

                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("content type is not valid !");
                }

                const data = await res.json();

                console.log(data);


                if (data && typeof data.data.accessToken.token === "string") {
                    setaccessToken(data.data.accessToken.token);
                    setIsLoggedIn(data.data.isLoggedIn);
                    setuser(data.data.username);

                } else {
                    throw new Error("Invalid response format: Missing access token");
                }


            } catch (err) {

                setaccessToken(null);

                if (err.message !== "Unauthorized") {
                    seterror(err.message);
                    console.error("Auth Refresh Error:", err.message);
                }
            }
            finally {
                setloading(false);
            }
        }
        refresh();
    }, []);


    return (
        <AuthContext.Provider value={{ accessToken, setaccessToken, user ,loading, error , isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );


}

export const useAuth = () => useContext(AuthContext);
