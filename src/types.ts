export interface Ticket {
    id?: string;
    title: string;
    description: string;
    status: "pendiente" | "en proceso" | "resuelto";
    createdAt: number;
    userId: string;
  }
  