import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export async function authorize(requiredRole = null) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      session: null,
      error: new Response(
        JSON.stringify({ error: "Необхідно увійти в систему" }),
        { status: 401 }
      ),
    };
  }

  if (requiredRole && session.user.role !== requiredRole) {
    return {
      session: null,
      error: new Response(
        JSON.stringify({ error: `Потрібна роль: ${requiredRole}` }),
        { status: 403 }
      ),
    };
  }

  return { session, error: null };
}