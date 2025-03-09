import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import { services } from "../services";

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
      <AppBar
        position="static"
        color="primary"
        elevation={4}
        sx={{ bgcolor: "primary.dark" }}
      >
        <Container>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Título de la app */}
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              Sisticket - Catálogo de Servicios
            </Typography>

            {/* Botones de navegación */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  backgroundColor: "rgba(80, 80, 80, 1)",
                }}
                onClick={() => navigate("/my-tickets")}
              >
                Ver mis Tickets
              </Button>
              <Button variant="contained" color="primary" onClick={logout}>
                Cerrar Sesión
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Contenido */}
      <Container sx={{ m: 2, textAlign: "start", mb: 6 }}>
        <Typography variant="h6" gutterBottom>
          Bienvenid@, {user?.email}
        </Typography>

        {/* Catálogo de Servicios */}
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.name}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{service.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      fontWeight: "bold",
                      color: "gray",
                      display: "block",
                    }}
                  >
                    SLA: {service.sla} minutos
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    fullWidth
                    onClick={() =>
                      navigate(
                        `/new-ticket/${encodeURIComponent(service.name)}`
                      )
                    }
                  >
                    Generar Ticket
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
