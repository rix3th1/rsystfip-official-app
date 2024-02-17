import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import { ScrollTop } from ".";

function ScrollTopButton() {
  return (
    <ScrollTop>
      <Tooltip title="Scroll to top">
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </ScrollTop>
  );
}

export default ScrollTopButton;
