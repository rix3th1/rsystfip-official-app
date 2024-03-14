"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { useState } from "react";

function Faqs(): React.ReactNode {
  const t = useTranslations("PageFaqs");

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
              {t("question1")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {t.rich("response1.p1", {
                code: (chunks) => <code>{chunks}</code>,
              })}
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
              {t("question2")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {t.rich("response2.p1", {
                code: (chunks) => <code>{chunks}</code>,
              })}
            </Typography>

            <Typography sx={{ mt: 2 }}>{t("response2.p2")}</Typography>

            <Typography sx={{ mt: 2 }}>
              {t.rich("response2.p3", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </Typography>

            <Typography>{t("response2.p4")}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedSec1 === "panel3"}
          onChange={handleChangeSec1("panel3")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: "13%", flexShrink: 0 }}>{"#3"}</Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {t("question3")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {t.rich("response3.p1", {
                code: (chunks) => <code>{chunks}</code>,
              })}
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
              {t("question4")}
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
              {t("question5")}
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
              {t("question6")}
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
