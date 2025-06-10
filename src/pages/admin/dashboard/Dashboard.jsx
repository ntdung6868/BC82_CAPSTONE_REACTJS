import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";
import { SectionCards } from "@/components/ui/section-cards";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <h1 className="mt-4 font-bold">Thống kê (Ảo)</h1>

      <div className="mt-4 space-y-10">
        <SectionCards />
        <ChartAreaInteractive />
      </div>
    </>
  );
};

export default Dashboard;
