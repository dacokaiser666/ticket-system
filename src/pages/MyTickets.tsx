import { useEffect, useState } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";

import { Ticket } from "../types";
import { Container, Typography, Card, CardContent, Grid, Chip, Grid2 } from "@mui/material";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase/firebase";

const MyTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);

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
                <Typography variant="h6">{ticket.title}</Typography>
                <Typography variant="body2" color="text.secondary">{ticket.description}</Typography>
                <Chip label={ticket.status} color={ticket.status === "pendiente" ? "warning" : ticket.status === "en proceso" ? "primary" : "success"} sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid2>
    </Container>
  );
};

export default MyTickets;
