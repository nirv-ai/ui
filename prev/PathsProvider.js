"use strict";

// TODO
// this shiit makes TOO MANY api calls
// we can extract this logic to have a single DomainObjectProvider
// i think all we need to send in is a TYPE and a createDomainObjectCb

import React, { useState, useRef, useEffect } from "react";
import { createSignal, getId, isRequired, upsertPath } from "@nirv/utils";
import { pushToBackend, isOnLine, api } from "nirvClient/api";

import {
  updateDomainObject, // TODO: use this shit
  useDomainObject,
} from "nirvClient/effects";

const type = "PATHS";
// cache
let formValues = {};

export const PathsProvider = ({
  isOwner,
  player,
  playerId,
  playerState,
  playerActions,
}) => {
  const [ts, setTs] = useState(() => Date.now());
  let mounted = true;
  useEffect(() => () => (mounted = false), [mounted]);

  // if no playerId (e.g. /dashboard) or playerIds match (e.g. /somePlayer/dashboard)
  const paths = (isOwner ? playerState.player?.paths : player.paths) || {};

  const pathSignal = useRef(createSignal());

  const fetchCardById = async (id) => {
    const fetchedPath = (
      await api({
        cancelToken: pathSignal.current.token,
        domain: "path",
        meth: "get",
        path: [id],
        route: "paths",
      })
    ).data?.pop();

    if (fetchedPath.id) formValues[id] = fetchedPath;

    setTs(Date.now());

    return fetchedPath;
  };

  const updateFormValues = (newValues) => {
    formValues = newValues.reduce(
      (acc, s) => ({
        // playerActions override nirvActions
        // however they shouldnt share any values
        [s.id]: s,
        ...acc,
      }),
      {}
    );
  };

  const updateNirvPaths = (
    { domainObject, domainObjectKeys, meta = {}, ...newValues },
    persist = false
  ) => {
    // id should be required throughout the application
    if (newValues.id) {
      // hydrate nirvSkill & push
      if (persist) pushToBackend({ type, newValues });

      switch (meta.type) {
        // TODO
        // we dont want to delete the path from view, only remvoe the player
        // case 'leavePath': {
        //   delete formValues[newValues.id];
        //   break;
        // }
        default: {
          formValues[newValues.id] = {
            ...formValues[newValues.id],
            ...newValues,
          };
        }
      }

      if (mounted) setTs(Date.now());
      else playerActions.setTs(Date.now());

      return newValues;
    }

    // this is the original update
    else if (domainObject) {
      updateFormValues(domainObject);
      if (mounted) setTs(Date.now());
      else playerActions.setTs(Date.now());
    } else console.log(`\n\n why are we here? ${type}`, newValues, persist);
  };

  const actionCb = async ({
    e,
    formData,
    id,
    subtopic,
    mainType,
    skipReload = false,

    ...rest
  } = {}) => {
    if (!playerState.isValid) return false;

    const {
      type,
      groupname,
      groupindex,
      id: thingId,
      ...dataset
    } = e?.currentTarget.dataset ?? {};

    switch (mainType || type) {
      case "createPath": {
        if ((playerId && !isOwner) || !playerState.isValid) return;

        const pathId = getId(rest.pathName);

        const path = formValues[pathId];

        // TODO
        // this means we need to add the player to the path?
        if (path) return console.log("\n\n path exists", path);

        const [response, playerUpdated] = await Promise.all([
          api({
            cancelToken: pathSignal.current.token,
            data: {
              pathId: pathId,
              pathName: rest.pathName,
              playerId: playerState.player.id,
            },
            domain: "path",
            meth: "post",
            path: "gcreate",
            route: "path",
          }),
          playerActions.updatePlayerState(
            {
              id: playerState.player.id,
              paths: Array.from(
                new Set(playerState.player.paths.concat(pathId))
              ),
            },
            true
          ),
        ]);

        if (!playerUpdated || !response?.data?.id)
          return console.log(
            "\n\n error updating nirvPath & playerState",
            playerUpdated,
            playerState,
            response.data
          );

        return updateNirvPaths(response.data, false);
      }

      // TODO
      // send parent/childPaths in meta when user modifies either ?
      // as we need to update the corrosponding paths in the BFF AND the client
      case "checkdetail": {
        if (!isOwner) return;

        // path required
        const path = formValues[id];
        if (!path) return console.log("\n\n invalid pathId", id);

        const values = {};

        let hasChange = false;

        e.currentTarget
          .closest(".card-detail")
          .querySelectorAll(".form .input")
          .forEach(({ dataset: { key, fieldtype, ...i }, value, disabled }) => {
            if (!key || disabled) return;

            const field = path[key];
            switch (fieldtype) {
              case "Chip": {
                const v = value.trim().toLowerCase();

                if (!v.length) return;
                if (i.deleted == 1) {
                  // clicked X on empty/placeholder field
                  // changing an exisiting value then deleting will not delete it with this logic
                  // as the value wont exist in this check
                  if (!field.length) return;
                  const newField = field.filter(
                    (val) => val.toLowerCase() !== v
                  );
                  if (newField.length === field.length) return;

                  values[key] = newField;
                  hasChange = true;

                  break;
                }

                if (field.includes(v)) return;

                values[key] = Array.from(new Set(field.concat(v)));
                hasChange = true;
                break;
              }
              case "Input": {
                // TODO
                // need to setup logic for changing name (affects ID as in places we use name to get the id)
                if (key === "name") return;

                const v = value.trim().toLowerCase();

                if (!v.length || v === field.toLowerCase()) return;

                values[key] = v;
                hasChange = true;
                break;
              }
              default:
                throw `need to setup ${fieldtype} for actionCb.check: ${key} ${value}`;
            }
          });

        if (!hasChange) return console.log("no valid changes detected");

        return updateNirvPaths({ ...values, id }, true);
      }

      // strategy check
      case "check": {
        if (playerId && !isOwner) return;

        // subtopic required
        const sub = formData?.[groupname].find((s) => s.id === thingId) || {};
        if (!sub.id) return console.log("\n\n invalid subtopic");

        // path required
        const path = formValues[id];
        if (!path) return console.log("\n\n invalid pathId", id);

        const values = {};

        let hasChange = false;

        // TODO
        // this  and checkdetail have MOSTLY the same logic here
        e.currentTarget
          .closest(".wrapper")
          .querySelectorAll(".input")
          .forEach(({ dataset: { key, fieldtype, ...i }, value, disabled }) => {
            if (!key || disabled) return;

            const field = sub[key];
            switch (fieldtype) {
              case "Chip": {
                const v = value.trim().toLowerCase();

                if (!v.length) return;

                if (i.deleted == 1) {
                  // clicked X on empty/placeholder field
                  // changing an exisiting value then deleting will not delete it with this logic
                  // as the value wont exist in this check
                  if (!field.length) return;
                  const newField = field.filter(
                    (val) => val.toLowerCase() !== v
                  );
                  if (newField.length === field.length) return;

                  values[key] = newField;
                  hasChange = true;

                  break;
                }

                if (field.includes(v)) return;

                values[key] = Array.from(new Set(field.concat(v)));
                hasChange = true;
                break;
              }
              case "Input": {
                // TODO
                // need to setup logic for changing name (affects ID as in places we use name to get the id)
                if (key === "name") return;

                const v = value.trim().toLowerCase();

                if (!v.length || v === field.toLowerCase()) return;

                values[key] = v;
                hasChange = true;
                break;
              }
              default:
                throw `need to setup ${fieldtype} for actionCb.check: ${key} ${value}`;
            }
          });

        if (!hasChange) return console.log("no valid changes detected");

        const response = await api({
          cancelToken: pathSignal.current.token,
          data: {
            pathId: id,
            playerIds: path.playerIds,
            subtopic: groupname,
            subtopicId: thingId,
            values,
          },
          domain: "path",
          meth: "post",
          path: "edit/subtopic",
          route: "path",
        });

        if (!response?.data?.id)
          return console.log(
            "\n\n error updating nirvPath.power",
            response.data
          );

        return updateNirvPaths(response.data, false);
      }

      // subtopic power (only tested for strategies)
      case "power": {
        const thisPath = formValues[id];

        if (
          (playerId && !isOwner) ||
          !thisPath ||
          !thisPath.playerIds.includes(playerState.player.id)
        )
          return console.log("\n\n state is invalid");

        const playerIds = formData?.[groupname]?.[groupindex].playerIds;
        if (!playerIds)
          return console.log(
            "\n\n did not find playerIds, maybe use diff params?",
            formData,
            groupname,
            groupindex
          );

        const response = await api({
          cancelToken: pathSignal.current.token,
          data: {
            pathId: id,
            subtopic,
            subtopicId: thingId,
            playerIds: [playerState.player.id],
          },
          domain: "path",
          meth: "post",
          path: `${
            playerIds.includes(playerState.player.id) ? "leave" : "join"
          }/subtopic`,
          route: "path",
        });

        if (!response?.data?.id)
          return console.log(
            "\n\n error updating nirvPath.power",
            response.data
          );

        return updateNirvPaths(response.data, false);
      }

      case "trash": {
        const thisPath = formValues[id];

        if (
          (playerId && !isOwner) ||
          !thisPath ||
          !thisPath.playerIds.includes(playerState.player.id)
        )
          return console.log("\n\n state is invalid");

        const playerIds = formData?.[groupname]?.[groupindex].playerIds;
        if (!playerIds || playerIds.length > 1)
          return console.log("\n\n invalid playerIds", playerIds);

        const response = await api({
          cancelToken: pathSignal.current.token,
          data: { pathId: id, subtopic, subtopicId: thingId },
          domain: "path",
          meth: "post",
          path: "delete/subtopic/item",
          route: "path",
        });

        if (!response?.data?.id)
          return console.log(
            "\n\n error updating nirvPath.trash",
            response.data
          );

        return updateNirvPaths(response.data, false);
      }

      // create strategy
      case "create": {
        const path = formValues[thingId];

        if (!path) return console.log("unknown path", thingId);

        const newThingId = getId(rest.value);

        if (path[groupname].find((thing) => thing.id === newThingId))
          return console.log("thing already exists", newThingId);

        const response = await api({
          cancelToken: pathSignal.current.token,
          meth: "post",
          data: {
            pathId: path.id,
            subtopic: groupname,
            values: { name: rest.value, playerIds: [playerState.player.id] },
          },
          domain: "path",
          route: "path",
          path: "new/subtopic/item",
        });

        if (!response?.data?.id)
          return console.log(
            "\n\n error updating nirvPath",
            groupname,
            rest,
            response.data
          );

        return updateNirvPaths(response.data, false);
      }

      // TODO
      // leaving path not working on path detail?
      case "leavePath": {
        // if viewing a players path, require ownership
        if (playerId && !isOwner) return;

        const pathId = dataset?.pathid;
        if (!pathId) return console.log("\n\n pathid is invalid");

        const [response, playerUpdated] = await Promise.all([
          api({
            cancelToken: pathSignal.current.token,
            meth: "post",
            data: { pathId, playerIds: [playerState.player.id] },
            domain: "path",
            route: "path",
            path: "/leave",
          }),
          playerActions.updatePlayerState(
            {
              meta: { action: "force" },
              id: playerState.player.id,
              paths: playerState.player.paths.filter((p) => p !== pathId),
            },
            true,
            skipReload
          ),
        ]);

        if (!response?.data?.id)
          return console.log(
            "\n\n error updating.leavePath",
            playerUpdated,
            playerState,
            response.data
          );

        return updateNirvPaths(
          { ...response.data, meta: { type: "leavePath" } },
          false
        );
      }

      case "joinPath": {
        // TODO
        // wtf was the todo suppose to be?
        if (playerId && !isOwner) return;

        const pathId = dataset?.pathid;
        if (!pathId) return console.log("\n\n pathid is invalid");

        const [response, playerUpdated] = await Promise.all([
          api({
            cancelToken: pathSignal.current.token,
            meth: "post",
            data: { pathId, playerIds: [playerState.player.id] },
            domain: "path",
            route: "path",
            path: "/join",
          }),
          playerActions.updatePlayerState(
            {
              meta: { action: "force" },
              id: playerState.player.id,
              paths: Array.from(
                new Set(playerState.player.paths.concat(pathId))
              ),
            },
            true,
            skipReload
          ),
        ]);

        if (!response?.data?.id)
          return console.log(
            "\n\n error updating.leavePath",
            playerUpdated,
            playerState,
            response.data
          );

        return updateNirvPaths(
          { ...response.data, meta: { type: "joinPath" } },
          false
        );
      }

      default:
        return console.log(`unknown dataset.type: ${type}`);
    }
  };

  useDomainObject({
    mounted,
    cb: updateNirvPaths,
    playerId,
    requestConfig: { key: "view" },
    type,
  });

  return {
    actionCb,
    canEditPaths: playerState.isValid && isOwner,
    fetchCardById,
    formValues,
    ts, // let them know when we last updated (and refresh)
    updateNirvPaths,
  };
};
