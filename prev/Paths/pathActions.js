"use strict";

import React from "react";
import { actionUtils } from "nirvClient/components/ActionMenu";

import { isRequired } from "@nirv/utils";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import {
  BackButton,
  FieldTypes,
  OpenButton,
  RunningButton,
  ShapesButton,
  StopButton,
} from "nirvClient/components/Forms";

const getPath = () => document.location.pathname;
const gp = getPath;
const getPrevPath = () => {
  const p = getPath().split("/");
  return p.slice(0, p.length - 1).join("/");
};

// TODO
// somethings wrong wtih the array.isArray check it does the same thing
const rollupField = (arr, field) =>
  arr.length
    ? Array.from(
        new Set([
          ...arr.flatMap((a) =>
            Array.isArray(a[field]) ? a[field] : [a[field]]
          ),
        ])
      )
    : [];

// needs to be updated
export const getPathFieldDefs = (card) => {
  const { childPaths, isPublic, oneThing, parentPaths, strategies } = card;

  return [
    // face card
    {
      id: card.id,
      formData: {
        oneThing,
        isPublic,
      },
      fieldRenderers: {
        oneThing: FieldTypes.Input,
        isPublic: FieldTypes.Checkbox,
      },
      fieldKeyProps: {
        isPublic: {
          config: {
            hidden: true,
          },
        },
      },
    },
    // back card
    {
      id: card.id,
      fieldRenderers: {
        codas: FieldTypes.Chip,
        strategies: FieldTypes.Chip,
        skillz: FieldTypes.Chip,
      },
      formData: {
        codas: rollupField(strategies, "codas"),
        strategies: rollupField(strategies, "name"),
        skillz: rollupField(strategies, "skillz"),
      },
      fieldKeyProps: {
        strategies: {
          props: {
            tabIndex: 1,
          },
        },
        skillz: {
          props: {
            tabIndex: 2,
          },
        },
        codas: {
          props: {
            tabIndex: 3,
          },
        },
      },
    },
  ];
};

// TODO
// this is different than how we do subTitleActions
// pick a single paradigm and use it
export const getPathActions = ({
  id = isRequired("id", "getCardActions"),
  actionCb,
  playerActions = isRequired("playerActions{}", "getCardActions"),
  playerState = isRequired("playerState", "getCardActions"),
}) => {
  return [
    {
      key: "open",
      Icon: () => (
        <Link to={id}>
          <OpenButton />
        </Link>
      ),
      actionProps: {
        hide: document.location.pathname.includes(id),
      },
    },
    {
      key: "back",
      Icon: () => <BackButton onClick={() => navigate(getPrevPath())} />,
      actionProps: {
        hide: document.location.pathname.endsWith("paths"),
      },
    },
    {
      key: "join",
      Icon: RunningButton,
      "data-pathid": id,
      "data-type": "joinPath",
      onClick: (e) => actionCb({ e }),
      actionProps: {
        hide: !playerState.isValid || playerState.player.paths.includes(id),
      },
    },
    {
      key: "leave",
      Icon: StopButton,
      "data-pathid": id,
      "data-type": "leavePath",
      onClick: (e) => actionCb({ e }),
      actionProps: {
        hide: !playerState.isValid || !playerState.player.paths.includes(id),
      },
    },
    {
      key: "strategies",
      Icon: () => (
        <Link to={gp().endsWith(id) ? "./strategies" : `./${id}/strategies`}>
          <ShapesButton />
        </Link>
      ),
      "data-pathid": id,
      actionProps: {
        hide: document.location.pathname.endsWith("strategies"),
      },
    },
    actionUtils.getChatAction({
      chatConfig: {
        domainId: "paths",
        subDomainId: id,
      },
      playerActions,
    }),
  ];
};
