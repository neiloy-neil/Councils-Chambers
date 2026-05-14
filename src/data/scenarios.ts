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
  reputation?: number;
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
    id: 'housing',
    title: 'Rainbow Roof Rescue',
    description:
      'A builder wants to add a bright new block of affordable homes to Sunny Corner. Some neighbors worry the street will feel busier, but many families are waiting for a place to live.',
    options: [
      {
        id: 'approve',
        text: 'Build the homes right away.',
        reaction:
          'Lots of families cheer, but a grumpy neighborhood club starts waving handmade protest signs.',
        effects: { trust: -5, budget: 10, ethics: 10, impact: 15, support: -10, reputation: 5 },
      },
      {
        id: 'reject',
        text: 'Keep the block exactly as it is.',
        reaction:
          'Current neighbors feel relieved, but housing helpers say the city missed a kind chance to welcome more people.',
        effects: { trust: 10, budget: -5, ethics: -10, impact: -15, support: 15, reputation: -5 },
      },
      {
        id: 'compromise',
        text: 'Ask for fewer homes and add a pocket park.',
        reaction:
          'Nobody gets everything they wanted, but most people nod and call it a fair middle path.',
        effects: { trust: 5, budget: 5, ethics: 5, impact: 5, support: 5, reputation: 5 },
      },
    ],
  },
  {
    id: 'roads',
    title: 'Bumpy Street SOS',
    description:
      'Spring rain has turned the main streets into pothole obstacle courses. Fixing them now means spending the festival fireworks money.',
    options: [
      {
        id: 'fix_now',
        text: 'Repair the roads now and pause the festival.',
        reaction:
          'Commuters zoom happily over smooth streets, while performers and snack stands groan about the missing festival.',
        effects: { trust: 5, budget: -10, ethics: 5, impact: 10, support: -5, reputation: 0 },
      },
      {
        id: 'festival_first',
        text: 'Keep the festival and patch slowly.',
        reaction:
          'The parade sparkles, but people complain every time their scooters bounce into a crater.',
        effects: { trust: -10, budget: 10, ethics: -5, impact: -10, support: 10, reputation: -5 },
      },
      {
        id: 'reallocate',
        text: 'Borrow from the library project so both can happen.',
        reaction:
          'The roads get fixed and the festival survives, but book lovers are sad their upgrade got bumped.',
        effects: { trust: 0, budget: -5, ethics: 5, impact: -5, support: 5, reputation: 5 },
      },
    ],
  },
  {
    id: 'park',
    title: 'Park Quest or Parking Tower',
    description:
      'A big empty downtown lot could become a splashy public park or a parking tower for visitors and shoppers.',
    options: [
      {
        id: 'park',
        text: 'Create the giant play park.',
        reaction:
          'Families imagine picnics and games right away, even though the city gives up a tidy pile of parking money.',
        effects: { trust: 15, budget: -15, ethics: 10, impact: 15, support: 5, reputation: 10 },
      },
      {
        id: 'parking',
        text: 'Build the parking tower.',
        reaction:
          'Shops love the extra visitors, but green teams sigh about losing the chance for trees and grass.',
        effects: { trust: -10, budget: 20, ethics: -5, impact: -10, support: 10, reputation: -5 },
      },
      {
        id: 'split',
        text: 'Try underground parking with a rooftop garden.',
        reaction:
          'People call it bold and brilliant, even if it takes more planning and a bigger budget.',
        effects: { trust: 10, budget: -20, ethics: 10, impact: 20, support: 10, reputation: 10 },
      },
    ],
  },
  {
    id: 'ethics',
    title: 'The Fairness Trophy',
    description:
      'Two teams want the city cleanup contract. One is backed by your biggest campaign donor, while the smaller local co-op has a better record for protecting the environment.',
    options: [
      {
        id: 'donor',
        text: 'Pick the donor-backed company.',
        reaction:
          'Your donor beams, but rumors spread that the game was rigged before it even started.',
        effects: { trust: -20, budget: 5, ethics: -20, impact: -5, support: 15, reputation: -15 },
      },
      {
        id: 'coop',
        text: 'Choose the local co-op.',
        reaction:
          'The crowd cheers your fairness, even though your future campaign piggy bank feels lighter.',
        effects: { trust: 20, budget: 0, ethics: 20, impact: 10, support: -15, reputation: 15 },
      },
      {
        id: 'abstain',
        text: 'Step aside because of the conflict.',
        reaction:
          'People respect the honesty, but the tied vote means trash pickup plans get delayed for weeks.',
        effects: { trust: 5, budget: -5, ethics: 10, impact: -10, support: 0, reputation: 5 },
      },
    ],
  },
  {
    id: 'library',
    title: 'Library Lights Challenge',
    description:
      'The city budget shrank this season, so the library team must trim spending. You can close one small branch or reduce hours across town.',
    options: [
      {
        id: 'branch',
        text: 'Close the quietest branch.',
        reaction:
          'The main libraries stay strong, but one neighborhood loses its favorite homework and story-time spot.',
        effects: { trust: -10, budget: 15, ethics: -5, impact: -5, support: 5, reputation: -5 },
      },
      {
        id: 'hours',
        text: 'Cut weekend and evening hours everywhere.',
        reaction:
          'Every branch stays open, but many kids and families can no longer visit when they are free.',
        effects: { trust: -5, budget: 10, ethics: -5, impact: -10, support: 0, reputation: -5 },
      },
      {
        id: 'volunteer',
        text: 'Use volunteers for some services.',
        reaction:
          'The savings help, but librarians worry the service will feel patchy and less reliable.',
        effects: { trust: -5, budget: 15, ethics: -10, impact: -15, support: -5, reputation: -10 },
      },
    ],
  },
  {
    id: 'flood',
    title: 'River Ribbon Warning',
    description:
      'The river by Cartoon City could flood during storm season. You can build protection now or wait and hope for outside grant money later.',
    options: [
      {
        id: 'fund_now',
        text: 'Build the flood barriers now.',
        reaction:
          'People grumble at the cost, but they sleep better knowing the river is less likely to burst into the streets.',
        effects: { trust: -5, budget: -20, ethics: 10, impact: 25, support: -10, reputation: 5 },
      },
      {
        id: 'wait',
        text: 'Wait for grant money.',
        reaction:
          'The budget stays comfy for now, but worried families keep asking what happens if the next storm is huge.',
        effects: { trust: -10, budget: 15, ethics: -5, impact: -20, support: 10, reputation: -10 },
      },
      {
        id: 'warning',
        text: 'Launch an early-warning alert system.',
        reaction:
          'People like the clever idea, though everyone knows alerts help most when real defenses arrive later too.',
        effects: { trust: 10, budget: -5, ethics: 5, impact: 5, support: 5, reputation: 10 },
      },
    ],
  },
  {
    id: 'transport',
    title: 'Zoom Bus Adventure',
    description:
      'A new bus route is needed for the workshop district. One path is faster but noisy for a quiet street, while the other is slower but gentler for residents.',
    options: [
      {
        id: 'fast',
        text: 'Use the faster neighborhood shortcut.',
        reaction:
          'Workers arrive quickly, but nearby families complain about noise and safety outside their homes.',
        effects: { trust: -15, budget: 10, ethics: 0, impact: 10, support: -5, reputation: -5 },
      },
      {
        id: 'slow',
        text: 'Stay on the slower main roads.',
        reaction:
          'Residents feel respected, though commuters groan about the longer ride each day.',
        effects: { trust: 15, budget: -5, ethics: 0, impact: -10, support: 10, reputation: 5 },
      },
      {
        id: 'ebikes',
        text: 'Try an e-bike share pilot instead.',
        reaction:
          'The idea feels shiny and modern, but not everyone can use a bike easily.',
        effects: { trust: 5, budget: -10, ethics: -5, impact: 10, support: 5, reputation: 10 },
      },
    ],
  },
  {
    id: 'noise',
    title: 'Moonlight Music Mix-Up',
    description:
      'Downtown music nights are booming, but new apartment residents keep sending noise complaints to city hall.',
    options: [
      {
        id: 'curfew',
        text: 'Set an early outdoor music curfew.',
        reaction:
          'Sleepy residents smile, but café owners say the evening magic disappears too soon.',
        effects: { trust: 10, budget: -15, ethics: 0, impact: -5, support: -10, reputation: 0 },
      },
      {
        id: 'soundproof',
        text: 'Help venues install soundproofing.',
        reaction:
          'It costs real money, but most people are happy that the fun and the peace can both stick around.',
        effects: { trust: 10, budget: -10, ethics: 5, impact: 5, support: 10, reputation: 10 },
      },
      {
        id: 'ignore',
        text: 'Let the music roll and ignore the complaints.',
        reaction:
          'Party fans dance with delight, but a loud homeowners group starts planning a campaign against you.',
        effects: { trust: -15, budget: 15, ethics: -5, impact: 5, support: 15, reputation: -10 },
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safe Streets Super Plan',
    description:
      'Cartoon City wants to feel safer after a rise in theft and trouble. You can back more patrols or invest in youth programs and mental health help.',
    options: [
      {
        id: 'police',
        text: 'Fund more patrols right away.',
        reaction:
          'Some residents feel safer fast, while others worry the city is forgetting the deeper reasons people struggle.',
        effects: { trust: -5, budget: -15, ethics: 0, impact: 5, support: 15, reputation: 0 },
      },
      {
        id: 'youth',
        text: 'Invest in youth clubs and care teams.',
        reaction:
          'Many people cheer the long-term kindness, even while skeptics ask for quicker results.',
        effects: { trust: 15, budget: -10, ethics: 15, impact: 20, support: -5, reputation: 15 },
      },
      {
        id: 'cameras',
        text: 'Install lots of smart cameras.',
        reaction:
          'The tech looks powerful, but privacy groups say the city is watching too much and listening too little.',
        effects: { trust: -20, budget: -5, ethics: -10, impact: 10, support: 5, reputation: -10 },
      },
    ],
  },
  {
    id: 'transparency',
    title: 'Open Data Treasure Map',
    description:
      'Young tech volunteers want the city to publish spending and planning data online so everyone can explore how decisions are made.',
    options: [
      {
        id: 'full',
        text: 'Build the full open-data portal.',
        reaction:
          'People love the honesty and the searchable maps, even though the setup takes time and a chunky budget.',
        effects: { trust: 25, budget: -10, ethics: 20, impact: 15, support: 10, reputation: 20 },
      },
      {
        id: 'limited',
        text: 'Share simple yearly summaries only.',
        reaction:
          'It is safe and affordable, but the tech club says it feels more like a teaser than true transparency.',
        effects: { trust: 0, budget: 5, ethics: 0, impact: -5, support: 0, reputation: 0 },
      },
      {
        id: 'deny',
        text: 'Say no because it costs too much.',
        reaction:
          'The city saves money today, but plenty of people start wondering what secrets are being kept.',
        effects: { trust: -15, budget: 10, ethics: -15, impact: -10, support: -5, reputation: -15 },
      },
    ],
  },
];
