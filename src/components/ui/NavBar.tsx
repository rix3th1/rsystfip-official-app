"use client";

import { notify } from "@/libs/notify";
import { resetAllFormDataProgramming } from "@/redux/features/appointments/appointmentsSlice";
import { resetQueryDataReports } from "@/redux/features/reports/reportsSlice";
import { resetQueryDataStatistics } from "@/redux/features/statistics/statisticsSlice";
import { destroyTemporals } from "@/redux/features/temp/tempSlice";
import { resetFormDataAdmin } from "@/redux/features/users/usersSlice";
import { useAppDispatch } from "@/redux/hooks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import NextLink from "next/link";
import { useState } from "react";
import ProtectedElement from "./ProtectedElement";

interface IProps {
  permissions: Array<string>;
}

function NavBar({ permissions }: IProps): React.ReactNode {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElMenu1, setAnchorElMenu1] = useState<null | HTMLElement>(null);
  const [anchorElMenu2, setAnchorElMenu2] = useState<null | HTMLElement>(null);
  const [anchorElMenu3, setAnchorElMenu3] = useState<null | HTMLElement>(null);

  const handleOpenMenu1 = (
    event: React.MouseEvent<HTMLButtonElement | HTMLLIElement>
  ) => {
    setAnchorElMenu1(event.currentTarget);
  };
  const handleCloseMenu1 = () => {
    setAnchorElMenu1(null);
  };

  const handleOpenMenu2 = (
    event: React.MouseEvent<HTMLButtonElement | HTMLLIElement>
  ) => {
    setAnchorElMenu2(event.currentTarget);
  };
  const handleCloseMenu2 = () => {
    setAnchorElMenu2(null);
  };

  const handleOpenMenu3 = (
    event: React.MouseEvent<HTMLButtonElement | HTMLLIElement>
  ) => {
    setAnchorElMenu3(event.currentTarget);
  };
  const handleCloseMenu3 = () => {
    setAnchorElMenu3(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickSignOut = async () => {
    // Reset the Redux context
    handleCloseUserMenu();
    dispatch(resetFormDataAdmin());
    dispatch(resetQueryDataReports());
    dispatch(resetQueryDataStatistics());
    dispatch(resetAllFormDataProgramming());
    dispatch(destroyTemporals());

    // Close the session
    await signOut({ redirect: false });

    // Redirect to the sign in page
    router.push("/signin");
    router.refresh();
    notify("Sesión cerrada", { type: "success", position: "top-center" });
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters sx={{ mx: 3 }}>
        <Box
          component="img"
          alt="RSystfip logotype"
          src={"/rsystfip_logotype.svg"}
          width={40}
          height={32}
          sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}
        />

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuItem
              component={NextLink}
              href="/ITFIP-Rectory/home"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Inicio</Typography>
            </MenuItem>

            <MenuItem
              component={NextLink}
              href="/ITFIP-Rectory/users"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Usuarios</Typography>
            </MenuItem>
            <MenuItem onClick={handleOpenMenu1}>
              Agendar <KeyboardArrowDownIcon />
            </MenuItem>
            <MenuItem
              component={NextLink}
              href="/ITFIP-Rectory/appointments"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Agendamientos</Typography>
            </MenuItem>
            <MenuItem onClick={handleOpenMenu2}>
              Estadísticas <KeyboardArrowDownIcon />
            </MenuItem>
            <MenuItem
              component={NextLink}
              href="/ITFIP-Rectory/reports"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Reportes</Typography>
            </MenuItem>
            <MenuItem onClick={handleOpenMenu3}>
              Historial <KeyboardArrowDownIcon />
            </MenuItem>
            <MenuItem
              component={NextLink}
              href="/ITFIP-Rectory/faqs"
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">Faqs</Typography>
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button
            component={NextLink}
            href="/ITFIP-Rectory/home"
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white" }}
          >
            Inicio
          </Button>

          <ProtectedElement isAllowed={permissions.includes("admin")}>
            <Button
              component={NextLink}
              href="/ITFIP-Rectory/users"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white" }}
            >
              Usuarios
            </Button>
          </ProtectedElement>

          <Button
            onClick={handleOpenMenu1}
            sx={{ my: 2, color: "white" }}
            disableElevation
            endIcon={<KeyboardArrowDownIcon />}
          >
            Agendar
          </Button>

          <Menu
            anchorEl={anchorElMenu1}
            open={Boolean(anchorElMenu1)}
            sx={{ marginLeft: { xs: "45px", md: "0px" } }}
            onClose={handleCloseMenu1}
            onClick={() => handleCloseNavMenu()}
          >
            <ProtectedElement isAllowed={permissions.includes("add")}>
              <MenuItem
                component={NextLink}
                href="/ITFIP-Rectory/people/create"
                onClick={handleCloseMenu1}
              >
                <Typography textAlign="center">Diario</Typography>
              </MenuItem>
            </ProtectedElement>

            <ProtectedElement isAllowed={permissions.includes("schedule")}>
              <MenuItem
                component={NextLink}
                href="/ITFIP-Rectory/people/create-schedule"
                onClick={handleCloseMenu1}
              >
                <Typography textAlign="center">Programado</Typography>
              </MenuItem>
            </ProtectedElement>
          </Menu>

          <ProtectedElement isAllowed={permissions.includes("schedule")}>
            <Button
              component={NextLink}
              href="/ITFIP-Rectory/appointments"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white" }}
            >
              Agendamientos
            </Button>
          </ProtectedElement>

          <ProtectedElement isAllowed={permissions.includes("statistics")}>
            <Button
              onClick={handleOpenMenu2}
              sx={{ my: 2, color: "white" }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Estadísticas
            </Button>
          </ProtectedElement>

          <Menu
            anchorEl={anchorElMenu2}
            open={Boolean(anchorElMenu2)}
            sx={{ marginLeft: { xs: "45px", md: "0px" } }}
            onClose={handleCloseMenu2}
            onClick={() => handleCloseNavMenu()}
          >
            <MenuItem
              component={NextLink}
              href="/ITFIP-Rectory/statistics/daily"
              onClick={handleCloseMenu2}
            >
              <Typography textAlign="center">Diario</Typography>
            </MenuItem>

            <MenuItem
              component={NextLink}
              href="/ITFIP-Rectory/statistics/scheduled"
              onClick={handleCloseMenu2}
            >
              <Typography textAlign="center">Programado</Typography>
            </MenuItem>
          </Menu>

          <ProtectedElement isAllowed={permissions.includes("reports")}>
            <Button
              component={NextLink}
              href="/ITFIP-Rectory/reports"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white" }}
            >
              Reportes
            </Button>
          </ProtectedElement>

          <Button
            onClick={handleOpenMenu3}
            sx={{ my: 2, color: "white" }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Historial
          </Button>

          <Menu
            anchorEl={anchorElMenu3}
            open={Boolean(anchorElMenu3)}
            sx={{ marginLeft: { xs: "45px", md: "0px" } }}
            onClose={handleCloseMenu3}
            onClick={() => handleCloseNavMenu()}
          >
            <MenuItem
              component={NextLink}
              href="/ITFIP-Rectory/history/general"
              onClick={handleCloseMenu3}
            >
              <Typography textAlign="center">General</Typography>
            </MenuItem>

            <MenuItem
              component={NextLink}
              href="/ITFIP-Rectory/history/cancelled"
              onClick={handleCloseMenu3}
            >
              <Typography textAlign="center">Cancelamientos</Typography>
            </MenuItem>
          </Menu>

          <Button
            component={NextLink}
            href="/ITFIP-Rectory/faqs"
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white" }}
          >
            Faqs
          </Button>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>
                {session?.user.first_name[0]
                  ?.toUpperCase()
                  .concat(session.user.last_name[0]?.toUpperCase())}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              component={NextLink}
              href="/ITFIP-Rectory/faqs"
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">Ayuda</Typography>
            </MenuItem>

            <MenuItem
              component={NextLink}
              href={`/ITFIP-Rectory/users/change-password/${session?.user.id}`}
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">Cambiar contraseña</Typography>
            </MenuItem>

            <MenuItem onClick={handleClickSignOut}>
              <Typography textAlign="center">Cerrar sesión</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
