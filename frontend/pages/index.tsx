'use client'
import React, { useEffect } from 'react';
import Cookies from "js-cookie";
import WorkBoard from "@/components/WorkBoard"; 
import { useRouter } from 'next/router';
import DashboardCardContainer from '@/components/DashboardCardContainer'


const Home: React.FC = () => {

  const userId = Cookies.get("user");
  const router = useRouter();


  useEffect(() => {
    if(!userId) {
      router.push("/login");
    }
  }, [userId, router]);

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <header>
        <DashboardCardContainer/>
      </header>
     <main className="mx-1 w-full">
        <WorkBoard />
      </main>
    </div>
  );
};

export default Home;
