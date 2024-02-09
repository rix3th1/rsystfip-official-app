import authOptions from "@/libs/authOptions";
import CodeIcon from "@mui/icons-material/Code";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import NextLink from "next/link";

async function Footer(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  const isAllowed = !!session;

  return (
    <Container maxWidth="lg" sx={{ py: 4, my: 4 }}>
      <footer>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          textAlign="center"
        >
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="textSecondary">
              © 2023 Tecnología en gestión informática{" "}
              <CodeIcon fontSize="small" sx={{ my: -0.5 }} />
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Link
              href="/"
              component={NextLink}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: { xs: 3, md: 0 },
                mr: { xs: 0, md: "auto" },
              }}
            >
              <Box
                component="img"
                alt="RSystfip logotype"
                src={"/rsystfip_logotype.svg"}
                width={40}
                height={32}
                sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}
              />
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <nav>
              <Link
                href={!isAllowed ? "/" : "/home"}
                component={NextLink}
                variant="body2"
                color="textSecondary"
                sx={{ mr: 2 }}
              >
                Inicio
              </Link>

              <Link
                href="/faqs"
                component={NextLink}
                variant="body2"
                color="textSecondary"
                sx={{ mr: 2 }}
              >
                FAQs
              </Link>

              <Link
                href="#"
                component={NextLink}
                variant="body2"
                color="textSecondary"
                sx={{ mr: 2 }}
              >
                Acerca de
              </Link>

              <Link
                href="/recover-password"
                component={NextLink}
                variant="body2"
                color="textSecondary"
              >
                Olvidó su contraseña?
              </Link>
            </nav>
          </Grid>
        </Grid>
      </footer>
    </Container>
  );
}

export default Footer;
