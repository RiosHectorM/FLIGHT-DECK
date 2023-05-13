import { useRouter } from "next/router";
import { useEffect, ReactNode } from "react";
import { useUserStore, UserRole } from '../../../store/userStore';

type AllowedRoles = UserRole[];

interface ProtectedRouteProps {
  allowedRoles: AllowedRoles;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const router = useRouter();
  const { user } = useUserStore();
  const role = user?.role;

  useEffect(() => {
    if (!allowedRoles.includes(role)) {
      router.push("/home");
    }
  }, [allowedRoles, role, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
