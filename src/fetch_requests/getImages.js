import axios from "axios";

export function getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&nojsoncallback=1`;
    const baseUrl = "https://api.flickr.com/";
    return axios.get(baseUrl + getImagesUrl)
        .then((res) => res.data)
        .then((res) => {
            if (
                res &&
                res.photos &&
                res.photos.photo &&
                res.photos.photo.length > 0
            ) res.photos.photo
        })
}