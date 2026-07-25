export interface Blog {
  id: number;
  title: string;
  burmese_summary: string;
  english_summary: string;
  category: string;
  readTime: string;
  burmese_content?: string;
  english_content?: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "Agent Kim Reactivaited Ep 8 preview ",
    burmese_summary:
      "မှာ မျက်မှန်နဲ့ ဦးလေးကြီးတွေ ဘာထပ်လုပ်ပြီး ဘယ်လိုထပ်ကြမ်းကြမှာလဲ",
    english_summary: "Agent Kim Reactivaited Ep 8 ",
    category: "Kdrama",
    readTime: "4 min read",
    burmese_content: "",
    english_content:
      "When I started building internal tools, I quickly noticed that most UI patterns are designed for consumer apps — not the messy, context-heavy workflows that real teams deal with every day. A dashboard for tracking volunteer hours is nothing like a social feed. It needs approval states, conditional fields, and role-based visibility baked in from the start.\n\nThe interfaces that actually work are the ones that map closely to how people already think about their work. Not how we wish they thought about it. This means fewer clever abstractions, more explicit states, and a lot of listening before you start designing.",
  },
  // {
  //   id: 2,
  //   title: "Why I prefer practical systems over flashy demos",
  //   summary:
  //     "Notes on building tools that solve everyday problems and stay useful after launch.",
  //   category: "Development",
  //   readTime: "5 min read",
  //   content:
  //     "Demo-driven development is a trap. I've seen plenty of beautiful prototypes that fell apart the moment a real user touched them — because they were built to impress in a controlled environment, not to survive the chaos of actual use.\n\nThe tools I'm most proud of are boring in the best way. They handle edge cases gracefully. They fail with clear messages. They don't assume the user knows the happy path. Practical systems are built for the exceptions, not just the ideal flow.",
  // },
  // {
  //   id: 3,
  //   title: "The value of clear UI in internal tools",
  //   summary:
  //     "How thoughtful structure can make even repetitive work feel lighter and more intuitive.",
  //   category: "UX",
  //   readTime: "3 min read",
  //   content:
  //     "Internal tools have a reputation for being ugly and confusing — and it's usually not a design budget problem. It's a prioritization problem. When the audience is 'just employees,' the bar gets lowered.\n\nBut the people using these tools spend 8 hours a day in them. A confusing form costs more in time and errors than the effort it would take to simplify it. Clear labels, consistent patterns, and honest empty states make repetitive work feel manageable instead of draining.",
  // },
];
