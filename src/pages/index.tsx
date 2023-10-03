import { Inter } from 'next/font/google'
import { Dashboard } from "../features/Dashboard/Dashboard";
import { NextPage } from "next";
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';

const inter = Inter({ subsets: ['latin'] })

const HomePage: NextPage = () => {
  return (
    <Dashboard />
  );
}

export default HomePage;
