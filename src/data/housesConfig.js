import bgCasa1F1 from "../assets/backgrounds/houses/world-1/casa-1/fase-1.png";
import bgCasa1F2 from "../assets/backgrounds/houses/world-1/casa-1/fase-2.png";
import bgCasa1F3 from "../assets/backgrounds/houses/world-1/casa-1/fase-3.png";

import bgCasa2F1 from "../assets/backgrounds/houses/world-1/casa-2/fase-1.png";
import bgCasa2F2 from "../assets/backgrounds/houses/world-1/casa-2/fase-2.png";
import bgCasa2F3 from "../assets/backgrounds/houses/world-1/casa-2/fase-3.png";

import bgCasa3F1 from "../assets/backgrounds/houses/world-1/casa-3/fase-1.png";
import bgCasa3F2 from "../assets/backgrounds/houses/world-1/casa-3/fase-2.png";
import bgCasa3F3 from "../assets/backgrounds/houses/world-1/casa-3/fase-3.png";

import bgCasa4F1 from "../assets/backgrounds/houses/world-1/casa-4/fase-1.png";
import bgCasa4F2 from "../assets/backgrounds/houses/world-1/casa-4/fase-2.png";
import bgCasa4F3 from "../assets/backgrounds/houses/world-1/casa-4/fase-3.png";

import bgCasa5F1 from "../assets/backgrounds/houses/world-1/casa-5/fase-1.png";
import bgCasa5F2 from "../assets/backgrounds/houses/world-1/casa-5/fase-2.png";
import bgCasa5F3 from "../assets/backgrounds/houses/world-1/casa-5/fase-3.png";

import {
  house1Events,
  house2Events,
  house3Events,
  house4Events,
  house5Events,
} from "./events/houseEvents.js";

export const HOUSE_IDS = ["casa1", "casa2", "casa3", "casa4", "casa5"];

export const HOUSES = {
  casa1: {
    id: "casa1",
    bg: bgCasa1F1,
    bgFase2: bgCasa1F2,
    bgFase3: bgCasa1F3,
    events: house1Events,
    zoneTypes: { a: "food", b: "food", c: "food" },
  },
  casa2: {
    id: "casa2",
    bg: bgCasa2F1,
    bgFase2: bgCasa2F2,
    bgFase3: bgCasa2F3,
    events: house2Events,
    zoneTypes: { a: "food", b: "tool", c: "food" },
  },
  casa3: {
    id: "casa3",
    bg: bgCasa3F1,
    bgFase2: bgCasa3F2,
    bgFase3: bgCasa3F3,
    events: house3Events,
    zoneTypes: { a: "food", b: "food", c: "tool" },
  },
  casa4: {
    id: "casa4",
    bg: bgCasa4F1,
    bgFase2: bgCasa4F2,
    bgFase3: bgCasa4F3,
    events: house4Events,
    zoneTypes: { a: "tool", b: "food", c: "food" },
  },
  casa5: {
    id: "casa5",
    bg: bgCasa5F1,
    bgFase2: bgCasa5F2,
    bgFase3: bgCasa5F3,
    events: house5Events,
    zoneTypes: { a: "tool", b: "tool", c: "food" },
  },
};
