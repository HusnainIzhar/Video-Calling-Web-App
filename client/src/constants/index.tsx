import {
  House,
  CalendarFold,
  CassetteTape,
  Plus,
  Calendar,
} from "lucide-react";
export const sidebarData = [
  {
    label: "Home",
    icon: <House />,
    route: "/",
  },
  {
    label: "Upcomming",
    icon: <CalendarFold />,
    route: "/upcomming",
  },
  {
    label: "Previous",
    icon: <Calendar />,
    route: "/previous",
  },
  {
    label: "Recordings",
    icon: <CassetteTape />,
    route: "/recordings",
  },
  {
    label: "Personal Room",
    icon: <Plus />,
    route: "/personal-room",
  },
];
