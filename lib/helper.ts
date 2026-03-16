import {Session} from "next-auth";

export const checkUserRouteAccess = (session: Session | null, role: string) => {

    if (!session) {
        return false;
    }

    return session?.user?.role === role;
}