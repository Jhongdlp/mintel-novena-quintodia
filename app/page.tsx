import Slideshow from "@/components/slides/Slideshow";
import IntroSlide from "@/components/slides/IntroSlide";
import TraditionSlide from "@/components/slides/TraditionSlide";
import Day5WelcomeSlide from "@/components/slides/Day5WelcomeSlide";
import FinalSlide from "@/components/slides/FinalSlide";
import CarolSlide from "@/components/slides/CarolSlide";
import InitialPrayerSlide from "@/components/slides/InitialPrayerSlide";
import WordOfGodSlide from "@/components/slides/WordOfGodSlide";
import ReflectionSlide from "@/components/slides/ReflectionSlide";
import SecondCarolSlide from "@/components/slides/SecondCarolSlide";
import TeachingsSlide from "@/components/slides/TeachingsSlide";
import DialogueSlide from "@/components/slides/DialogueSlide";
import CommitmentSlide from "@/components/slides/CommitmentSlide";
import PrayersSlide from "@/components/slides/PrayersSlide";
import FinalCarolSlide from "@/components/slides/FinalCarolSlide";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Slideshow>
        <IntroSlide />
        <TraditionSlide />
        <Day5WelcomeSlide />
        <CarolSlide />
        <InitialPrayerSlide />
        <WordOfGodSlide />
        <ReflectionSlide />
        <SecondCarolSlide />
        <TeachingsSlide />
        <DialogueSlide />
        <CommitmentSlide />
        <PrayersSlide />
        <FinalCarolSlide />
        <FinalSlide />
      </Slideshow>
    </main>
  );
}
