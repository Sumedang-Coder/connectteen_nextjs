import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RecentPosts } from "@/components/RecentPosts";
import { Articles } from "@/components/Articles";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <RecentPosts />
      <Articles />
      <Events />
      <Footer />
    </div>
  );
}
