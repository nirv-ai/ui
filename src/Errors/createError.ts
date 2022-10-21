export const NewError = (message: string) => new Error(message);

/**
 * e.g. when submitting a form and we dont want to reveal exactly what was wrong
 */
export const InvalidDataError = () => NewError("INVALID_DATA");

export const PlayerDoesntExistError = () => NewError("PLAYER_DOESNT_EXIST");
