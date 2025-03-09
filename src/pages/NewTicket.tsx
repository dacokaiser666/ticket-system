import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase/firebase";

const NewTicket = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [ticketType, setTicketType] = useState("");
  const [description, setDescription] = useState("");
  const [sla, setSla] = useState<number | string>("");

  // Mapa de tipos de tickets y sus SLA
  const ticketTypes = {
    "Caida del servicio": 60,
    "Problemas de hardware": 60,
    "Redes": 30,
    "Accesos": 15,
    "Instalación de software": 120,
    "Soporte en el uso de herramientas": 60,
    "Posibles brechas de seguridad": 15,
    "Fallas en el servicio": 30,
    "Reclamos o quejas de clientes": 30,
    "Incumplimiento normativo": 15
  };

  const handleTicketTypeChange = (e: SelectChangeEvent<string>) => {
    const selectedType = e.target.value as string;
    setTicketType(selectedType);
    setSla(ticketTypes[selectedType as keyof typeof ticketTypes] || ""); // Establece el SLA basado en el tipo de ticket
  };

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

    // Redirigir a la página de "Mis Tickets" después de crear el ticket
    navigate("/my-tickets");
  };

  return (
    <Container sx={{ mt: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 2 , width: "1000px"}}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: "#333" }}>
        Generar Ticket
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "1000px" }}>
          {/* Select de tipo de ticket */}
          <FormControl fullWidth sx={{ marginBottom: 2 , textAlign: "start"}}>
            <InputLabel id="ticket-type-label">Tipo de Problema</InputLabel>
            <Select
              labelId="ticket-type-label"
              value={ticketType}
              onChange={handleTicketTypeChange}
              required
              label="Tipo de Ticket"
            >
              {Object.keys(ticketTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Mostrar el SLA correspondiente */}
          {ticketType && sla && (
            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 , textAlign: "start"}}>
              Tiempo de respuesta (SLA): {sla} minutos
            </Typography>
          )}

          {/* Descripción del ticket */}
          <TextField
            fullWidth
            label="Cuéntanos más sobre tu problema"
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
              width: '100%',
              borderRadius: 1,
              fontWeight: 'bold',
              padding: '12px 0',
              boxShadow: 3,
              '&:hover': { backgroundColor: '#1976d2' },
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
