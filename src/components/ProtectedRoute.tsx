import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useLoading } from "@/context/LoadingContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isInitialLoadComplete } = useLoading();

    if (!isInitialLoadComplete) {
        return <Navigate to="/loading" replace />;
    }

    return children;
};

export default ProtectedRoute;
