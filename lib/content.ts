/*
  Service, program and review content.
  Copy is adapted from lawndoctor.com service pages. Facts (visit counts, germination rates,
  pests covered, guarantee terms) come from those pages; nothing here is invented precision.
*/

export type Step = { title: string; body: string };
export type Faq = { q: string; a: string };
export type Fact = { label: string; value: string };

export type Service = {
  slug: string;
  category: "lawn" | "pest";
  name: string;
  title: string;
  intro: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  stat?: { value: string; label: string; body: string };
  facts: Fact[];
  stepsTitle: string;
  steps: Step[];
  includedTitle: string;
  included: string[];
  faqs: Faq[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "lawn-fertilization",
    category: "lawn",
    name: "Lawn Fertilization",
    title: "Fertilization matched to your grass, your soil and your season.",
    intro:
      "Slow-release, nutrient-enriched feedings applied with our patented Turf Tamer equipment, so every square foot gets the same even coverage.",
    metaDescription:
      "Custom lawn fertilization from local Lawn Doctor experts. Slow-release nutrients every 6 to 8 weeks, applied evenly with patented Turf Tamer equipment.",
    image: "/images/hero-lawn-wide.jpg",
    imageAlt: "Evenly striped, deep green lawn behind a white and sage-blue home",
    stat: {
      value: "6-8",
      label: "weeks between visits",
      body: "Starting about six weeks after the last frost and continuing through fall, timed to your weather and your lawn.",
    },
    facts: [
      { label: "Visit rhythm", value: "Every 6 to 8 weeks" },
      { label: "Nutrients", value: "N, P, K + micronutrients" },
      { label: "Release", value: "Slow-release for weeks" },
      { label: "Natural option", value: "100% natural program" },
    ],
    stepsTitle: "How a fertilization plan comes together",
    steps: [
      {
        title: "Lawn analysis",
        body: "A local lawn expert walks your property and analyzes grass type, soil and problem areas before anything is applied.",
      },
      {
        title: "A plan with expected results",
        body: "You get a custom service plan that spells out what each treatment does and what you should expect to see.",
      },
      {
        title: "Visits every 6 to 8 weeks",
        body: "Each visit covers feeding, weed maintenance and pest checks, and ends with a written service summary.",
      },
    ],
    includedTitle: "Grass types we feed",
    included: [
      "Kentucky Bluegrass",
      "Ryegrass",
      "Fescue",
      "Bermudagrass",
      "St. Augustine",
      "Zoysiagrass",
      "Centipedegrass",
    ],
    faqs: [
      {
        q: "How often will you fertilize my lawn?",
        a: "Most lawns need feeding every 6 to 8 weeks, starting roughly six weeks after the last frost and continuing through fall. Your local expert adjusts timing for weather and how your lawn is responding.",
      },
      {
        q: "What makes Turf Tamer equipment different?",
        a: "Turf Tamer is American-made application equipment with ground-metered technology, designed and patented by Lawn Doctor and available only to Lawn Doctor franchisees. It meters product to ground speed so coverage stays even, without stripes or skipped patches.",
      },
      {
        q: "Do you offer a natural or organic option?",
        a: "Yes. Our Natural Lawn Care program is an annual maintenance plan built on 100% natural materials, including organic fertilizers.",
      },
      {
        q: "Do you mow?",
        a: "No. Lawn Doctor handles everything from diagnosis to a full lawn makeover except mowing.",
      },
    ],
    related: ["lawn_seeding", "tick-control", "mosquito-control"],
  },
  {
    slug: "lawn_seeding",
    category: "lawn",
    name: "Seeding & Aeration",
    title: "Thicker grass starts below the surface.",
    intro:
      "Power seeding puts seed into the soil instead of on top of it. Pair it with core aeration and thin, tired lawns fill in fast.",
    metaDescription:
      "Power seeding and core aeration from Lawn Doctor. Turf Tamer Power Seeder delivers 90%+ germination by placing seed directly into the soil.",
    image: "/images/aeration.jpg",
    imageAlt: "Hand holding a plug of turf showing grass blades, roots and soil",
    stat: {
      value: "90%+",
      label: "germination with power seeding",
      body: "Seed thrown on top of the soil germinates at roughly 10%. Mixing it into the soil changes everything.",
    },
    facts: [
      { label: "Best window", value: "Late summer to early fall" },
      { label: "Also good", value: "Early spring, some lawns" },
      { label: "Equipment", value: "Turf Tamer Power Seeder" },
      { label: "Seed", value: "Mixed for your region" },
    ],
    stepsTitle: "From thin to thick in four moves",
    steps: [
      {
        title: "Assess and pick the seed",
        body: "We recommend a seed mixture based on your grass species, local growing conditions and how much upkeep you want.",
      },
      {
        title: "Prep the lawn",
        body: "The lawn is prepared so seed can reach soil instead of sitting on thatch.",
      },
      {
        title: "Power seed into the soil",
        body: "Ground-metered seeding spreads seed evenly with no sparse patches, rows or patterns, and uses less seed than broadcasting.",
      },
      {
        title: "Add core aeration",
        body: "Optional core aeration relieves compaction so water, oxygen and nutrients reach new roots.",
      },
    ],
    includedTitle: "Good fit for lawns that are",
    included: [
      "Thin or bare in spots",
      "Stressed by heat or drought",
      "Overrun with weeds",
      "Damaged by animals or insects",
      "Compacted from heavy use",
    ],
    faqs: [
      {
        q: "What's the difference between power seeding and overseeding?",
        a: "Overseeding broadcasts seed over the existing lawn, so very little of it makes contact with soil and germination stays low. Power seeding mixes seed into the soil for strong seed-to-soil contact, which is why germination exceeds 90%.",
      },
      {
        q: "When is the best time to seed?",
        a: "Late summer to early fall is generally best. Early spring can also work for some lawns. Your local expert will time it to your region and recent weather.",
      },
      {
        q: "Do I need aeration too?",
        a: "Not always, but we recommend it. Compacted soil limits oxygen, water and nutrients. Aerating before or with seeding helps new roots establish for a thicker, greener result.",
      },
    ],
    related: ["lawn-fertilization", "perimeter-pest-control", "tick-control"],
  },
  {
    slug: "mosquito-control",
    category: "pest",
    name: "Mosquito Control",
    title: "Take back your yard from mosquitoes.",
    intro:
      "Yard Armour bonds to the undersides of leaves where mosquitoes rest, treating the yard itself instead of your skin.",
    metaDescription:
      "Yard Armour mosquito control from Lawn Doctor. Prevention, targeted control and year-round maintenance to reduce adults, larvae and eggs.",
    image: "/images/mosquito.jpg",
    imageAlt: "Mosquito resting on a blade of grass beside a water droplet",
    stat: {
      value: "3-6 ft",
      label: "where mosquitoes rest",
      body: "Yard Armour adheres to the undersides of leaves at resting height. Mosquitoes absorb it through their feet.",
    },
    facts: [
      { label: "Product", value: "Yard Armour" },
      { label: "Targets", value: "Adults, larvae and eggs" },
      { label: "Annual plan", value: "5 to 8 applications" },
      { label: "Natural option", value: "Natural barrier spray" },
    ],
    stepsTitle: "Three levels of protection",
    steps: [
      {
        title: "Prevention",
        body: "A full risk assessment comes first. We address standing-water breeding sources, treat resting areas, and suggest ways to make your yard less inviting.",
      },
      {
        title: "Control",
        body: "Targeted Yard Armour applications knock down an existing problem across adults, larvae and eggs.",
      },
      {
        title: "Ongoing maintenance",
        body: "Our Integrated Mosquito Management program keeps routine inspections and preventative treatments on schedule all season.",
      },
    ],
    includedTitle: "Every treatment includes",
    included: [
      "Property risk assessment",
      "Breeding-site reduction",
      "Barrier on resting foliage",
      "Tips to keep mosquitoes away",
      "No Nonsense Guarantee",
    ],
    faqs: [
      {
        q: "Why not just use repellent?",
        a: "Repellent is a short-term fix for one person. Treating the yard reduces the mosquitoes that live and breed there, so everyone outside benefits.",
      },
      {
        q: "Is there a natural option?",
        a: "Yes. Our natural mosquito prevention spray creates a protective barrier using a natural formulation.",
      },
      {
        q: "Why does yard treatment matter for health?",
        a: "Mosquito bites can transmit diseases such as West Nile virus. Reducing mosquito populations around your home lowers your family's exposure.",
      },
      {
        q: "Can you treat before a party?",
        a: "Yes. Our Special Event Sprays are one-time treatments timed before cookouts, weddings, graduations and other gatherings.",
      },
    ],
    related: ["mosquito-yard-spray", "tick-control", "perimeter-pest-control"],
  },
  {
    slug: "tick-control",
    category: "pest",
    name: "Tick Control",
    title: "A tick-safe yard for kids, dogs and everyone in between.",
    intro:
      "We find the places ticks hide, treat them with barrier and Yard Armour applications, and keep checking all season.",
    metaDescription:
      "Lawn Doctor tick control. Inspection, barrier treatments and Yard Armour applications for lawns, landscaping and wood lines.",
    image: "/images/dog-lawn.jpg",
    imageAlt: "Border collie standing in tall grass at the edge of a lawn",
    facts: [
      { label: "Treats", value: "Lawn, beds, wood lines" },
      { label: "Product", value: "Yard Armour + barrier" },
      { label: "Plan", value: "Tailored to your yard" },
      { label: "Backed by", value: "No Nonsense Guarantee" },
    ],
    stepsTitle: "How we keep ticks out",
    steps: [
      {
        title: "Inspection",
        body: "Your technician maps tick-friendly zones: tall grass, leaf litter, shaded beds and the edge of the woods.",
      },
      {
        title: "Prevention and control",
        body: "Barrier treatments defend the yard while Yard Armour applications around the home reduce existing ticks.",
      },
      {
        title: "Maintenance",
        body: "We routinely inspect and treat vulnerable spots so protection holds through the season.",
      },
    ],
    includedTitle: "Where ticks hide",
    included: [
      "Tall grass and lawn edges",
      "Ornamental landscaping",
      "Leaf litter and ground cover",
      "Wood lines and stone walls",
      "Shaded, humid corners",
    ],
    faqs: [
      {
        q: "Why treat the yard for ticks?",
        a: "Ticks can carry Lyme disease, the most widespread tick-borne illness in the US. Treating where they live reduces exposure for your family and pets.",
      },
      {
        q: "How often do you treat?",
        a: "Tick control is ongoing. Your plan is tailored to your yard and preferences, with routine inspections and treatments of susceptible areas through the season.",
      },
      {
        q: "Can I combine tick and mosquito control?",
        a: "Yes. Many homeowners bundle both, and your local expert can schedule them together.",
      },
    ],
    related: ["mosquito-control", "perimeter-pest-control", "lawn-fertilization"],
  },
  {
    slug: "mosquito-yard-spray",
    category: "pest",
    name: "Special Event Sprays",
    title: "Host the party. Leave the mosquitoes off the guest list.",
    intro:
      "One-time Yard Armour treatments before weddings, graduations, cookouts and garden parties. No citronella torches or greasy repellent required.",
    metaDescription:
      "Special event mosquito sprays from Lawn Doctor. One-time Yard Armour treatments before weddings, graduations, cookouts and backyard parties.",
    image: "/images/backyard-evening.jpg",
    imageAlt: "Friends and family sharing dinner in a backyard under string lights",
    facts: [
      { label: "Type", value: "One-time treatment" },
      { label: "Product", value: "Yard Armour" },
      { label: "Targets", value: "Every stage of development" },
      { label: "Booking", value: "Your local expert" },
    ],
    stepsTitle: "How event sprays work",
    steps: [
      {
        title: "Tell us the date",
        body: "Let your local expert know when and where you're hosting so treatment lands at the right time.",
      },
      {
        title: "Pre-event treatment",
        body: "We knock down existing mosquitoes and apply a barrier to the foliage where they rest.",
      },
      {
        title: "Enjoy the evening",
        body: "Protection carries through your event, no netting, torches or sticky sprays needed.",
      },
    ],
    includedTitle: "Popular events",
    included: [
      "Weddings",
      "Graduation parties",
      "Holiday cookouts",
      "Sweet Sixteens",
      "Family reunions",
      "Garden parties",
    ],
    faqs: [
      {
        q: "How far ahead should I book?",
        a: "As early as you know your date. Your local Lawn Doctor schedules the treatment shortly before the event for best results.",
      },
      {
        q: "Do I need an annual plan?",
        a: "No. Special Event Sprays are one-time treatments. If mosquitoes are a regular problem, a Mosquito Control Plan covers the whole season.",
      },
    ],
    related: ["mosquito-control", "tick-control", "perimeter-pest-control"],
  },
  {
    slug: "perimeter-pest-control",
    category: "pest",
    name: "Perimeter Pest Control",
    title: "Stop bugs at the foundation, not the kitchen.",
    intro:
      "We treat your home's exterior and entry points to create a barrier insects avoid. Nothing is sprayed inside, and you don't need to be home.",
    metaDescription:
      "Perimeter pest control from Lawn Doctor. Exterior barrier treatments for ants, spiders, centipedes, earwigs and more. No interior spraying.",
    image: "/images/house-perimeter.jpg",
    imageAlt: "White brick ranch home with a mulch bed along the foundation",
    facts: [
      { label: "Where", value: "Exterior only" },
      { label: "Be home?", value: "Not required" },
      { label: "Schedule", value: "Regular maintenance" },
      { label: "Backed by", value: "No Nonsense Guarantee" },
    ],
    stepsTitle: "How the barrier works",
    steps: [
      {
        title: "Identify the invaders",
        body: "Your technician identifies the insects most likely to get into your home based on your property.",
      },
      {
        title: "Treat the exterior",
        body: "We treat the foundation and other entry points to build a barrier bugs avoid.",
      },
      {
        title: "Keep it on schedule",
        body: "Regular maintenance visits keep the barrier strong as seasons and pests change.",
      },
    ],
    includedTitle: "Pests covered",
    included: [
      "Ants, including carpenter ants",
      "Spiders",
      "Centipedes and millipedes",
      "Earwigs",
      "Crickets",
      "Boxelder bugs",
      "Clover mites",
      "Fleas and ticks",
      "Silverfish and sowbugs",
    ],
    faqs: [
      {
        q: "Do you spray inside my home?",
        a: "No. Perimeter Pest Control is an exterior treatment around your foundation and entry points.",
      },
      {
        q: "Do I need to be home?",
        a: "No. Your technician can complete the service while you're out.",
      },
    ],
    related: ["tick-control", "mosquito-control", "lawn-fertilization"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export type Program = {
  slug: string;
  name: string;
  short: string;
  title: string;
  intro: string;
  visits: string;
  visitsBig: string;
  visitsSmall: string;
  image: string;
  imageAlt: string;
  includes: string[];
  options?: { name: string; body: string }[];
  serviceSlug: string;
};

export const programs: Program[] = [
  {
    slug: "fertilization-and-weed-plans",
    name: "Fertilization & Weed Plans",
    short: "Feeding plus weed control, all year.",
    title: "A greener, weed-free lawn on a schedule you never have to think about.",
    intro:
      "Fertilizer for root growth and color, plus pre-emergent and targeted weed control, delivered across 6 to 8 applications a year.",
    visits: "6 to 8 applications a year",
    visitsBig: "6-8",
    visitsSmall: "applications a year",
    image: "/images/hero-lawn.jpg",
    imageAlt: "Freshly striped lawn in front of a white and sage-blue home",
    includes: [
      "Year-round fertilization",
      "Pre-emergent weed control",
      "Broadleaf weed control",
      "Integrated Pest Management",
      "Service summary after every visit",
    ],
    options: [
      {
        name: "Lawn Maintainer",
        body: "Our flagship annual program: fertilization, weed control, pre-emergent weed control and Integrated Pest Management on a pre-planned schedule.",
      },
      {
        name: "Natural Lawn Care",
        body: "The same annual rhythm built on 100% natural materials, including organic fertilizers.",
      },
    ],
    serviceSlug: "lawn-fertilization",
  },
  {
    slug: "mosquito-control-plans",
    name: "Mosquito Control Plans",
    short: "Season-long Yard Armour protection.",
    title: "Mosquito protection that lasts the whole season.",
    intro:
      "Yard Armour applications on a regular schedule to reduce mosquitoes and help protect against mosquito-borne diseases like West Nile virus and Triple E.",
    visits: "5 to 8 applications a year",
    visitsBig: "5-8",
    visitsSmall: "applications a year",
    image: "/images/backyard-evening.jpg",
    imageAlt: "Backyard dinner at dusk under string lights",
    includes: [
      "Property risk assessment",
      "Breeding-site reduction",
      "Yard Armour barrier applications",
      "Routine inspections",
      "Natural spray option",
    ],
    serviceSlug: "mosquito-control",
  },
  {
    slug: "tick-control-plans",
    name: "Tick Control Plans",
    short: "Lawn, landscaping and wood lines.",
    title: "Season-long tick control for the places ticks actually live.",
    intro:
      "We treat the lawn, ornamental landscaping and wood lines on an ongoing schedule tailored to your property.",
    visits: "Scheduled through the season",
    visitsBig: "All season",
    visitsSmall: "of scheduled inspections and treatments",
    image: "/images/dog-lawn.jpg",
    imageAlt: "Border collie in tall grass at a lawn edge",
    includes: [
      "Tick-zone inspection",
      "Barrier treatments",
      "Yard Armour around the home",
      "Wood line and bed treatment",
      "Routine re-checks",
    ],
    serviceSlug: "tick-control",
  },
];

export const programBySlug = (slug: string) => programs.find((p) => p.slug === slug);

export type Review = { name: string; text: string };

/** Verbatim Google review excerpts shown on lawndoctor.com. */
export const reviews: Review[] = [
  {
    name: "Ivette F.",
    text: "Excellent customer service, I couldn’t be happier!! Their response time was quick and they answered all our questions.",
  },
  {
    name: "Brittany L.",
    text: "So happy I went with Lawn Doctor! Well worth the money - I would recommend their services to anyone in the area.",
  },
  {
    name: "Suhaine C.",
    text: "Last year was our first season using Lawn Doctor and we saw such a difference with our lawn.",
  },
  {
    name: "R. Lomax",
    text: "I highly recommend using the Lawn Doctor for your lawn needs.",
  },
  {
    name: "Karen D.",
    text: "Great Service!! Lawn Looks Great every year!!!",
  },
];

export const seasons = [
  {
    name: "Early spring",
    title: "Wake-up feeding",
    body: "Nutrients to green up dormant turf and pre-emergent control to stop crabgrass before it sprouts.",
    image: "/images/spring-lawn.jpg",
  },
  {
    name: "Late spring",
    title: "Weeds out, roots down",
    body: "Broadleaf weed control and balanced nutrition while grass is growing its fastest.",
    image: "/images/grass-macro.jpg",
  },
  {
    name: "Summer",
    title: "Heat and pest defense",
    body: "Slow-release feeding for heat recovery, insect monitoring, and mosquito and tick barriers.",
    image: "/images/summer-lawn.jpg",
  },
  {
    name: "Early fall",
    title: "Aerate and seed",
    body: "The best window to relieve compaction and power seed thin areas so new grass establishes before winter.",
    image: "/images/aeration.jpg",
  },
  {
    name: "Late fall",
    title: "Winter prep",
    body: "A final feeding that stores energy in the roots for a faster, greener start next spring.",
    image: "/images/autumn-lawn.jpg",
  },
];

export const homeFaqs: Faq[] = [
  {
    q: "What does a free quote include?",
    a: "A local Lawn Doctor expert evaluates your lawn and recommends a customized solution, from a single treatment to ongoing maintenance. There's no obligation.",
  },
  {
    q: "Is Lawn Doctor local?",
    a: "Yes. Every Lawn Doctor is locally owned and operated by someone who lives and works in your community and knows your regional weather and soil.",
  },
  {
    q: "What if I'm not happy with a treatment?",
    a: "Call us. Under our No Nonsense Guarantee we'll return and reapply at no charge, or refund the full cost of your last application.",
  },
  {
    q: "Do you mow lawns?",
    a: "No. We handle everything from diagnosis to a full lawn makeover except mowing, so you can keep your current mowing routine or service.",
  },
  {
    q: "Do you offer natural lawn care?",
    a: "Yes. Our Natural Lawn Care program uses 100% natural materials, including organic fertilizers, and we offer a natural mosquito barrier spray.",
  },
];
