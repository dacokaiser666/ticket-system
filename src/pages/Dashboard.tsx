import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Card, CardContent, Grid } from "@mui/material";
import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sisticket - Dashboard
          </Typography>
          <Button color="inherit" onClick={logout}>Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>

      {/* Contenido */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido, {user?.email}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Crear un Ticket</Typography>
                <Typography variant="body2" color="text.secondary">
                  Reporta un nuevo problema o solicitud.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => navigate("/new-ticket")}  // Navegar a la página de nuevo ticket
                >
                  Nuevo Ticket
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Mis Tickets</Typography>
                <Typography variant="body2" color="text.secondary">
                  Revisa el estado de tus solicitudes.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => navigate("/my-tickets")}  // Navegar a la página de mis tickets
                >
                  Ver Tickets
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Configuración</Typography>
                <Typography variant="body2" color="text.secondary">
                  Ajusta tu perfil y preferencias.
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => navigate("/settings")}  // Navegar a la página de configuración (si existe)
                >
                  Configuración
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
