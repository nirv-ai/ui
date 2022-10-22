import type { PlayerDataInterface } from "Data";

// sometimes there are types that are used EVERY fkn where
// be careful when modifying this file

/**
 * when returning/receiving an object that could be player data or error
 */
export type PlayerDataOrErrorType = Error | PlayerDataInterface;
