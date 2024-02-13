"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function Faqs() {
  const [expandedSec1, setExpandedSec1] = useState<string | false>(false);
  const [expandedSec2, setExpandedSec2] = useState<string | false>(false);

  const handleChangeSec1 =
    (panel: string) => (_e: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedSec1(isExpanded ? panel : false);
    };

  const handleChangeSec2 =
    (panel: string) => (_e: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedSec2(isExpanded ? panel : false);
    };

  return (
    <Grid
      container
      spacing={2}
      marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      marginBottom={{ xs: "4rem", sm: "5rem", md: "6rem" }}
    >
      <Grid item md>
        <Accordion
          expanded={expandedSec1 === "panel1"}
          onChange={handleChangeSec1("panel1")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              alignSelf={"center"}
              sx={{ width: "13%", flexShrink: 0 }}
            >
              {"#1"}
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {
                "¿Cómo puedo ver una lista de todas las personas que han visitado la rectoría hasta el día de hoy?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "Para ver todas las personas que se encuentran agendadas y registradas en el aplicativo por una visita a la rectoría, debes ir a la seccion de"
              }
              <code>{" Personas "}</code>
              {
                "que se encuentra en la barra superior de todas las secciones del aplicativo y acceder a esa opción, para ver toda la información pertinente de cada persona."
              }
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedSec1 === "panel2"}
          onChange={handleChangeSec1("panel2")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: "13%", flexShrink: 0 }}>{"#2"}</Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {
                "¿Cómo hacer un agendamiento programado para una fecha o día y hora en específico?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "Para reservar una cita con la rectoría del itfip (Agendar una persona) debe dirigirse a la seccion de"
              }
              <code>{" Agendar "}</code>
              {
                ", arriba en la barra superior de opciones del aplicativo. Una vez estando en la vista de calendario, seleccionar el dia dando click en el recuadro y dentro en el número del día ó en la barra lateral del calendario de agendamientos da click en semana (week) o día (day) para agendar en el dia que hayas seleccionado y por último arrastrar y soltar hasta la hora que requiera el agendamiento."
              }
            </Typography>

            <Typography sx={{ mt: 2 }}>
              {
                "Completar el formulario de agendamiento con todos los datos que pida, por último enviar el formulario para completar el proceso."
              }
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>{"Nota: "}</strong>
              {
                "El día o semana seleccionada en el calendario de agendamientos se puede cambiar fácil y sencillamente usando las flechas que aparecen la parte superior izquierda del calendario."
              }
            </Typography>

            <Typography>
              {
                "El boton hoy (today) sirve para posicionarse fácilmente en el dia actual y/o fecha actual del calendario de agendamientos."
              }
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedSec1 === "panel3"}
          onChange={handleChangeSec1("panel3")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: "13%", flexShrink: 0 }}>{"#3"}</Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {
                "¿Cómo hacer un agendamiento rápido del día a día, de una persona que llega inmediatamente a la rectoría?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "Hacer un agendamiento del día a día, significa agendar a la persona en el mismo instante que ha llegado a la Rectoría y el Rector tiene la disponibilidad de atenderlo en ese instante, entonces en este instante se hace dicho agendamiento, para eso se dirige a la opción de"
              }
              <code>{" Agendar "}</code>
              {
                ", y luego completar el formulario de agendamiento, el cual es el mismo excluyendo la diferencia de seleccionar la fecha y hora, ya que es en el mismo instante y ésta es guardada automáticamente al enviar el formulario."
              }
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item md>
        <Accordion
          expanded={expandedSec2 === "panel1"}
          onChange={handleChangeSec2("panel1")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              alignSelf={"center"}
              sx={{ width: "13%", flexShrink: 0 }}
            >
              {"#4"}
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {
                "¿Cómo ver estadísticas e informes gráficos de las personas que visitaron la rectoría en determinada fecha ó mes a mes?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "Para ver un reporte gráfico e información visualmente mejor y más interactiva, se debe dirigir a la sección de"
              }
              <code>{" Reportes "}</code>
              {
                ", y dar click en el menu desplegable, luego seleccionar la opcion"
              }
              <code>{" Gráficas reporte agendamientos "}</code>
              {
                "y tan sólo debe seleccionar el rango de fecha entre cual desea ver la información."
              }
            </Typography>

            <Typography sx={{ mt: 2 }}>
              {
                "Puede escoger libremente e interactivamente el tipo de gráfico para leer y/o consumir la información"
              }
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedSec2 === "panel2"}
          onChange={handleChangeSec2("panel2")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: "13%", flexShrink: 0 }}>{"#5"}</Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {
                "¿Cómo generar reportes y ver un listado detallado con la información de fecha y hora de agendamiento?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "Para generar reportes y poderlos visualizar facilmente, se debe dirigir a la sección de"
              }
              <code>{" Reportes "}</code>
              {
                ", y dar click en el menu desplegable. luego seleccionar la opción"
              }
              <code>{" Generar reporte de agendamientos "}</code>
              {
                "y luego seleccionar la fecha entre la cual desea el reporte, tambien puede especificar el tipo de persona que visitaron la rectoría y darle click en"
              }
              <code>{" Filtrar "}</code>
              {", para obtener el reporte."}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedSec2 === "panel3"}
          onChange={handleChangeSec2("panel3")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: "13%", flexShrink: 0 }}>{"#6"}</Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {
                "¿Cómo generar un reporte PDF con la información de las personas que visitaron la rectoría en determinado lapso de tiempo o hasta el día de hoy?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "Para generar un reporte PDF y guardarlo localmente en el dispositivo, se debe dirigir a la sección de"
              }
              <code>{" Reportes "}</code>
              {
                ", y dar click en el menu desplegable, luego seleccionar la opcion"
              }
              <code>{" Generar reporte de agendamientos "}</code>
              {
                ", y luego completar las opciones que requiera para filtrar la información, despues se debe dar click en"
              }
              <code>{" Descargar "}</code>
              {"ó en"}
              <code>{" Visualizar "}</code>
              {"para ver el reporte antes de descargarlo."}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>{"Nota: "}</strong>
              {"La opción"}
              <code>{" Visualizar "}</code>
              {
                "sólo funciona en computadores o portátiles de escritorio, en teléfonos móviles que ejecuten un navegador diferente al de una versión de escritorio, no se puede."
              }
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

export default Faqs;
