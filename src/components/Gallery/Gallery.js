import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Image from "../Image";
import "./Gallery.scss";
import ImageModal from "../Modal/ImageModal";
import { debounce } from "./debouncer";
class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.baseUrl = "https://api.flickr.com/";
    this.getImagesWithDiffTag = debounce(this.getImagesWithDiffTag, 200);
    this.state = {
      images: [],
      likedImages: [],
      galleryWidth: this.getGalleryWidth(),
      modalIsOpen: false,
      imgUrl: "",
      imgId: "",
      singleImgdto: null,
      scrollPosition: 0,
    };
  }

  getGalleryWidth() {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  turnArrayUnique(array) {
    const arrayOfUniquesIds = [];
    const arrayOfUniqueImages = [];
    for (let i = 0; i < array.length; i++) {
      if (!arrayOfUniquesIds[array[i].id]) {
        arrayOfUniqueImages.push(array[i]);
        arrayOfUniquesIds[array[i].id] = 1;
      }
    }
    return arrayOfUniqueImages;
  }

  getMoreImagesWithSameTag(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&nojsoncallback=1`;
    axios({
      url: getImagesUrl,
      baseURL: this.baseUrl,
      method: "GET",
    })
      .then((res) => res.data)
      .then((res) => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          let newImagesArray = this.state.images.concat(res.photos.photo);
          const arrayOfUniqueImages = this.turnArrayUnique(newImagesArray);
          this.setState({
            images: arrayOfUniqueImages,
          });
        }
      });
  }

  getImagesWithDiffTag(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&nojsoncallback=1`;
    axios({
      url: getImagesUrl,
      baseURL: this.baseUrl,
      method: "GET",
    })
      .then((res) => res.data)
      .then((res) => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          this.setState({
            images: res.photos.photo,
          });
        }
      });
  }

  trackingScrollPosition() {
    setTimeout(
      setInterval(() => {
        const userScrollPosition = parseInt(window.pageYOffset);
        const maximumScrollPosition = parseInt(
          document.body.clientHeight - innerHeight
        );
        if (userScrollPosition >= 0.9 * maximumScrollPosition) {
          this.getMoreImagesWithSameTag(this.props.tag);
        }
      }, 500),
      10000
    );
  }

  componentDidMount() {
    this.getImagesWithDiffTag(this.props.tag);
    this.trackingScrollPosition();
    this.setState({
      galleryWidth: document.body.clientWidth,
    });
  }

  componentWillReceiveProps(props) {
    this.getImagesWithDiffTag(props.tag);
  }

  onDelete(imgId) {
    const newImagesArray = this.state.images.filter((img) => img.id !== imgId);
    this.setState({ images: newImagesArray, modalIsOpen: false });
  }

  handleExpandButtonClick(imgUrl, imgId, imgdto) {
    this.setState({
      modalIsOpen: true,
      imgUrl: imgUrl,
      imgId: imgId,
      singleImgdto: imgdto,
    });
  }

  handleCloseModal(close) {
    this.setState({ modalIsOpen: close });
  }

  dragAndDrop(newImagesArray) {
    this.setState({ images: newImagesArray });
  }

  handleLikeButtonClick(dto) {
    const allLikedImages = [...this.state.likedImages, dto];
    const uniqueLikedImages = this.turnArrayUnique(allLikedImages);
    this.setState({ likedImages: uniqueLikedImages });
  }

  render() {
    const { page } = this.props;
    return (
      <div className="gallery-root">
        {page === "search"
          ? this.state.images.map((dto) => {
              return (
                <Image
                  dragAndDrop={this.dragAndDrop.bind(this)}
                  imagesArray={this.state.images}
                  key={"image-" + dto.id + Date.now() + dto.secret}
                  dto={dto}
                  galleryWidth={this.state.galleryWidth}
                  onDelete={this.onDelete.bind(this)}
                  onShow={this.handleExpandButtonClick.bind(this)}
                  onLike={this.handleLikeButtonClick.bind(this)}
                />
              );
            })
          : this.state.likedImages.map((dto) => {
              return (
                <Image
                  dragAndDrop={this.dragAndDrop.bind(this)}
                  imagesArray={this.state.likedImages}
                  key={"image-" + dto.id + Date.now() + dto.secret}
                  dto={dto}
                  galleryWidth={this.state.galleryWidth}
                  onDelete={this.onDelete.bind(this)}
                  onShow={this.handleExpandButtonClick.bind(this)}
                  onLike={this.handleLikeButtonClick.bind(this)}
                />
              );
            })}
        <ImageModal
          dto={this.state.singleImgdto}
          show={this.state.modalIsOpen}
          onClose={this.handleCloseModal.bind(this)}
          imgUrl={this.state.imgUrl}
          imgId={this.state.imgId}
          onDelete={this.onDelete.bind(this)}
          onLike={this.handleLikeButtonClick.bind(this)}
        />
      </div>
    );
  }
}

export default Gallery;
