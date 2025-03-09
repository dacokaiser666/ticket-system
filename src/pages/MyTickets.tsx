import { useEffect, useState } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";

import { Ticket } from "../types";
import { Container, Typography, Card, CardContent, Grid, Chip, Grid2, Button } from "@mui/material";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const q = query(collection(db, "tickets"), where("userId", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      const ticketsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ticket));
      setTickets(ticketsList);
    };

    if (user) fetchTickets();
  }, [user]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Mis Tickets</Typography>
      <Grid2 container spacing={3}>
        {tickets.map(ticket => (
          <Grid item xs={12} sm={6} md={4} key={ticket.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{ticket.type}</Typography>
                <Typography variant="h6" color="text.secondary">SLA: {ticket.sla} minutos</Typography>
                <Typography variant="body2" color="text.secondary">{ticket.description}</Typography>
                <Chip label={ticket.status} color={ticket.status === "pendiente" ? "warning" : ticket.status === "en proceso" ? "primary" : "success"} sx={{ mt: 2 }} />
                {ticket.assignedTo && (
                  <>
                  <Typography variant="body2" color="text.primary" sx={{ mt: 2 }}>
                    Asignado a: 
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ mt: 2 }}>
                  {ticket.assignedTo}
                </Typography>
                </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid2>
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
      onClick={() => navigate("/tickets")}  // Usamos navigate en lugar de window.location.href
    >
      Regresar
    </Button>
    </Container>
  );
};

export default MyTickets;
