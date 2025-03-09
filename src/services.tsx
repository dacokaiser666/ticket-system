import {
  BugReport,
  Build,
  Computer,
  NetworkWifi,
  Storage,
} from "@mui/icons-material";

export const services = [
  {
    name: "Soporte Técnico",
    description: "Ayuda con problemas técnicos de hardware y software.",
    sla: 120,
    icon: <Build />, // Icono de herramientas para soporte técnico
  },
  {
    name: "Redes y Conectividad",
    description: "Solución de problemas de conexión y configuración de red.",
    sla: 240,
    icon: <NetworkWifi />, // Icono de red para conectividad
  },
  {
    name: "Mantenimiento de Equipos",
    description: "Solicita mantenimiento para tu hardware o equipos.",
    sla: 180,
    icon: <Computer />, // Icono de computadora para mantenimiento de equipos
  },
  {
    name: "Software y Licencias",
    description: "Ayuda con instalación y licencias de software.",
    sla: 90,
    icon: <Storage />, // Icono de almacenamiento para software y licencias
  },
  {
    name: "Reportar caída del servicio",
    description:
      "Infórmanos sobre irregularidades o interrupciones en el sistema.",
    sla: 60,
    icon: <BugReport />, // Icono de error/bug para reportar caídas
  },
];
