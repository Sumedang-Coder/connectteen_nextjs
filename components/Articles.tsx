import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, ArrowRight, BookOpen, Heart, Sparkles } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Building Healthy Online Friendships",
    excerpt: "Learn how to create meaningful connections in digital spaces while staying safe and respectful.",
    category: "Community",
    readTime: "5 min read",
    icon: "🤝",
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 2,
    title: "Managing Screen Time Effectively",
    excerpt: "Discover tips and strategies to balance your online presence with real-world activities and well-being.",
    category: "Wellness",
    readTime: "7 min read",
    icon: "🌟",
    color: "from-purple-400 to-pink-400"
  },
  {
    id: 3,
    title: "Creative Writing for Beginners",
    excerpt: "Start your journey into creative writing with these simple exercises and inspiring prompts.",
    category: "Creative",
    readTime: "6 min read",
    icon: "✍️",
    color: "from-orange-400 to-yellow-400"
  }
];

export function Articles() {
  return (
    <section className="py-16 px-6 bg-linear-to-b from-purple-50 via-pink-50 to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">Featured Articles 📚</h2>
            <p className="text-lg mt-2">Learn and grow together!</p>
          </div>
          <Button variant="ghost" className="gap-2 hover:bg-purple-100">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white shadow-lg bg-white">
              <div className={`h-3 bg-linear-to-r ${article.color}`}></div>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-5xl">{article.icon}</div>
                  <span className="text-sm text-muted-foreground flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <Badge className={`w-fit bg-linear-to-r ${article.color} text-white border-0 mb-2`}>
                  {article.category}
                </Badge>
                <CardTitle className="mt-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <Button variant="link" className={`p-0 gap-2 text-transparent bg-clip-text bg-linear-to-r ${article.color}`}>
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Cute decorative elements */}
      <div className="absolute top-20 right-20 text-5xl animate-bounce">📖</div>
      <div className="absolute bottom-32 left-32 text-4xl">💡</div>
    </section>
  );
}
