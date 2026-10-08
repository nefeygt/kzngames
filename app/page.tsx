import { Footer } from "@/components/footer";
import { Games } from "@/components/games";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Philosophy } from "@/components/philosophy";
import { Pillars } from "@/components/pillars";
import { Team } from "@/components/team";
import { Waitlist } from "@/components/waitlist";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Pillars />
        <Games />
        <Team />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
