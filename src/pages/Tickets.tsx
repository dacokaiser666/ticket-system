import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Card, CardContent, Grid } from "@mui/material";
import { useAuth } from "../context/useAuth";

const Tickets= () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (!user) {
      navigate("/login"); 
    } 
  }, [user, navigate]);

  return (
    <div style={{ flex: 1 , width: "1000px"}}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 , textAlign: "start"}}>
            Tickets
          </Typography>
          <Button color="inherit" onClick={logout}>Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>

      {/* Contenido */}
      <Container sx={{ mt: 4 }}>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
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

          <Grid item xs={12} sm={6} md={6}>
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
        </Grid>
        <Button
      type="submit"
      variant="contained"
      color="primary"
      sx={{
        mt: 2,
        width: '100%',
        borderRadius: 1,
        fontWeight: 'bold',
        padding: '12px 0',
        boxShadow: 3,
        '&:hover': { backgroundColor: '#1976d2' },
      }}
      onClick={() => navigate("/dashboard")}  // Usamos navigate en lugar de window.location.href
    >
      Regresar
    </Button>
      </Container>
    </div>
  );
};

export default Tickets;