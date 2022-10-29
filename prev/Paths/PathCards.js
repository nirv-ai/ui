"use strict";

// TODO
// are all of these imports needed?
// canceltoken is being sent with API requests, WTF?
// I am incorrectly using playerState, when I need to use player on player paths
// we need to show a popup for external users to join paths from another players screen
// need a way to vote a new leader (playerId0) as they control the editing of most things
// or permit editing to the top 5% or something
// if the first request is on player/paths, then /paths wonnt request all paths but will reuse player/paths
// clean this shit up, review all the functions in this file, the function call logic is insane
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { api } from "nirvClient/api";
import { CardContainer } from "nirvClient/components/Cards";
import { CreatorButton } from "nirvClient/components/CreatorInput";
import { CreatorList } from "nirvClient/components/CreatorInput";
import { getPathActions, getPathFieldDefs } from "./pathActions";
import { isRequired, upsertStrategy, getId, upsertPath } from "@nirv/utils";
import { schemaTypes, CheckButton } from "nirvClient/components/Forms";
import { useActiveIndexes } from "nirvClient/effects";

export const fieldKeyProps = {
  oneThing: {
    props: {
      tabIndex: 1,
    },
    config: {
      renderer: "Input",
    },
  },
  strategies: {
    props: {
      tabIndex: 2,
      disabled: true,
    },
    config: {
      renderer: "Chip",
    },
  },

  playerIds: {
    config: {
      renderer: "Chip",
    },
    props: {
      disabled: true,
      tabIndex: 2,
    },
  },

  parentPaths: {
    config: {
      renderer: "Chip",
      createButton: true,
      hidden: true,
    },
  },
  childPaths: {
    config: {
      renderer: "Chip",
      createButton: true,
      hidden: true,
    },
  },
  academia: {
    config: {
      createButton: true,
      renderer: "Chip",
    },
  },
  activities: {
    config: {
      createButton: true,
      renderer: "Chip",
    },
  },
  codas: {
    config: {
      createButton: true,
      renderer: "Chip",
    },
  },
  disciplines: {
    config: {
      createButton: true,
      renderer: "Chip",
    },
  },
  incentives: {
    config: {
      createButton: true,
      renderer: "Chip",
    },
  },

  // hidden
  id: {
    props: {
      disabled: true,
    },
    config: {
      renderer: "Input",
      hidden: true,
    },
  },
  name: {
    config: {
      renderer: "Input",
      hidden: true,
    },
    props: {
      disabled: true,
    },
  },
  ts: {
    config: {
      hidden: true,
    },
    props: {
      disabled: true,
    },
  },
  isPublic: {
    props: {
      disabled: true,
    },
    config: {
      renderer: "Checkbox",
      hidden: true,
    },
  },
};

export const fieldKeyPropsSubtopic = {
  ...fieldKeyProps,
  strategies: {
    config: {
      renderer: "arrayOfItems",
    },
  },
};

export const fieldKeyPropsDetail = {
  ...fieldKeyProps,
  strategies: {
    config: {
      // TODO
      // need to figure out hacky logic in FormFromObject pushFieldsIntoGroups
      // perhaps push the logic deep into FormFields || formUtils.FieldTypes
      renderer: "renderProperty",
      objectProperty: {
        property: "name",
        renderer: "Chip",
      },
    },
  },
};

const listToggleFieldOptions = [
  // { field: 'status', filter: Boolean, text: 'active' },
  // { field: 'players', filter: Number, },
  // { field: 'pathStrategies', filter: Number },
  // { field: 'ts', filter: Number, text: 'updated' },
];

export const PathCards = ({
  actionCb,
  canEdit = isRequired("canEdit", "PathCards"),
  formValues,
  formValuesTs,
  height,
  isEditable,
  player,
  playerActions = isRequired("playerActions", "PathCards"),
  playerState = isRequired("playerState", "PathCards"),
  ts = Date.now(),
  width,

  ...props
}) => {
  useEffect(() => {
    if (!props.rendered.startsWith("paths")) props.setRendered("paths");
  }, []);

  let mounted = true;
  useEffect(() => {
    return () => {
      mounted = false;
    };
  }, [mounted]);

  const isPlayer0 = (playerids) =>
    playerIds?.length && playerIds[0] === playerState.player.id;

  const [[activeIndex, activeIcon], setActiveIndex] = useActiveIndexes("paths");

  const updateActiveIndex = async (e, formValue) => {
    if ("preventDefault" in e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const {
      currentTarget: {
        dataset: { id: rowIndex, i: iconIndex },
      },
    } = e;

    // TODO
    // id should not be set for creator list
    setActiveIndex({
      iconIndex,
      rowIndex,
      setId: false,
      type: "paths",
    });
  };

  const getCardActions = (id) =>
    getPathActions({
      actionCb,
      id,
      playerActions,
      playerState,
    });

  const getCardFieldDefs = (card) => getPathFieldDefs(card);

  // adding props to components
  // we need a way to include the entire object, not just the subtopic object
  const renderCb = ({
    formData, // may not be the full object, could be subtopic object
    groupName,
    id,
    propsFor,
    type,

    ...rest
  }) => {
    switch (type) {
      case "subtopic": {
        const data = formData?.[groupName]?.find((topic) => topic.id === id);

        if (!data) return {};

        // TODO
        // this needs to switch between player on pathsscreen and playerState on playerpaths
        switch (propsFor) {
          case "title": {
            return {
              powerStyle: {
                // TODO need to change to className on|off
                color: data.playerIds.includes(playerState.player.id)
                  ? "green"
                  : "red",
              },
              powerProps: {
                disabled: !playerState.isValid,
              },
              trashStyle: {},
              trashProps: {
                disabled: data.playerIds[0] !== playerState.player.id,
              },
              checkProps: {
                disabled: data.playerIds[0] !== playerState.player.id,
              },
            };
          }
        }
        return {};
      }
      default: {
        console.log(`unknown renderCb type: ${type}`);

        return {};
      }
    }
  };

  const getSubTitleActions = (title, subTitle) => {
    // may or may not be available, as path is retrievved async
    const path = formValues[title];

    switch (subTitle) {
      case "DETAIL": {
        return (
          <CheckButton
            onClick={(e) => actionCb({ e, id: title })}
            data-type="checkdetail"
          />
        );
      }
      case "strategies": {
        return [
          <CreatorButton
            key={title}
            createAction={(value, dataset) =>
              actionCb({ e: { currentTarget: { dataset } }, value })
            }
            data-id={title}
            data-groupname={subTitle}
            data-type="create"
            disabled={
              !playerState.isValid ||
              !path?.playerIds?.includes(playerState.player.id)
            }
            groupname="strategies"
            id={title}
          />,
        ];
      }
    }
  };

  // used in creatorList?
  const canEditCb = ({
    groupName,
    groupIndex,
    data = {},

    ...rest
  } = {}) => {
    if (!playerState.isValid) return false;
    if ("playerIds" in data) return data.playerIds[0] === playerState.player.id;

    return false; //console.log('\n\n canEditCb not setup for', groupName, groupIndex, data, rest);
  };

  const handleFormClose = (e) => {
    console.log("\n\n handleFormClose", e);
  };

  const [filteredList, setFilteredList] = useState(() => []);
  const creatorInputId = "paths-creator-input";
  const createPath = (pathName) =>
    actionCb({ mainType: "createPath", pathName });
  const getCreatorInput = () => {
    return (
      <CreatorList
        listToggleDefault="all"
        listToggleFieldOptions={listToggleFieldOptions}
        listToggleObjects={formValues}
        filterCreatorInput
        filteredList={filteredList}
        setFilteredList={setFilteredList}
        id={creatorInputId}
        activeIndex={activeIndex}
        canEdit={isEditable}
        createAction={createPath}
        setActiveIndex={updateActiveIndex}
        key={formValuesTs} // force rerender whenenver formValues change
      />
    );
  };

  // console.log('\n\n filteredList', filteredList.length, Object.keys(formValues))
  return (
    <>
      {getCreatorInput()}
      <CardContainer
        fieldKeyProps={fieldKeyProps}
        fieldKeyPropsDetail={fieldKeyPropsDetail}
        fieldkeyPropsList={fieldKeyProps}
        fieldKeyPropsSubtopic={fieldKeyPropsSubtopic}
        actionCb={actionCb}
        canEdit={false}
        canEditCb={canEditCb}
        cardData={filteredList}
        fetchCardById={props.fetchCardById}
        formValues={formValues}
        getCardActions={getCardActions}
        getCardFieldDefs={getCardFieldDefs}
        getSubTitleActions={getSubTitleActions}
        height={height}
        key="path-card-container"
        key={ts}
        playerActions={playerActions}
        playerState={playerState}
        renderCb={renderCb}
        schema={{ type: schemaTypes.defaultGroups }}
        width={width}
        formValuesTs={formValuesTs}
      />
    </>
  );
};
