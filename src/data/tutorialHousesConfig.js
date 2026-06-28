import bgTienda   from "../assets/backgrounds/houses/world-tutorial/houses-tutorial/casa-1-tutorial.png";
import bgEstacion from "../assets/backgrounds/houses/world-tutorial/houses-tutorial/casa-4-tutorial.png";

export const TUTORIAL_HOUSES = {
  tienda: {
    id: "tienda",
    bg: bgTienda,
    lootType: "food",
    label: "Tienda",
  },
  estacion: {
    id: "estacion",
    bg: bgEstacion,
    lootType: "weapon",
    label: "Estación",
  },
};

export const TUTORIAL_HOUSE_IDS = ["tienda", "estacion"];
