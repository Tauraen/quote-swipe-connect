
// Dilemma data voor de QuotesPage
export interface Dilemma {
  id: number;
  text: string;
  likeProfile: "Emma Excel" | "Diana Dashboard" | "Boris BI";
  dislikeProfiles: Array<"Emma Excel" | "Diana Dashboard" | "Boris BI">;
}

export interface ProfileData {
  id: "Emma Excel" | "Diana Dashboard" | "Boris BI";
  title: string;
  description: string;
  tip: string;
}

export const dilemmas: Dilemma[] = [
  {
    id: 1,
    text: "Ik voel me het meest op m'n gemak in Excel.",
    likeProfile: "Emma Excel",
    dislikeProfiles: ["Diana Dashboard", "Boris BI"]
  },
  {
    id: 2,
    text: "Geef mij maar één dashboard met alles erin, dan ben ik blij.",
    likeProfile: "Diana Dashboard",
    dislikeProfiles: ["Emma Excel", "Boris BI"]
  },
  {
    id: 3,
    text: "Ik wil snappen hoe alle data precies met elkaar verbonden is.",
    likeProfile: "Boris BI",
    dislikeProfiles: ["Diana Dashboard", "Emma Excel"]
  },
  {
    id: 4,
    text: "Liever zelf bouwen dan werken met een standaard template.",
    likeProfile: "Boris BI",
    dislikeProfiles: ["Diana Dashboard", "Emma Excel"]
  },
  {
    id: 5,
    text: "Als ik snel inzicht nodig heb, dan vraag ik Finance om een rapportje.",
    likeProfile: "Emma Excel",
    dislikeProfiles: ["Boris BI", "Diana Dashboard"]
  },
  {
    id: 6,
    text: "Als het rapport niet actueel is, gebruik ik het liever niet.",
    likeProfile: "Diana Dashboard",
    dislikeProfiles: ["Emma Excel"]
  },
  {
    id: 7,
    text: "Ik vind het leuk om te puzzelen met data, ook al kost het wat tijd.",
    likeProfile: "Boris BI",
    dislikeProfiles: ["Diana Dashboard", "Emma Excel"]
  }
];

export const profiles: ProfileData[] = [
  {
    id: "Emma Excel",
    title: "Emma Excel",
    description: "Oei… jij hebt een knipperlichtrelatie met Excel. Je kent alle trucjes, maar diep vanbinnen weet je: dit is geen duurzame liefde. Rapportages kosten je elke maand weer tijd, frustratie en een halve lunchpauze. Het is tijd om verder te swipen. Je verdient beter. Denk: inzicht zonder gepruts.",
    tip: "Geef jezelf de rust die je verdient. Eén goed dashboard zegt meer dan duizend formules."
  },
  {
    id: "Diana Dashboard",
    title: "Diana Dashboard",
    description: "Jij weet wat je zoekt: overzicht, duidelijkheid en snelheid. Geen rapporten van 15 tabbladen, maar één dashboard waarmee je gelijk kunt schakelen. Je bent efficiënt, oplossingsgericht en wil niet eindeloos in data duiken – gewoon weten waar je staat.",
    tip: "Jij bent gemaakt voor VOXTUR Analytics. Alles wat je wil, niets wat je niet nodig hebt."
  },
  {
    id: "Boris BI",
    title: "Boris BI",
    description: "Data? Kom maar door. Jij houdt van sleutelen, combineren en diep duiken. Het moet kloppen tot achter de komma – liefst met een zelfgebouwde koppeling erbij. Jij bent de Sherlock Holmes van dashboards, maar vergeet soms: snelheid is óók inzicht.",
    tip: "Laat de basis aan ons. Dan houd jij tijd over voor de echt spannende analyses."
  }
];
