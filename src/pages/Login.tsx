import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { Container, TextField, Button, Typography, CircularProgress, Box, Alert } from "@mui/material";

const Login = () => {
  const { user, loginWithEmail, registerWithEmail, authLoading } = useAuth(); // Quitamos loading de props
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mostrar mensajes de error
  const [loading, setLoading] = useState(false); // Estado local para manejar el loading

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = async () => {
    setErrorMessage(""); // Limpiar errores anteriores
    setLoading(true); // Establecer loading a true al iniciar el login
    try {
      await loginWithEmail(email, password);
    } catch (error: unknown) {
      console.error("Error al iniciar sesión", error);
      if (error instanceof Error) {
        setErrorMessage(error.message || "Error desconocido"); // Mostrar el error de Firebase
      } else {
        setErrorMessage("Error desconocido");
      }
    } finally {
      setLoading(false); // Asegurarse de que loading se establezca en false siempre, incluso después del error
    }
  };

  // Si está cargando el estado de autenticación, mostrar el loading spinner
  if (authLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",

      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "auto",
          padding: 3,
          borderRadius: 2,
          color: "white", 
          width: "100%",

        }}
      >
        <Typography variant="h3" component="h1" sx={{ mb: 3, color: "white" }}>
          Sisticket - Login
        </Typography>
        <Typography variant="h4" component="h1" sx={{ mb: 3, color: "white" }}>
          Fabián Azas
        </Typography>
        <Typography variant="h5" component="h1" sx={{ mb: 3, color: "white" }}>
          Sistemas de Información
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <TextField
          label="Correo electrónico"
          color="primary"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          sx={{
            input: { color: "white" }, // Texto en blanco dentro del input
            "& .MuiInputLabel-root": { color: "white" }, // Etiquetas en blanco
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" }, // Bordes blancos para campos de entrada
            },
          }}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          sx={{
            input: { color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{
            mt: 2,
            backgroundColor: "#1976d2", // Color brillante para el botón
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Iniciar sesión"}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => registerWithEmail(email, password)}
          disabled={loading}
          sx={{
            mt: 2,
            borderColor: "white", // Borde blanco para el botón
            color: "white", // Texto blanco
            "&:hover": {
              borderColor: "#1976d2", // Color del borde al pasar el mouse
              color: "#1976d2", // Texto azul
            },
          }}
        >
          Registrarse
        </Button>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Login;
