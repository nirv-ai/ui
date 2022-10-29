// TODO: there can be only one loader function per route
// ^ thus you need to check the fetch Request/params to see what actually needs to be done
// ^ refactor all loaders to be route based
// ^ that consume utility fns, e.g. in a switch(loader_type) => doThisOnMatch
export * from "./loadPath";
