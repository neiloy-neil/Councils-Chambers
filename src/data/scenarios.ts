/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScoreEffect {
  trust: number;
  budget: number;
  ethics: number;
  impact: number;
  support: number;
}

export interface DecisionOption {
  id: string;
  text: string;
  reaction: string;
  effects: ScoreEffect;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  options: DecisionOption[];
}

export const DEFAULT_SCENARIOS: Scenario[] = [
  {
    id: "housing",
    title: "Affordable Housing Development",
    description: "A developer proposes a high-density affordable housing complex in a quiet suburban neighborhood. Residents are concerned about traffic and local character, but the city desperately needs low-cost homes.",
    options: [
      {
        id: "approve",
        text: "Approve the development as proposed.",
        reaction: "New residents celebrate, but existing neighbors are furious and form a protest group.",
        effects: { trust: -5, budget: 10, ethics: 10, impact: 15, support: -10 }
      },
      {
        id: "reject",
        text: "Reject the proposal to preserve neighborhood character.",
        reaction: "Local residents are relieved, but housing advocates criticize the council for ignoring the housing crisis.",
        effects: { trust: 10, budget: -5, ethics: -10, impact: -15, support: 15 }
      },
      {
        id: "compromise",
        text: "Request reducing the density and adding a small park.",
        reaction: "Neither side is fully happy, but most agree it's a fair compromise. The developer's profits drop slightly.",
        effects: { trust: 5, budget: 5, ethics: 5, impact: 5, support: 5 }
      }
    ]
  },
  {
    id: "roads",
    title: "Emergency Road Repairs",
    description: "Heavy winter rains have caused significant potholes on main commuter routes. Fixing them immediately will drain the emergency fund set aside for the annual festival.",
    options: [
      {
        id: "fix_now",
        text: "Fix the roads immediately; cancel the festival.",
        reaction: "Commuters are happy with the smooth drive, but the arts community and local businesses are devastated by the cancellation.",
        effects: { trust: 5, budget: -10, ethics: 5, impact: 10, support: -5 }
      },
      {
        id: "festival_first",
        text: "Keep the festival funding; patch the roads slowly.",
        reaction: "The festival is a hit, but frustration grows as more cars suffer tire damage from the deteriorating roads.",
        effects: { trust: -10, budget: 10, ethics: -5, impact: -10, support: 10 }
      },
      {
        id: "reallocate",
        text: "Cut the library expansion budget to fund both.",
        reaction: "Roads are fixed and the festival goes on, but students and seniors are upset about the stalled library project.",
        effects: { trust: 0, budget: -5, ethics: 5, impact: -5, support: 5 }
      }
    ]
  },
  {
    id: "park",
    title: "Public Park or Paid Parking?",
    description: "A central vacant lot could be turned into a lush public park or a revenue-generating multi-story car park to solve downtown parking issues.",
    options: [
      {
        id: "park",
        text: "Create a modern public park.",
        reaction: "Families love the green space, contributing to mental well-being, though the city misses out on steady revenue.",
        effects: { trust: 15, budget: -15, ethics: 10, impact: 15, support: 5 }
      },
      {
        id: "parking",
        text: "Build the multi-story car park.",
        reaction: "Local businesses see more customers, and city coffers grow, but environmentalists decry the loss of green potential.",
        effects: { trust: -10, budget: 20, ethics: -5, impact: -10, support: 10 }
      },
      {
        id: "split",
        text: "Underground parking with a rooftop garden.",
        reaction: "Innovative! It's expensive and took longer to build, but everyone appreciates the dual utility.",
        effects: { trust: 10, budget: -20, ethics: 10, impact: 20, support: 10 }
      }
    ]
  },
  {
    id: "ethics",
    title: "Conflict of Interest",
    description: "A major contract for waste management is up for a vote. One of your campaign donors owns the leading firm, while a smaller local co-op has a slightly better environmental record.",
    options: [
      {
        id: "donor",
        text: "Vote for the donor's firm.",
        reaction: "The donor is pleased, and your next campaign is funded, but rumors of corruption and favoritism begin to spread.",
        effects: { trust: -20, budget: 5, ethics: -20, impact: -5, support: 15 }
      },
      {
        id: "coop",
        text: "Vote for the local co-op.",
        reaction: "The public applauds your integrity and green focus, though your political war chest takes a hit for the next election.",
        effects: { trust: 20, budget: 0, ethics: 20, impact: 10, support: -15 }
      },
      {
        id: "abstain",
        text: "Abstain from voting due to the conflict.",
        reaction: "You avoided the ethical trap, but the council is deadlocked, delaying the critical service for weeks.",
        effects: { trust: 5, budget: -5, ethics: 10, impact: -10, support: 0 }
      }
    ]
  },
  {
    id: "library",
    title: "Library Budget Cuts",
    description: "Due to a fiscal shortfall, the council must cut 10% from the library department. This will likely mean closing one branch or reducing hours across the board.",
    options: [
      {
        id: "branch",
        text: "Close the smallest, least-used branch.",
        reaction: "The quietest neighborhood loses its hub, while central libraries remain strong. Efficiency increases, but equity suffers.",
        effects: { trust: -10, budget: 15, ethics: -5, impact: -5, support: 5 }
      },
      {
        id: "hours",
        text: "Reduce weekend and evening hours everywhere.",
        reaction: "Working families and students can no longer access the library when they need it most. Frustration is high but spread thin.",
        effects: { trust: -5, budget: 10, ethics: -5, impact: -10, support: 0 }
      },
      {
        id: "volunteer",
        text: "Move to a volunteer-led model for some services.",
        reaction: "Costs are cut but the quality of service drops, and professional librarians are worried about their job security.",
        effects: { trust: -5, budget: 15, ethics: -10, impact: -15, support: -5 }
      }
    ]
  },
  {
    id: "flood",
    title: "Flood Protection Plan",
    description: "Climate data shows a rising risk of river flooding. You can fund expensive new levees now or wait for federal grants that might not arrive for years.",
    options: [
      {
        id: "fund_now",
        text: "Fund the levees now via a small tax increase.",
        reaction: "Taxpayers grumble about the cost, but after a mild storm later that year, the city remains dry and safe.",
        effects: { trust: -5, budget: -20, ethics: 10, impact: 25, support: -10 }
      },
      {
        id: "wait",
        text: "Wait for federal funding.",
        reaction: "Taxes stay low, but anxiety and insurance premiums rise as residents fear one bad storm could wipe them out.",
        effects: { trust: -10, budget: 15, ethics: -5, impact: -20, support: 10 }
      },
      {
        id: "warning",
        text: "Implement a digital early-warning system instead.",
        reaction: "A clever, low-cost solution. People feel safer having data, though the physical risk of flooding remains unchanged.",
        effects: { trust: 10, budget: -5, ethics: 5, impact: 5, support: 5 }
      }
    ]
  },
  {
    id: "transport",
    title: "New Bus Route",
    description: "A new bus route is needed for the industrial zone. One path is faster but goes through a quiet residential street; the other is slower but stays on main roads.",
    options: [
      {
        id: "fast",
        text: "Take the fast route through the residential street.",
        reaction: "Workers get to their jobs quickly, but residents are angry about noise and safety for their children.",
        effects: { trust: -15, budget: 10, ethics: 0, impact: 10, support: -5 }
      },
      {
        id: "slow",
        text: "Take the slower route on main roads.",
        reaction: "Residents are relieved, but commuters complain about long travel times and the system's inefficiency.",
        effects: { trust: 15, budget: -5, ethics: 0, impact: -10, support: 10 }
      },
      {
        id: "ebikes",
        text: "Scrap the bus and fund an e-bike sharing pilot.",
        reaction: "Hip and forward-thinking! It works for many, but the elderly and those with disabilities feel left behind.",
        effects: { trust: 5, budget: -10, ethics: -5, impact: 10, support: 5 }
      }
    ]
  },
  {
    id: "noise",
    title: "Nightlife Noise Complaints",
    description: "The downtown bar scene is booming, bringing in tax revenue. However, new luxury apartments nearby are flooding the council with noise complaints.",
    options: [
      {
        id: "curfew",
        text: "Implement a strict 11 PM curfew for outdoor music.",
        reaction: "Residents sleep better, but bar owners see profits tank and young people start heading to the neighboring city instead.",
        effects: { trust: 10, budget: -15, ethics: 0, impact: -5, support: -10 }
      },
      {
        id: "soundproof",
        text: "Provide grants for bars to install soundproofing.",
        reaction: "A costly but effective middle ground. The vibe is preserved and the residents are quieter.",
        effects: { trust: 10, budget: -10, ethics: 5, impact: 5, support: 10 }
      },
      {
        id: "ignore",
        text: "Back the businesses; residents knew what they moved into.",
        reaction: "The nightlife thrives, but a powerful homeowners' association begins a campaign to unseat you in the next election.",
        effects: { trust: -15, budget: 15, ethics: -5, impact: 5, support: 15 }
      }
    ]
  },
  {
    id: "safety",
    title: "Community Safety Strategy",
    description: "Crime rates have ticked up. You can increase police patrols or invest in community youth programs and mental health services.",
    options: [
      {
        id: "police",
        text: "Increase police budget for more patrols.",
        reaction: "Some feel safer immediately, but others worry about over-policing and the lack of attention to root causes.",
        effects: { trust: -5, budget: -15, ethics: 0, impact: 5, support: 15 }
      },
      {
        id: "youth",
        text: "Fund youth centers and mental health teams.",
        reaction: "Progressive and praised for long-term vision, though skeptical residents demand faster results from 'soft' solutions.",
        effects: { trust: 15, budget: -10, ethics: 15, impact: 20, support: -5 }
      },
      {
        id: "cameras",
        text: "Install advanced CCTV and AI surveillance.",
        reaction: "Efficient tracking of incidents, but civil liberties groups are alarmed by the expansion of the 'surveillance state'.",
        effects: { trust: -20, budget: -5, ethics: -10, impact: 10, support: 5 }
      }
    ]
  },
  {
    id: "transparency",
    title: "Public Data Transparency",
    description: "A group of tech activists wants the city to publish all spending and planning data in a searchable online portal. It's expensive and might expose inefficiencies.",
    options: [
      {
        id: "full",
        text: "Commit to full, open-data transparency.",
        reaction: "The public loves the accountability. You find some waste yourself, though the technical setup was quite costly.",
        effects: { trust: 25, budget: -10, ethics: 20, impact: 15, support: 10 }
      },
      {
        id: "limited",
        text: "Publish summarized annual reports only.",
        reaction: "A safe, low-cost move that checks the box but leaves activists wanting more true accountability.",
        effects: { trust: 0, budget: 5, ethics: 0, impact: -5, support: 0 }
      },
      {
        id: "deny",
        text: "Refuse due to data security and cost concerns.",
        reaction: "You saved money, but the 'what are they hiding?' narrative starts to dominate the local press.",
        effects: { trust: -15, budget: 10, ethics: -15, impact: -10, support: -5 }
      }
    ]
  }
];
