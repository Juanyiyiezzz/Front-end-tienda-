const AuthContext = createContext();

export const AuthProvider = ({children}) => {
const [user, setUser] = userState(null);
const [rol, setRol] = userState(null);
const [loading, setLoading] = userState(true);

const location = useLocation();

const login = async (correo, contraseña) => {
try { 
const response = await api.post("/login", {correo, contraseña}, {WithCredentails: true});
if (response.data.user 
}