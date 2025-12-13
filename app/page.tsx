'use client'
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RecentPosts } from "@/components/RecentPosts";
import { Articles } from "@/components/Articles";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";
import { SendPage } from "@/components/SendPage";
import Auth from "@/components/Auth";
import { ExplorePage } from "@/components/ExplorePage";
import { HistoryPage } from "@/components/HistoryPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />

      {currentPage === "home" && (
        <>
          <Hero onNavigate={setCurrentPage} />
          <RecentPosts />
          <Articles />
          <Events />
        </>
      )}
      {currentPage === "send" && <SendPage />}
      {currentPage === "signin" && <Auth />}
      {currentPage === "explore" && <ExplorePage />}
      {currentPage === "history" && <HistoryPage />}
      <Footer />
    </div>
  );
}
