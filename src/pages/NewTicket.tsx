import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase/firebase";
import { services } from "../services";
// Importa la variable global

const NewTicket = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { serviceName } = useParams();
  const [ticketType] = useState(decodeURIComponent(serviceName || ""));
  const [description, setDescription] = useState("");

  // Obtener el SLA del servicio seleccionado
  const service = services.find((service) => service.name === ticketType);
  const sla = service ? service.sla : 60; // Si no se encuentra el servicio, asignamos un valor por defecto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketType || !description) return;

    await addDoc(collection(db, "tickets"), {
      type: ticketType,
      description,
      sla,
      status: "pendiente",
      createdAt: Timestamp.now().toMillis(),
      userId: user?.uid,
    });

    navigate("/my-tickets");
  };

  return (
    <Container
      sx={{
        mt: 4,
        backgroundColor: "#f9f9f9",
        padding: 4,
        borderRadius: 2,
        width: "1000px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Generar Ticket para {ticketType}
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "1000px" }}
        >
          {/* Descripción del ticket */}
          <TextField
            fullWidth
            label="Cuéntanos más sobre tu requerimiento"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            sx={{ borderRadius: 1 }}
          />
          {/* Botón para enviar el ticket */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              width: "100%",
              borderRadius: 1,
              fontWeight: "bold",
              padding: "12px 0",
              boxShadow: 3,
            }}
          >
            Enviar Ticket
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NewTicket;
