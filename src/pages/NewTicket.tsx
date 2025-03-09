import { useState } from "react";

import { collection, addDoc, Timestamp } from "firebase/firestore";

import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { db } from "../firebase/firebase";

const NewTicket = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    await addDoc(collection(db, "tickets"), {
      title,
      description,
      status: "pendiente",
      createdAt: Timestamp.now().toMillis(),
      userId: user?.uid,
    });

    navigate("/dashboard");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Nuevo Ticket</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Título" value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" required />
        <TextField fullWidth label="Descripción" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" required />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Crear Ticket</Button>
      </form>
    </Container>
  );
};

export default NewTicket;
