import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Lawn Pest Control",
  description:
    "Mosquito, tick and perimeter pest control from Lawn Doctor. Yard Armour treatments, special event sprays and season-long plans.",
};

export default function PestControlPage() {
  return (
    <CategoryPage
      category="pest"
      label="Lawn Pest Control"
      title="Your yard, minus the mosquitoes and ticks."
      intro="Yard Armour mosquito and tick control, one-time event sprays, and an exterior barrier that keeps bugs out of your home."
      image="/images/barefoot-grass.jpg"
      imageAlt="Bare feet resting on soft green grass"
      programSlugs={["mosquito-control-plans", "tick-control-plans"]}
    />
  );
}
