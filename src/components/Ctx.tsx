import { Box } from "@mui/material";
import { memo } from "react";

interface IProps {
  ctxRef: React.RefObject<HTMLCanvasElement>;
}

function Ctx({ ctxRef }: IProps): React.ReactNode {
  return (
    <Box
      component="canvas"
      ref={ctxRef}
      sx={{
        marginY: 5,
        width: { xs: "50%" },
        height: 400,
      }}
    />
  );
}

export default memo(Ctx);
