import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Ticket } from "../types";
import { Button, Container, Grid, Card, CardContent, Typography, Chip, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase/firebase";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const querySnapshot = await getDocs(collection(db, "tickets"));
      const ticketsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ticket));
      setTickets(ticketsList);
    };

    if (user) fetchTickets();
  }, [user]);

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

  const handleSetSLA = async (ticketId: string, sla: number) => {
    const ticketRef = doc(db, "tickets", ticketId);
    await updateDoc(ticketRef, {
      sla,
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Panel de Empleado</Typography>
      <Grid container spacing={3}>
        {tickets.map(ticket => (
          <Grid item xs={12} sm={6} md={4} key={ticket.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{ticket.title}</Typography>
                <Typography variant="body2" color="text.secondary">{ticket.description}</Typography>
                <Chip label={ticket.status} color={ticket.status === "pendiente" ? "warning" : ticket.status === "en proceso" ? "primary" : "success"} sx={{ mt: 2 }} />

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Asignar a</InputLabel>
                  <Select
                    value={ticket.assignedTo || ""}
                    onChange={(e) => handleAssignToEmployee(ticket.id!, e.target.value)}
                  >
                    <MenuItem value="">No asignado</MenuItem>
                    <MenuItem value="empleado1">Empleado 1</MenuItem>
                    <MenuItem value="empleado2">Empleado 2</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleStatusChange(ticket.id!, "en proceso")}
                >
                  Marcar como En Proceso
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  onClick={() => handleStatusChange(ticket.id!, "resuelto")}
                >
                  Marcar como Resuelto
                </Button>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>SLA (minutos)</InputLabel>
                  <Select
                    value={ticket.sla || 60}
                    onChange={(e) => handleSetSLA(ticket.id!, e.target.value as number)}
                  >
                    <MenuItem value={60}>60 minutos</MenuItem>
                    <MenuItem value={120}>120 minutos</MenuItem>
                    <MenuItem value={180}>180 minutos</MenuItem>
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
