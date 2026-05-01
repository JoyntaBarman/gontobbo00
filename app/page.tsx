'use client';
import Navbar from "@/components/shared/Navbar";
import {Button} from "@/components/ui/button";
import {signIn, signOut, useSession} from "next-auth/react";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Service";
import { Features } from "@/components/Featires";
import { HowItWorks } from "@/components/HowItWorks";
import { Blog } from "@/components/Blog";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";


export default function Home() {
    const {data: session, status} = useSession();

  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <Services />
        {/* <Features /> */}
        <HowItWorks />
        <Blog />
        <CTA />
        <Footer />
        {session ? (
          <>
            <p>name: {session?.user?.name}</p>
            <p>name: {session?.user?.name}</p>
            <p>name: {session?.user?.name}</p>
            <p>name: {session?.user?.name}</p>
            <Button onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <Button onClick={() => signIn()}> Signin</Button>
        )}
      </div>
    </>
  );
}
