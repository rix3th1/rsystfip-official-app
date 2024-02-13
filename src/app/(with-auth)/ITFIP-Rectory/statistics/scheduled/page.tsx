import { Statistics } from "@/components";
import { AppointmentStatus } from "@/redux/features/appointments/appointmentsSlice";
import Container from "@mui/material/Container";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Statistics scheduled people",
};

function PageStcsSchedule(): React.ReactNode {
  return (
    <Container component="main" maxWidth="xl">
      <Statistics appointment_status={AppointmentStatus.scheduled} />
    </Container>
  );
}

export default PageStcsSchedule;
