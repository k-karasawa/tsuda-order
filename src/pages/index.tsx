import { Inter } from 'next/font/google'
import { Dashboard } from "../features/Dashboard/Dashboard";
import { NextPage } from "next";
import { useRequireLogin } from "../components/Auth/useRequireLogin";

const inter = Inter({ subsets: ['latin'] })

const HomePage: NextPage = () => {
  useRequireLogin();
  return (
    <Dashboard />
  );
}

export default HomePage;
