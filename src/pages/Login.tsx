
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const { user, loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Sisticket - Login</h1>
      <input className="p-2 border mb-2" type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
      <input className="p-2 border mb-2" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 rounded mb-2" onClick={() => loginWithEmail(email, password)}>Iniciar sesión</button>
      <button className="bg-green-500 text-white p-2 rounded mb-2" onClick={() => registerWithEmail(email, password)}>Registrarse</button>
      <button className="bg-red-500 text-white p-2 rounded" onClick={loginWithGoogle}>Iniciar con Google</button>
    </div>
  );
};

export default Login;
