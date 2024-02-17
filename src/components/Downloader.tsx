import DownloadIcon from "@mui/icons-material/Download";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import { format } from "date-fns";
import type { TCreatedPdf } from "pdfmake/build/pdfmake";

interface IProps {
  pdf: TCreatedPdf;
}

function Downloader({ pdf }: IProps): React.ReactNode {
  return (
    <Tooltip
      title={`Download the RSystfip-Report-${format(
        new Date(),
        "yyyy-MM-dd HH:mm:ss"
      )}.pdf`}
    >
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
    </Tooltip>
  );
}

export default Downloader;
