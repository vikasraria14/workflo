import React from 'react';
import WorkBoard from "@/components/WorkBoard"; 
import Navbar from '@/components/layout/Navbar'


const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col gap-10">
      {/* <header>
      <Navbar/>
      </header> */}
     <main className="mx-4 flex flex-col gap-6">
        <WorkBoard />
      </main>
    </div>
  );
};

export default Home;
