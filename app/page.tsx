import Header from "@/components/header";
import Hero from "@/components/hero";
import WhyChooseUs from "@/components/why-choose-us";
import ServerPlans from "@/components/server-plans";
import SubscriptionPlans from "@/components/subscription-plans";
import Features from "@/components/features";
import LatestNews from "@/components/latest-news";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <WhyChooseUs />
      <ServerPlans />
      <SubscriptionPlans />
      <Features />
      <LatestNews />
      <Footer />
    </main>
  );
}
