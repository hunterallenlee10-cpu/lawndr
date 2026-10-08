export const site = {
  name: "Lawn Doctor",
  url: "https://www.lawndoctor.com",
  phone: "800.845.0580",
  phoneHref: "tel:8008450580",
  accountUrl: "https://lawndoctorcustomer.com/",
  franchiseUrl: "https://lawndoctorfranchise.com/",
  rating: "4.8",
  reviewCount: "30,000+",
  locations: "600+",
  states: "40+",
  since: "1967",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/LawnDoctorFans" },
    { label: "YouTube", href: "https://www.youtube.com/user/LawnDoctor" },
    { label: "X", href: "https://twitter.com/LawnDoctor" },
    { label: "Instagram", href: "http://www.instagram.com/lawndoctorinc" },
  ],
};

/** One label per intent, used everywhere on the site. */
export const cta = {
  quote: "Get a free quote",
  call: `Call ${site.phone}`,
  find: "Find your local expert",
};

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; links: NavLink[] };

export const servicesNav: NavGroup[] = [
  {
    label: "Lawn Care",
    href: "/lawn-care",
    links: [
      {
        label: "Lawn Fertilization",
        href: "/lawn-fertilization",
        description: "Slow-release nutrition every 6 to 8 weeks",
      },
      {
        label: "Seeding & Aeration",
        href: "/lawn_seeding",
        description: "Power seeding with 90%+ germination",
      },
    ],
  },
  {
    label: "Lawn Pest Control",
    href: "/pest_control",
    links: [
      {
        label: "Mosquito Control",
        href: "/mosquito-control",
        description: "Yard Armour barrier for the whole yard",
      },
      {
        label: "Tick Control",
        href: "/tick-control",
        description: "Lawn, landscaping and wood lines",
      },
      {
        label: "Special Event Sprays",
        href: "/mosquito-yard-spray",
        description: "One-time treatment before you host",
      },
      {
        label: "Perimeter Pest Control",
        href: "/perimeter-pest-control",
        description: "Exterior barrier, nothing sprayed inside",
      },
    ],
  },
  {
    label: "Annual Programs",
    href: "/annual-programs",
    links: [
      {
        label: "Fertilization & Weeds",
        href: "/annual-programs/fertilization-and-weed-plans",
        description: "6 to 8 visits a year",
      },
      {
        label: "Mosquito Control Plans",
        href: "/annual-programs/mosquito-control-plans",
        description: "5 to 8 applications a season",
      },
      {
        label: "Tick Control Plans",
        href: "/annual-programs/tick-control-plans",
        description: "Season-long tick protection",
      },
    ],
  },
];

export const whyNav: NavLink[] = [
  { label: "Why Choose Lawn Doctor", href: "/why-choose-lawn-doctor" },
  { label: "Customer Reviews", href: "/customer_testimonials" },
  { label: "Our Guarantee", href: "/our_guarantee" },
  { label: "Our Story", href: "/company_history" },
  { label: "Careers", href: "/careers" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Lawn care",
    links: [
      { label: "Lawn Fertilization", href: "/lawn-fertilization" },
      { label: "Seeding & Aeration", href: "/lawn_seeding" },
      { label: "Annual Programs", href: "/annual-programs" },
      { label: "Fertilization & Weeds", href: "/annual-programs/fertilization-and-weed-plans" },
    ],
  },
  {
    title: "Pest control",
    links: [
      { label: "Mosquito Control", href: "/mosquito-control" },
      { label: "Tick Control", href: "/tick-control" },
      { label: "Special Event Sprays", href: "/mosquito-yard-spray" },
      { label: "Perimeter Pest Control", href: "/perimeter-pest-control" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Lawn Doctor", href: "/why-choose-lawn-doctor" },
      { label: "Our Story", href: "/company_history" },
      { label: "Our Guarantee", href: "/our_guarantee" },
      { label: "Customer Reviews", href: "/customer_testimonials" },
      { label: "Careers", href: "/careers" },
      { label: "Own a Franchise", href: "https://lawndoctorfranchise.com/" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy / Terms", href: "https://www.lawndoctor.com/privacy_policy/" },
  { label: "CA Privacy Act", href: "https://www.lawndoctor.com/ca-privacy-act/" },
  { label: "Do Not Sell My Data", href: "https://www.lawndoctor.com/do-not-sell-my-data/" },
  { label: "Corporate", href: "https://www.lawndoctor.com/contact-corp/" },
];
