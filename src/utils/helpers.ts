//Many components share this function, best to keep it in a utils file to write once, change many
export const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ':' + ('0' + (sec % 60)).slice(-2);
