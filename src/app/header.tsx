import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import './globals.css';
import { loginAction, logoutAction } from "./actions";
import { getClient } from "./lib/wix-client";
import { getServerClient } from "./lib/wix";

export async function Header() {
    const client = await getClient(); // Await if async
    const serverClient = await getServerClient();
    const isLoggedIn = await serverClient.auth.loggedIn();

    console.log(isLoggedIn);

    return (
        <div className="animated-gradient border-b py-3">
            <div className="container mx-auto flex justify-between items-center">
                <Button variant="link" asChild>
                    <Link
                        href="/"
                        className="text-3xl flex items-center gap-2 font-[family-name:var(--font-dancing-script)] text-green-800"
                    >
                        <Image src="/story.png" width={32} height={32} alt="StoryNest" />
                        StoryNest
                    </Link>
                </Button>
                <div className="flex items-center gap-4">
                    <Button asChild variant="link">
                        <Link href="/stories" className="text-green-800">
                            🌱 Browse Stories
                        </Link>
                    </Button>
                    <div>
                        {isLoggedIn ? (
                            <div className="flex items-center gap-2">
                                <form action={logoutAction}>
                                    <Button variant="outline">Logout</Button>
                                </form>
                            </div>
                        ) : (
                            <form action={loginAction}>
                                <Button variant="outline">Login</Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
