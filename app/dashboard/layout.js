import DashboardShell from "@/components/DashboardShell";

export const metadata = {
  title: "Dashboard | HR.agency",
};

export default function DashboardLayout({ children }) {

  return <DashboardShell>{children}</DashboardShell>;
}