export enum AppointmentStatus {
  daily = "daily",
  scheduled = "scheduled",
  cancelled = "cancelled",
}

export interface IAppointment {
  id: number;
  person_id?: number;
  created_at?: string;
  updated_at?: string;
  start_time?: string;
  end_time?: string;
  visit_subject: string;
  status: AppointmentStatus;
  color?: string;
}
