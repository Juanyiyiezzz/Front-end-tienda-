import { use } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [rol, setRol] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = userLocation();

    const login = async (correo, contraseña) => {
        try{
            const response = await api.post('/login', { correo, contraseña }, { withCredentials: true });
            if (response.user) {
                setUser(response.user);
                setRol(response.user.rol);
                
                return response.user.rol;
            } else {
                console.warn("Datos de usario o rol faltantes");
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = async () => {
                await api.post('/logout',);
                setUser(null);
                setRol(null);
            };


    const verifyToken = async () => {
            try {
                const response = await api.get('/user');
                setUser(response.user);
                setRol(response.user.rol);
            } catch (error) {
                console.error(error);
                setUser(null);
                setRol(null);
            }
            
            };

    useEffect(() => {
        verifyToken();
    }, [location.pathname]);

    return (
        <AuthContext.Provider value={{ user, login, logout, rol }}>
            {children}
        </AuthContext.Provider>
    );

};