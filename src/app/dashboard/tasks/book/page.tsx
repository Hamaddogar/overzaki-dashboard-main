// sections
// import { MyTasksBooking } from "src/sections/my-tasks/view";

import { CalendarView } from "src/sections/calendar/view";

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Book Task',
};

export default function MyTasksBookingPage() {
  return <CalendarView />;
}
