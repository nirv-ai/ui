/**
 * Create arbitrary errors
 * used for standardizing error messages
 * @param message
 * @returns Error
 */
export const BaseError = (message: string): Error => new Error(message);

/**
 * standard error for invalid data
 * @returns BaseError
 */
export const InvalidDataError = () => BaseError("INVALID_DATA");

/**
 * cant find a player
 * @returns BaseError
 */
export const PlayerDoesntExistError = () => BaseError("PLAYER_DOESNT_EXIST");
