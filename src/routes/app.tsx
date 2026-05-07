import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
