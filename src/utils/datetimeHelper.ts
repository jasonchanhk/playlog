export const formatElapsedTime = (videoElapsedTimeStamp: string, playbackOffset: string) => {
    const elapsed_seconds = parseInt(videoElapsedTimeStamp) - parseInt(playbackOffset) <= 0 ? 0 : parseInt(videoElapsedTimeStamp) - parseInt(playbackOffset);
    const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
    const min = Math.floor(elapsed_milliseconds / 60000);
    const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);
    const formattedCurrentTime = min.toString() + ":" + seconds.toString().padStart(2, "0");
    return formattedCurrentTime
}