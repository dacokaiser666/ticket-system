import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const { user, loginWithEmail, registerWithEmail, loading, authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  // Si está cargando el estado de autenticación, no mostrar los botones
  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 animate-spin mt-2"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Fabián Azas - Sistemas de Información</h1>
      <h2 className="text-2xl mb-4">Sisticket - Login</h2>
      <input
        className="p-2 border mb-2"
        type="email"
        placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading} // Deshabilitamos el input si está cargando
      />
      <input
        className="p-2 border mb-2"
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading} // Deshabilitamos el input si está cargando
      />
      <button
        className="bg-blue-500 text-white p-2 rounded mb-2 flex items-center justify-center"
        onClick={handleLogin}
        disabled={loading} // Deshabilitamos el botón si está cargando
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
      <button
        className="bg-green-500 text-white p-2 rounded mb-2"
        onClick={() => registerWithEmail(email, password)}
        disabled={loading} // Deshabilitamos el botón si está cargando
      >
        Registrarse
      </button>
      {loading && (
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 animate-spin mt-2"></div>
      )}
    </div>
  );
};

export default Login;
