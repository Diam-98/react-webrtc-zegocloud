import {createContext, useContext, useState} from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(
        localStorage.getItem("ACCESS_TOKEN")
    );

    const setToken = (token) => {
        _setToken(token);
        if (token){
            localStorage.setItem("ACCESS_TOKEN", token);
        }else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);