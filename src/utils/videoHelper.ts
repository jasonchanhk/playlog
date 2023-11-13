export const extractVideoIdFromUrl = (url: string) => {
    const urlObject = new URL(url);
    if (urlObject.host === "www.youtube.com" || urlObject.host === "youtube.com") {
        const searchParams = new URLSearchParams(urlObject.search);
        const videoId = searchParams.get("v");
        if (videoId != null) {
            return videoId
        } else {
            throw new Error('Sorry, for some reasons we cannot find the video id')
        }
    } else {
        // Handle invalid or unsupported URL
        throw new Error('Sorry, the url you sent was not from youtube')
    }
}
