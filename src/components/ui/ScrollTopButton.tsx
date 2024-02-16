import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fab from "@mui/material/Fab";
import { ScrollTop } from ".";

function ScrollTopButton() {
  return (
    <ScrollTop>
      <Fab size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  );
}

export default ScrollTopButton;
