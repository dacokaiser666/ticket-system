import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Ticket } from "../types";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const q = query(
        collection(db, "tickets"),
        where("userId", "==", user?.uid)
      );
      const querySnapshot = await getDocs(q);
      const ticketsList = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Ticket)
      );
      setTickets(ticketsList);
    };

    if (user) fetchTickets();
  }, [user]);

  return (
    <Container sx={{ flex: 1, mt: 4, minWidth: "1250px" }}>
      <Typography variant="h4" gutterBottom>
        Mis Tickets
      </Typography>
      <Grid container spacing={3}>
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={4} key={ticket.id}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{ticket.type}</Typography>
                <Typography variant="h6" color="text.secondary">
                  Tiempo máximo de respuesta: {ticket.sla} minutos
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
                <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                  Responsable:{" "}
                  {ticket.assignedTo ? ticket.assignedTo : "No asignado"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          width: "auto",
          borderRadius: 1,
          fontWeight: "bold",
          padding: "12px",
          boxShadow: 3,
          "&:hover": { backgroundColor: "#1976d2" },
        }}
        onClick={() => navigate("/dashboard")}
      >
        Regresar
      </Button>
    </Container>
  );
};

export default MyTickets;
