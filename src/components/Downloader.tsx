import DownloadIcon from "@mui/icons-material/Download";
import Fab from "@mui/material/Fab";
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
        // () =>
        //   pdf.download(
        //     `RSystfip-Report-${format(new Date(), "yyyy-MM-dd HH:mm:ss")}.pdf`
        //   )
      }
    >
      <DownloadIcon />
    </Fab>
  );
}

export default Downloader;
