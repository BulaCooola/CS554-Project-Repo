import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
    const session = await getServerSession();
    console.log("abc",session);
    if (!session) {
        return (
            <main>{children}</main>
        )
    }
    else{
        redirect("/");
    } 
}