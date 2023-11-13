export const formatElapsedTime = (videoElapsedTimeStamp: string) => {
    const elapsed_seconds = Number(videoElapsedTimeStamp);
    const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
    const min = Math.floor(elapsed_milliseconds / 60000);
    const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);
    const formattedCurrentTime = min.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    return formattedCurrentTime
}