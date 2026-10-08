import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Lawn Care Services",
  description:
    "Customized lawn care from local Lawn Doctor experts: fertilization, weed control, power seeding and core aeration. Free lawn evaluation.",
};

export default function LawnCarePage() {
  return (
    <CategoryPage
      category="lawn"
      label="Lawn Care"
      title="Lawn care that starts with a diagnosis."
      intro="Fertilization, weed control, seeding and aeration, customized to your grass type and soil by an expert who lives nearby."
      image="/images/spring-lawn.jpg"
      imageAlt="Spring tulips and pansies along a neatly edged green lawn"
      programSlugs={["fertilization-and-weed-plans"]}
    />
  );
}
