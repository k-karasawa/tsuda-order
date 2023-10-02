import { Inter } from 'next/font/google'
import { Dashboard } from "../features/Dashboard/Dashboard";
import { NextPage } from "next";

const inter = Inter({ subsets: ['latin'] })

const HomePage: NextPage = () => {
  return (
    <>
      <Dashboard />
    </>
  );
}

export default HomePage;
