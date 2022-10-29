// TODO
// need to bring over pathsProvider logic

import { getId, upsertPath } from "@nirv/utils";
import { getDomainObject } from "../../research/oldcode/client/src/api/providers/domainProvider";
import { pushToBackend, isOnLine, api } from "nirvClient/api";
import { useReducer, useRef, useEffect } from "react";

const ERROR = "error";
const REFRESH = "refresh";
const SUCCESS = "success";
const UPDATE = "update";

const cache = {
  fetchesInProgress: 0,
  formValues: {},
  playerId: "",
  ts: Date.now(),
};
let requestingFormValues;
let prevTimeout;
let tracker = {
  fetchesToProcess: 0,
};
// these callback fns need to be provided elsewhere
// the formValues is stored in cache
export const pathsReducer = (prevState, { newValues, persist, type }) => {
  cache.ts = Date.now();

  switch (type) {
    case SUCCESS:
      return { ...cache };
    case ERROR:
      return { ...cache };
    case REFRESH:
      return { ...cache };

    // update a single thing
    case UPDATE: {
      if (persist)
        pushToBackend({ type: "PATHS", newValues: upsertPath(newValues) });

      // this mutation breaks formValues keys
      const prevPath = cache.formValues[newValues.id] || {};
      cache.formValues[newValues.id] = { ...prevPath, ...newValues };

      return { ...cache };
    }

    default:
      throw "wtf wrong type in pathsReducer";
  }
};

const type = "PATHS";
export const pathsProvider = ({ player, playerState, playerActions }) => {
  let mounted = true;
  useEffect(() => {
    return () => (mounted = false);
  }, [mounted]);

  const [state, dispatch] = useReducer(pathsReducer, cache);

  const isOwner = playerActions.checkIsOwner();

  const providerActions = {
    // consts
    canEditPaths: isOwner,

    // dispath shit
    refresh: () => {
      if (tracker.fetchesToProcess > 0 && mounted) {
        tracker.fetchesToProcess -= 1;
        cache.fetchesInProgress -= 1;
        dispatch({ type: REFRESH });
      } else {
        return cache.fetchesInProgress > 0;
      }
    },
    success: () => dispatch({ type: SUCCESS }),
    error: () => dispatch({ type: ERROR }),
    updateNirvPaths: ({ formValue, persist = false }) =>
      dispatch({ type: UPDATE, persist, newValues: formValue }),

    // other shit
    fetchCardById: async (id) => {
      const fetchedPath = (
        await api({
          domain: "path",
          meth: "get",
          path: [id],
          route: "paths",
        })
      ).data?.pop();

      providerActions.updateNirvPaths({ formValue: fetchedPath });

      return fetchedPath;
    },

    actionCb: async ({
      e,
      formData,
      id,
      subtopic,
      mainType,

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

      console.log("\n\n wtf is type", mainType, type);

      switch (mainType || type) {
        case "createPath": {
          if (!isOwner) return;

          const pathId = getId(rest.pathName);

          const path = cache.formValues[pathId];

          // TODO
          // this means we need to add the player to the path?
          if (path) return console.log("\n\n path exists", path);

          const response = await api({
            data: {
              pathId: pathId,
              pathName: rest.pathName,
              playerId: playerState.player.id,
            },
            domain: "path",
            meth: "post",
            path: "gcreate",
            route: "path",
          });

          if (!response?.data?.id)
            return console.log(
              "\n\n error updating nirvPath & playerState",
              playerState,
              response
            );

          return Promise.all([
            providerActions.updateNirvPaths({ formValue: response.data }),
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
        }

        // TODO
        // send parent/childPaths in meta when user modifies either ?
        // as we need to update the corrosponding paths in the BFF AND the client
        case "checkdetail": {
          if (!isOwner) return;

          // path required
          const path = cache.formValues[id];
          if (!path) return console.log("\n\n invalid pathId", id);

          const values = {};

          let hasChange = false;

          e.currentTarget
            .closest(".card-detail")
            .querySelectorAll(".form .input")
            .forEach(
              ({ dataset: { key, fieldtype, ...i }, value, disabled }) => {
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
              }
            );

          if (!hasChange) return console.log("no valid changes detected");

          return providerActions.updateNirvPaths({
            formValue: { ...values, id },
            persist: true,
          });
        }

        // strategy check
        case "check": {
          if (!isOwner) return;

          // subtopic required
          const sub = formData?.[groupname].find((s) => s.id === thingId) || {};
          if (!sub.id) return console.log("\n\n invalid subtopic");

          // path required
          const path = cache.formValues[id];
          if (!path) return console.log("\n\n invalid pathId", id);

          const values = {};

          let hasChange = false;

          // TODO
          // this  and checkdetail have MOSTLY the same logic here
          e.currentTarget
            .closest(".wrapper")
            .querySelectorAll(".input")
            .forEach(
              ({ dataset: { key, fieldtype, ...i }, value, disabled }) => {
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
              }
            );

          if (!hasChange) return console.log("no valid changes detected");

          const response = await api({
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

          return providerActions.updateNirvPaths({ formValue: response.data });
        }

        // subtopic power (only tested for strategies)
        case "power": {
          const thisPath = cache.formValues[id];

          if (
            !isOwner ||
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

          return providerActions.updateNirvPaths({ formValue: response.data });
        }

        case "trash": {
          const thisPath = cache.formValues[id];

          if (
            !isOwner ||
            !thisPath ||
            !thisPath.playerIds.includes(playerState.player.id)
          )
            return console.log("\n\n state is invalid");

          const playerIds = formData?.[groupname]?.[groupindex].playerIds;
          if (!playerIds || playerIds.length > 1)
            return console.log("\n\n invalid playerIds", playerIds);

          const response = await api({
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

          return providerActions.updateNirvPaths({ formValue: response.data });
        }

        // create strategy
        case "create": {
          const path = cache.formValues[thingId];

          if (!path) return console.log("unknown path", thingId);

          const newThingId = getId(rest.value);

          if (path[groupname].find((thing) => thing.id === newThingId))
            return console.log("thing already exists", newThingId);

          const response = await api({
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

          return providerActions.updateNirvPaths({ formValue: response.data });
        }

        // TODO
        // leaving path not working on path detail?
        case "leavePath": {
          // if viewing a players path, require ownership
          if (!isOwner) return;

          const pathId = dataset?.pathid;
          if (!pathId) return console.log("\n\n pathid is invalid");

          const response = await api({
            meth: "post",
            data: { pathId, playerIds: [playerState.player.id] },
            domain: "path",
            route: "path",
            path: "/leave",
          });

          if (!response?.data?.id)
            return console.log(
              "\n\n error updating.leavePath",
              playerState,
              response
            );

          return Promise.all([
            providerActions.updateNirvPaths({ formValue: response.data }),
            playerActions.updatePlayerState(
              {
                meta: { action: "force" },
                id: playerState.player.id,
                paths: playerState.player.paths.filter((p) => p !== pathId),
              },
              true
            ),
          ]);
        }

        case "joinPath": {
          // TODO
          // wtf was the todo suppose to be?
          if (!isOwner) return;

          const pathId = dataset?.pathid;
          if (!pathId) return console.log("\n\n pathid is invalid");

          const response = await api({
            meth: "post",
            data: { pathId, playerIds: [playerState.player.id] },
            domain: "path",
            route: "path",
            path: "/join",
          });

          if (!response?.data?.id)
            return console.log(
              "\n\n error updating.leavePath",
              playerState,
              response
            );

          return Promise.all([
            providerActions.updateNirvPaths({ formValue: response.data }),
            playerActions.updatePlayerState(
              {
                meta: { action: "force" },
                id: playerState.player.id,
                paths: Array.from(
                  new Set(playerState.player.paths.concat(pathId))
                ),
              },
              true
            ),
          ]);
        }

        default:
          return console.log(`unknown dataset.type: ${type}`);
      }
    },

    syncFormValues: (newValues) => {
      if (!newValues.reduce)
        throw `new values requires an array in syncFormValues`;

      return newValues.reduce(
        (acc, s) => ({
          [s.id]: s,
          ...acc,
        }),
        {}
      );
    },
  };

  useEffect(() => {
    if (requestingFormValues) return;

    // we already have this players paths
    if (player.id === cache.playerId) return;

    cache.playerId = player.id;
    requestingFormValues = true;

    (async () => {
      try {
        cache.fetchesInProgress += 1;
        const formValues = await getDomainObject({
          type,
          playerId: cache.playerId,
        });
        if (!formValues) throw "formValues falsy pathsProvider";

        cache.formValues = providerActions.syncFormValues(formValues);

        // console.log('\n\n got formValues', formValues, mounted)
        // it will pull down the new cach eon the next mount
        if (mounted) {
          cache.fetchesInProgress -= 1;
          providerActions.success();
        } else tracker.fetchesToProcess += 1;
      } catch (e) {
        console.log("\n\n error requestingFormValues", e);

        cache.formValues = {};
        if (mounted) {
          cache.fetchesInProgress -= 1;
          providerActions.error(e);
        } else tracker.fetchesToProcess += 1;
      } finally {
        requestingFormValues = false;
      }
    })();
  }, [mounted, cache, player, tracker, requestingFormValues]);

  const checkForFetchesInProgress = () => {
    if (!mounted) return clearTimeout(prevTimeout);

    // returns true if fetches are still in progress
    if (providerActions.refresh())
      prevTimeout = setTimeout(checkForFetchesInProgress, 500);
  };

  // set timeout on remount if fetches in progress from previous mount
  if (state.fetchesInProgress > 0) {
    if (prevTimeout) clearTimeout(prevTimeout);

    prevTimeout = setTimeout(checkForFetchesInProgress, 500);
  }

  return [state, providerActions];
};
