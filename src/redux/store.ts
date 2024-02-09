import appointmentsSlice from "@/redux/features/appointments/appointmentsSlice";
import calendarSlice from "@/redux/features/calendar/calendarSlice";
import cancellationsSlice from "@/redux/features/cancellations/cancellationsSlice";
import peopleSlice from "@/redux/features/people/peopleSlice";
import reportsSlice from "@/redux/features/reports/reportsSlice";
import resourcesSlice from "@/redux/features/resources/resourcesSlice";
import statisticsSlice from "@/redux/features/statistics/statisticsSlice";
import tempSlice from "@/redux/features/temp/tempSlice";
import usersSlice from "@/redux/features/users/usersSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    people: peopleSlice,
    users: usersSlice,
    cancellation: cancellationsSlice,
    reports: reportsSlice,
    statistics: statisticsSlice,
    resources: resourcesSlice,
    appointments: appointmentsSlice,
    calendar: calendarSlice,
    temp: tempSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
