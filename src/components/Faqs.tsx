"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function Faqs(): React.ReactNode {
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
            <Typography alignSelf="center" sx={{ width: "13%", flexShrink: 0 }}>
              {"#1"}
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {
                "How can I see a list of all the people who have visited the rectory up to today?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "To see all the people who are scheduled and registered in the application for a visit to the rectory, you must go to the"
              }
              <code>{" People "}</code>
              {
                "section, which is located in the top bar of all sections of the application and access that option to see all the relevant information of each person."
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
                "How to schedule an appointment for a specific date or day and time?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "To schedule an appointment with the rectory of the ITFIP (Schedule a person) you must go to the"
              }
              <code>{" Schedule "}</code>
              {
                "section, at the top of the application's options bar. Once in the calendar view, select the day by clicking on the box and inside on the number of the day or on the side bar of the scheduling calendar click on week (week) or day (day) to schedule on the day you have selected and finally drag and drop until the time you require the appointment."
              }
            </Typography>

            <Typography sx={{ mt: 2 }}>
              {
                "Complete the scheduling form with all the requested data, finally submit the form to complete the process."
              }
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>{"Note: "}</strong>
              {
                "The selected day or week in the scheduling calendar can be changed easily and simply using the arrows that appear at the top left of the calendar."
              }
            </Typography>

            <Typography>
              {
                "The button today serves to easily position yourself on the current day and/or current date of the scheduling calendar."
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
                "How to quickly schedule day-to-day, a person who arrives immediately at the rectory?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "Scheduling day-to-day means scheduling the person at the same moment they have arrived at the Rectory and the Rector is available to attend to them at that moment, so at this moment the scheduling is done, for that go to the option of"
              }
              <code>{" Schedule "}</code>
              {
                ", and then complete the scheduling form, which is the same except for the difference of selecting the date and time, since it is at the same moment and this is saved automatically when submitting the form."
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
            <Typography alignSelf="center" sx={{ width: "13%", flexShrink: 0 }}>
              {"#4"}
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {
                "How to view statistics and graphical reports of the people who visited the rectory on a certain date or month to month?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "To view a graphical report and visually better and more interactive information, you must go to the"
              }
              <code>{" Reports "}</code>
              {
                "section, and click on the dropdown menu, then select the option"
              }
              <code>{" Graphs report scheduling "}</code>
              {
                "and you only need to select the date range between which you want to see the information."
              }
            </Typography>

            <Typography sx={{ mt: 2 }}>
              {
                "You can freely and interactively choose the type of graph to read and/or consume the information."
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
                "How to generate reports and see a detailed list with the date and time information of scheduling?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "To generate reports and be able to view them easily, you must go to the"
              }
              <code>{" Reports "}</code>
              {
                "section, and click on the dropdown menu. then select the option"
              }
              <code>{" Generate scheduling report "}</code>
              {
                "and then select the date between which you want the report, you can also specify the type of person who visited the rectory and click on"
              }
              <code>{" Filter "}</code>
              {", to get the report."}
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
                "How to generate a PDF report with the information of the people who visited the rectory in a certain period of time or up to today?"
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {
                "To generate a PDF report and save it locally on the device, you must go to the"
              }
              <code>{" Reports "}</code>
              {
                "section, and click on the dropdown menu, then select the option"
              }
              <code>{" Generate scheduling report "}</code>
              {
                ", and then complete the options you require to filter the information, then click on"
              }
              <code>{" Download "}</code>
              {"or in"}
              <code>{" View "}</code>
              {"to view the report before downloading it."}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>{"Note: "}</strong>
              {"The option"}
              <code>{" View "}</code>
              {
                "only works on computers or desktop laptops, on mobile phones that run a browser different from a desktop version, it cannot be done."
              }
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

export default Faqs;
