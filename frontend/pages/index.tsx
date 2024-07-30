import React from 'react';
import WorkBoard from "@/components/WorkBoard"; // Adjust the path if necessary

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between w-full flex-row p-4">
      </header>
      <main className="mx-4 flex flex-col gap-6">
        <WorkBoard />
      </main>
    </div>
  );
};

export default Home;
