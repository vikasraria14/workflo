'use client'
import React, { useEffect } from 'react';
import Cookies from "js-cookie";
import WorkBoard from "@/components/WorkBoard"; 
import { useRouter } from 'next/router';


const Home: React.FC = () => {

  const userId = Cookies.get("user");
  const router = useRouter();


  useEffect(() => {
    if(!userId) {
      router.push("/login");
    }
  }, [userId, router]);

  return (
    <div className="min-h-screen flex flex-col gap-10">
     <main className="mx-4 flex flex-col gap-6">
        <WorkBoard />
      </main>
    </div>
  );
};

export default Home;
