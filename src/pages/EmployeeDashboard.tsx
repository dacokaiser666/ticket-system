import { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc, getDoc } from "firebase/firestore";
import { Ticket } from "../types";
import { Container, Grid, Card, CardContent, Typography, Chip, MenuItem, Select, FormControl, InputLabel, AppBar, Button, Toolbar } from "@mui/material";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase/firebase";

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userEmails, setUserEmails] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tickets"), (querySnapshot) => {
      const ticketsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ticket));
      setTickets(ticketsList);
    });

    // Fetch emails from Firestore based on userId from tickets
    const fetchEmails = async () => {
      const emails: { [key: string]: string } = {};
      const userIds = [...new Set(tickets.map(ticket => ticket.userId))]; // Get unique userIds from tickets

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

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, [user, tickets]);

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    const ticketRef = doc(db, "tickets", ticketId);
    await updateDoc(ticketRef, {
      status: newStatus,
    });
  };

  const handleAssignToEmployee = async (ticketId: string, employeeId: string) => {
    const ticketRef = doc(db, "tickets", ticketId);
    await updateDoc(ticketRef, {
      assignedTo: employeeId,
    });
  };


  return (
    <Container sx={{ mt: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sisticket - Panel de Administración de Tickets
          </Typography>
          <Button color="inherit" onClick={logout}>Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3}>
        {tickets.map(ticket => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={ticket.id}>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h6">{ticket.type}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Enviado por: {userEmails[ticket.userId] || "Cargando..."}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  SLA: {ticket.sla} minutos 
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}> 
                </Typography>
                
                <Typography variant="body2" color="text.secondary">{ticket.description}</Typography>

                {/* Mostrar el email del usuario que envió el ticket */}
                

                <Chip label={ticket.status} color={ticket.status === "pendiente" ? "warning" : ticket.status === "en proceso" ? "primary" : "success"} sx={{ mt: 2 }} />

                {/* Asignar empleado */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Asignar a</InputLabel>
                  <Select
                    value={ticket.assignedTo || ""}
                    onChange={(e) => handleAssignToEmployee(ticket.id!, e.target.value)}
                  >
                    <MenuItem value="">No asignado</MenuItem>
                    <MenuItem value="Ing. Fabián Azas">Ing. Fabián Azas</MenuItem>
                    <MenuItem value="Ing. Carlos Cedeño">Ing. Carlos Cedeño</MenuItem>
                    <MenuItem value="Ing. David Bernal">Ing. David Bernal</MenuItem>
                  </Select>
                </FormControl>

                {/* Cambiar estado del ticket */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={ticket.status || ""}
                    onChange={(e) => handleStatusChange(ticket.id!, e.target.value)}
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
