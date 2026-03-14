import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const cvPath = path.join(__dirname, "cv-data.json");

let cv = null;

try {
  const fileContent = fs.readFileSync(cvPath, "utf8");
  cv = JSON.parse(fileContent);
  console.log("CV cargado correctamente.");
} catch (error) {
  console.error("Error al cargar cv-data.json:", error.message);
  process.exit(1);
}

function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function formatExperience() {
  if (!Array.isArray(cv.experience)) {
    return "No hay experiencia registrada.";
  }

  return cv.experience
    .map((job) => {
      const highlights = Array.isArray(job.highlights)
        ? job.highlights.join(". ")
        : "Sin detalles adicionales";

      return `• ${job.role} en ${job.company} (${job.period}). ${highlights}.`;
    })
    .join("\n");
}

function formatEducation() {
  if (!Array.isArray(cv.education)) {
    return "No hay formación registrada.";
  }

  return cv.education
    .map((item) => {
      const base = `${item.institution}: ${item.program || item.note || ""}`.trim();
      const extra = [item.status, item.period].filter(Boolean).join(" | ");
      return `• ${base}${extra ? ` (${extra})` : ""}`;
    })
    .join("\n");
}

function buildReply(message) {
  const msg = normalizeText(message);

  if (!msg) {
    return "Escribe una pregunta sobre Carlos, su experiencia, estudios, habilidades o contacto.";
  }

  if (includesAny(msg, ["hola", "buenas", "hello", "hi"])) {
    return `Hola, soy el asistente virtual del portafolio de ${cv.name}. Puedes preguntarme por su perfil, experiencia, estudios, habilidades o contacto.`;
  }

  if (
    includesAny(msg, [
      "perfil profesional",
      "perfil",
      "quien eres",
      "quien es",
      "presentacion",
      "resumen",
      "sobre carlos",
      "acerca de"
    ])
  ) {
    return `${cv.name} es ${cv.title} en ${cv.location}. ${cv.summary}`;
  }

  if (
    includesAny(msg, [
      "experiencia",
      "trabajo",
      "laboral",
      "empleos",
      "empresa",
      "empresas",
      "donde trabajo"
    ])
  ) {
    return `Esta es la experiencia laboral principal de ${cv.name}:\n\n${formatExperience()}`;
  }

  if (
    includesAny(msg, [
      "estudios",
      "educacion",
      "formacion",
      "titulo",
      "carrera",
      "iacc",
      "aiep"
    ])
  ) {
    return `Formación de ${cv.name}:\n\n${formatEducation()}`;
  }

  if (
    includesAny(msg, [
      "habilidades",
      "skills",
      "tecnologias",
      "tecnicas",
      "conocimientos",
      "que sabe",
      "que maneja"
    ])
  ) {
    return `Habilidades técnicas: ${cv.skills.technical.join(", ")}.\n\nHabilidades blandas: ${cv.skills.soft.join(", ")}.`;
  }

  if (
    includesAny(msg, [
      "programacion",
      "bases de datos",
      "base de datos",
      "software",
      "desarrollo",
      "codigo",
      "algoritmos"
    ])
  ) {
    return `${cv.name} cuenta con formación en análisis y programación computacional, además de experiencia en programación, bases de datos y resolución de problemas tecnológicos.`;
  }

  if (
    includesAny(msg, [
      "redes",
      "telecomunicaciones",
      "cctv",
      "seguridad",
      "biometria",
      "control de acceso",
      "huawei",
      "ubiquiti"
    ])
  ) {
    return `${cv.name} tiene experiencia en gestión de redes y telecomunicaciones, instalación y configuración de CCTV, control de acceso, biometría, detección de incendios, switches, antenas Ubiquiti y equipos Huawei.`;
  }

  if (
    includesAny(msg, [
      "proyectos",
      "proyecto",
      "logros",
      "implementacion",
      "vitacura",
      "las condes",
      "providencia",
      "lo barnechea"
    ])
  ) {
    return "Entre sus experiencias destacadas están la participación en proyectos de instalación y configuración de redes en edificios corporativos y municipales, implementación de sistemas de seguridad electrónica y soporte en proyectos tecnológicos con documentación técnica y capacitaciones internas.";
  }

  if (
    includesAny(msg, [
      "servicios",
      "ofrece",
      "especialidades",
      "areas"
    ])
  ) {
    return `Carlos puede aportar en las siguientes áreas: ${cv.services.join(", ")}.`;
  }

  if (
    includesAny(msg, [
      "contacto",
      "correo",
      "email",
      "telefono",
      "celular",
      "portafolio"
    ])
  ) {
    return `Puedes contactar a ${cv.name} por correo en ${cv.email} o por teléfono al ${cv.phone}.`;
  }

  if (
    includesAny(msg, [
      "blandas",
      "trabajo en equipo",
      "responsable",
      "proactivo"
    ])
  ) {
    return `Entre sus habilidades blandas destacan: ${cv.skills.soft.join(", ")}.`;
  }

  return `Puedo ayudarte con información sobre ${cv.name}: perfil profesional, experiencia laboral, estudios, habilidades técnicas, habilidades blandas, servicios y datos de contacto.`;
}

app.get("/", (req, res) => {
  res.send("Servidor del chatbot funcionando correctamente.");
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    name: cv.name,
    message: "Servidor activo"
  });
});

app.post("/api/chat", (req, res) => {
  try {
    const { message } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        reply: "Debes enviar un mensaje válido."
      });
    }

    if (message.length > 250) {
      return res.status(400).json({
        reply: "El mensaje es demasiado largo. Intenta resumir tu consulta."
      });
    }

    const reply = buildReply(message);
    res.json({ reply });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    res.status(500).json({
      reply: "Ocurrió un error al procesar la consulta."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor del chatbot activo en https://carlosdp521-hub.github.io/portafoliodecarlosdipiazza/`);
});