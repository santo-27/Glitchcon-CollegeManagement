import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem("role") || "");
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (email, password) => {
        try {
          // FOR THE SAKE OF FRONTENDD
    
          // COMMENTED(WORKS)
          const response = await axios.post('/api/login', { email, password }); // gotta change the url
          console.log(response)
          setUser(response.data.user);
          setToken(response.data.token);
          setRole(response.data.role);
    
          //FOR EASE OF USE FOR FRONTEND
        //   setUser({email:'sample@gmail.com'})
          //COMMENT THIS IN FUTUREE
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };
    
    
      const logout = () => {
        setUser(null);
      };

    // useEffect(() => {
    //     if (role) {
    //         localStorage.setItem("role", role);
    //     } else {
    //         localStorage.removeItem("role");
    //     }
    // }, [role]);

    // const logout = () => {
    //     setRole("");
    //     localStorage.removeItem("role");
    //     localStorage.removeItem("token");
    // };

    return (
        <AuthContext.Provider value={{ user_id , role, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
