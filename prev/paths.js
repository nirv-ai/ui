"use strict";

import { getId } from "../external";
import { removeDbMetadata, isRequired } from "../utility";

const strategyFixture = (name) => ({
  academia: [],
  activities: [],
  codas: [], // i.e. outcomes/denouments, its a cool word
  disciplines: [],
  id: getId(name),
  incentives: [],
  pitch: "", // elevator
  skillz: [],
});
export const upsertStrategy = ({
  name = isRequired("name", "upsertStrategy"),
  playerIds = isRequired("playerIds", "upsertStrategy"),

  ...values
}) => ({
  ...strategyFixture(name),
  ...values,

  name,
  playerIds,
});

const pathFixture = (name) => ({
  childPaths: [],
  id: getId(name),
  isPublic: true,
  name,
  oneThing: "",
  parentPaths: [],
  playerIds: [],
  strategies: [], // created separately
});
export const upsertPath = ({
  name = isRequired("name", "upsertPath"),
  // oneThing = isRequired('oneThing', 'upsertPath'), // TODO doesnt work with creatorinput

  ...values
}) => ({
  ...pathFixture(name),
  ...values,

  // name,
  // oneThing,
});

export const getPathDetails = removeDbMetadata;
