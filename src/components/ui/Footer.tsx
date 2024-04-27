import authOptions from "@/libs/authOptions";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import NextLink from "next/link";

async function Footer(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  const isAllowed = !!session;

  const t = await getTranslations("Index");

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
              {t("team")}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Link
              href=""
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
              <Box sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}>
                <Image
                  alt="RSystfip logotype"
                  src="/rsystfip_logotype.svg"
                  width={40}
                  height={32}
                  priority
                />
              </Box>
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <nav>
              <Link
                href={!isAllowed ? "/" : "/ITFIP-Rectory/home"}
                component={NextLink}
                variant="body2"
                color="textSecondary"
                sx={{ mr: 2 }}
              >
                {t("home")}
              </Link>

              <Link
                href="/ITFIP-Rectory/faqs"
                component={NextLink}
                variant="body2"
                color="textSecondary"
                sx={{ mr: 2 }}
              >
                {t("faqs")}
              </Link>

              <Link
                href=""
                component={NextLink}
                variant="body2"
                color="textSecondary"
                sx={{ mr: 2 }}
              >
                {t("about")}
              </Link>

              <Link
                href="/recover-password"
                component={NextLink}
                variant="body2"
                color="textSecondary"
              >
                {t("forgot")}
              </Link>
            </nav>
          </Grid>
        </Grid>
      </footer>
    </Container>
  );
}

export default Footer;
