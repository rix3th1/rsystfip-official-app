import { FormSignin } from "@/components";
import authOptions from "@/libs/authOptions";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "RSystfip | Sign in",
};

async function PageSignin(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);

  if (session) redirect("/ITFIP-Rectory/home");

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("/background.jpg")',
          backgroundRepeat: "no-repeat",
          // backgroundColor: (t) =>
          //   t.palette.mode === "light"
          //     ? t.palette.grey[50]
          //     : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ px: 3 }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            alt="RSystfip logotype"
            src={"/rsystfip_logotype.svg"}
            width={40}
            height={32}
            sx={{ m: 1 }}
          />

          <Typography component="h1" variant="h5">
            {"Sign in"}
          </Typography>

          <Typography component="h1" variant="subtitle1" align="center">
            {"Agendamiento visitas Rectoría - ITFIP"}
          </Typography>

          <FormSignin />
        </Box>
      </Grid>
    </Grid>
  );
}

export default PageSignin;
