import DownloadIcon from "@mui/icons-material/Download";
import { Fab } from "@mui/material";
import type { TCreatedPdf } from "pdfmake/build/pdfmake";

interface IProps {
  pdf: TCreatedPdf;
}

function Downloader({ pdf }: IProps): React.ReactNode {
  return (
    <Fab
      variant="circular"
      size="small"
      color="primary"
      sx={{ mb: 2 }}
      onClick={
        () => pdf.open()
        // pdf.download(`RSystfip-Report-${formatTodaysDateTime()}.pdf`)
      }
    >
      <DownloadIcon />
    </Fab>
  );
}

export default Downloader;
