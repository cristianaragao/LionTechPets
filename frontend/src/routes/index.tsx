import React, { ReactFragment } from "react";

import PetIcon from "../components/assets/icons/DogPawIcon";
import BreedIcon from "../components/assets/icons/CollarIcon";
import OwnerIcon from "../components/assets/icons/WalkingDogIcon";

export interface Route {
  id: number;
  path: string;
  name: string;
  icon: React.ReactNode;
}

const routes: Route[] = [
  {
    id: 1,
    path: "/pets",
    name: "Pets",
    icon: <PetIcon />,
  },
  {
    id: 2,
    path: "/breeds",
    name: "Raças",
    icon: <BreedIcon />,
  },
  {
    id: 3,
    path: "/owners",
    name: "Donos",
    icon: <OwnerIcon />,
  },
];

export default routes;
