import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Ticket } from "../types";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  AppBar,
  Button,
  Toolbar,
  Box,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase/firebase";

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userEmails, setUserEmails] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tickets"),
      (querySnapshot) => {
        const ticketsList = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Ticket)
        );
        setTickets(ticketsList);
      }
    );

    const fetchEmails = async () => {
      const emails: { [key: string]: string } = {};
      const userIds = [...new Set(tickets.map((ticket) => ticket.userId))];

      for (const userId of userIds) {
        if (userId) {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            emails[userId] = userDoc.data()?.email || "Email no disponible";
          }
        }
      }
      setUserEmails(emails);
    };

    fetchEmails();

    return () => unsubscribe();
  }, [user, tickets]);

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    const ticketRef = doc(db, "tickets", ticketId);
    await updateDoc(ticketRef, { status: newStatus });
  };

  const handleAssignToEmployee = async (
    ticketId: string,
    employeeId: string
  ) => {
    const ticketRef = doc(db, "tickets", ticketId);
    await updateDoc(ticketRef, { assignedTo: employeeId });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, height: "fit-content" }}>
      <AppBar
        position="static"
        color="primary"
        elevation={4}
        sx={{ bgcolor: "primary.dark" }}
      >
        <Container>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              Sisticket - Panel de Administración de Tickets
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary" onClick={logout}>
                Cerrar Sesión
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Grid
        container
        spacing={3}
        sx={{ padding: "1rem" }}
        justifyContent="center"
      >
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={ticket.id}>
            <Card sx={{ width: "100%", maxWidth: "350px", margin: "auto" }}>
              <CardContent>
                <Typography variant="h6">{ticket.type}</Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Enviado por: {userEmails[ticket.userId] || "Cargando..."}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  SLA: {ticket.sla} minutos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ticket.description}
                </Typography>

                <Chip
                  label={ticket.status}
                  color={
                    ticket.status === "pendiente"
                      ? "warning"
                      : ticket.status === "en proceso"
                      ? "primary"
                      : "success"
                  }
                  sx={{ mt: 2 }}
                />

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Asignar a</InputLabel>
                  <Select
                    value={ticket.assignedTo || ""}
                    onChange={(e) =>
                      handleAssignToEmployee(ticket.id!, e.target.value)
                    }
                  >
                    <MenuItem value="">No asignado</MenuItem>
                    <MenuItem value="Ing. Fabián Azas">
                      Ing. Fabián Azas
                    </MenuItem>
                    <MenuItem value="Ing. Carlos Cedeño">
                      Ing. Carlos Cedeño
                    </MenuItem>
                    <MenuItem value="Ing. David Bernal">
                      Ing. David Bernal
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={ticket.status || ""}
                    onChange={(e) =>
                      handleStatusChange(ticket.id!, e.target.value)
                    }
                  >
                    <MenuItem value="pendiente">Pendiente</MenuItem>
                    <MenuItem value="en proceso">En Proceso</MenuItem>
                    <MenuItem value="resuelto">Resuelto</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EmployeeDashboard;
