'use client';
import Navbar from "@/components/shared/Navbar";
import {Button} from "@/components/ui/button";
import {signIn, signOut, useSession} from "next-auth/react";


export default function Home() {
    const {data: session, status} = useSession();

  return (
      <>

      <div>
        <Navbar/>
          {
              session ? (
                  <>
                      <p>
                          name: {session?.user?.name}
                      </p>
                      <p>
                          name: {session?.user?.name}
                      </p>
                      <p>
                          name: {session?.user?.name}
                      </p>
                      <p>
                          name: {session?.user?.name}
                      </p>
                      <Button onClick={() => signOut()}>Logout</Button>
                  </>
              ) : (
                  <Button onClick={() => signIn()}> Signin</Button>
              )

          }
      </div>
      </>
  );
}
