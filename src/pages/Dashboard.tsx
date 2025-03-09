import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Card, CardContent, Grid } from "@mui/material";
import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { user, logout, authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
    } else if (user.role === "cliente") {
      navigate("/dashboard");
    } else if (user.role === "empleado") {
      navigate("/employee-dashboard");
    }
  }, [user, authLoading, navigate]);

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 , textAlign: "start"}}>
            Sisticket - Catálogo de Servicios
          </Typography>
          <Button color="inherit" onClick={logout}>Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>

      {/* Contenido */}
      <Container sx={{ m: 2 , textAlign: "start", mb: 6 }}>
        <Typography variant="h6" gutterBottom>
          Bienvenid@, {user?.email}
        </Typography>

        {/* Catálogo de Servicios */}
        <Grid container spacing={3}>
          {/* Servicio 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" , justifyContent: "space-between"}}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Tickets</Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestiona tus tickets de soporte y requerimientos.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => navigate("/tickets")}
                >
                  Ver
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Servicio 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Soporte Técnico</Typography>
                <Typography variant="body2" color="text.secondary">
                  Ayuda con problemas técnicos de hardware y software.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => navigate("/soporte")}
                >
                  Ver
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Servicio 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Redes y Conectividad</Typography>
                <Typography variant="body2" color="text.secondary">
                  Solución de problemas de conexión de red y configuración de red.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => navigate("/redes")}
                >
                  Ver
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Servicio 4 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Mantenimiento de Equipos</Typography>
                <Typography variant="body2" color="text.secondary">
                  Solicita mantenimiento para tu hardware o equipos.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => navigate("/mantenimiento")}
                >
                  Ver
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Servicio 5 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Software y Licencias</Typography>
                <Typography variant="body2" color="text.secondary">
                  Ayuda con instalación y licencias de software.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => navigate("/software")}
                >
                  Ver
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
