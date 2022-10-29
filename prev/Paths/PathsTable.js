"use strict";

import React, { useState, useEffect, useRef } from "react";
import Table from "nirvClient/components/Table";
import { pathsProvider } from "nirvClient/api/providers";
import { PathsTableRow } from "./PathsTableRow";
import { CreatorList } from "nirvClient/components/CreatorInput";
import { useActiveIndexes } from "nirvClient/effects";

// TODO
// are we using all of this shit?
import { getId, isRequired, toggleArrayItem, upsertPath } from "@nirv/utils";

const listToggleFieldOptions = [
  // { field: 'playerIds', filter: {name: 'length'}, text: 'players' },
  { field: "ts", filter: Number, text: "updated" },
];
// TODO
// what changes are we tracking for activities and events?
// const getTrackableChanges = () => ({
//     skillfulActions: new Set(), // skillfulActions to be added/removed
//   });
// let trackedChanges;

let prevTimeout;
export const PathsTablePure = ({
  canEdit = false,
  height,
  itemSize,
  overscanCount,
  player,
  playerActions = {},
  playerState = {},
  width,
}) => {
  // if (!trackedChanges) trackedChanges = getTrackableChanges();

  let mounted = true;
  useEffect(() => () => (mounted = false), [mounted]);

  const [ts, setTs] = useState(() => Date.now());

  const [
    { formValues, ...state },
    {
      actionCb,
      canEditPaths,
      fetchCardById,
      updateNirvPaths,

      ...providerActions
    },
  ] = pathsProvider({
    player,
    playerState,
    playerActions,
  });

  const isEditable = canEdit && canEditPaths;

  const updatePlayerActivities = async (activity, meta) =>
    true;
    // playerActions.updatePlayerState(
    //   {
    //     id: playerState.player.id,
    //     activities: { [activity.id]: activity },
    //     meta,
    //   },
    //   true
    // )

  // should there also be a persistEvent?
  const persistActivity = async (formValue, meta) =>
    true;
    // Promise.all([
    //   // update nirvActions (dont persist)
    //   updateNirvPaths(formValue),
    //   // persist changes to playerAction
    //   // provide meta as second param
    //   updatePlayerActivities(
    //     upsertPlayerActivity(formValue),
    //     meta,
    //   ),
    // ])

  const [[activeIndex, activeIcon], setActiveIndex] = useActiveIndexes("paths");

  // toggles path join/leave
  const powerToggleCb = async (e, formValue) => {
    console.log("\n\n powerToggleCb clicked", e.currentTarget.dataset);

    // TODO
    // have to skip reloading player state or it causes a react unmount fucking bitch
    const resp = await actionCb({ e });
  };

  // TODO (copy paste from actionsTAble)
  // called when opening/closing a form
  // resets changes on open
  // persists changes on close
  // and updates activeIndex
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
      type: "paths",
      rowIndex,
      iconIndex,
      setId: !formValue, // if we have a form value === closing form
    });
  };

  const createPath = async (name = "" /* dataset */) => {};

  const [filteredList, setFilteredList] = useState(() => []);
  const creatorInputId = "paths-creator-input";
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
        key={state.ts} // force rerender whenenver formValues change
      />
    );
  };

  const getItemKey = (index, data) => filteredList[index] || index;

  return (
    <section id="paths-table" key="paths-table-container">
      {getCreatorInput()}

      <Table
        height={height}
        itemKey={getItemKey}
        itemSize={itemSize}
        overscanCount={overscanCount}
        width={width}
        itemData={{
          activeIcon,
          activeIndex,
          canEdit: isEditable,
          formValues,
          height,
          items: filteredList,
          itemSize,
          overscanCount,
          player,
          playerActions,
          playerState,
          powerToggleCb,
          setActiveIndex: updateActiveIndex,
          updateFormValues: updatePlayerActivities,
        }}
        Row={PathsTableRow}
      />
    </section>
  );
};

const areEqual = (pp, np) => {
  return false;
};

export const PathsTable = React.memo(PathsTablePure, areEqual);
