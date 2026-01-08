"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Public routes that should ONLY be accessible to non-logged users
        const isPublicOnlyRoute = pathname === "/";

        // Private routes that require authentication
        const isPrivateRoute = pathname.startsWith("/feed") ||
            pathname.startsWith("/profile") ||
            pathname.startsWith("/post/") ||
            pathname.startsWith("/create");

        if (token) {
            if (isPublicOnlyRoute) {
                router.push("/feed");
            } else {
                setIsReady(true);
            }
        } else {
            if (isPrivateRoute) {
                router.push("/");
            } else {
                setIsReady(true);
            }
        }
    }, [pathname, router]);

    if (!isReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return <>{children}</>;
}
