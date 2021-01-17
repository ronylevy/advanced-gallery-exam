import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Image from "../Image";
import "./Gallery.scss";
import ImageModal from "../Modal/ImageModal";

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      modalIsOpen: false,
      imgUrl: "",
      imgId: "",
    };
  }

  getGalleryWidth() {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&nojsoncallback=1`;
    const baseUrl = "https://api.flickr.com/";
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
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
          this.setState({ images: res.photos.photo });
        }
      });
  }

  componentDidMount() {
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth,
    });
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }

  onDelete(imgId) {
    const newImagesArray = this.state.images.filter((img) => img.id !== imgId);
    this.setState({ images: newImagesArray, modalIsOpen: false });
  }

  handleExpandButtonClick(imgUrl, imgId) {
    this.setState({ modalIsOpen: true, imgUrl: imgUrl, imgId: imgId });
  }

  handleCloseModal(close) {
    this.setState({ modalIsOpen: close });
  }

  setImgSize(imgSize) {
    this.setState({ imgSize: imgSize });
  }

  render() {
    return (
      <div className="gallery-root">
        {this.state.images.map((dto) => {
          return (
            <Image
              key={"image-" + dto.id}
              dto={dto}
              galleryWidth={this.state.galleryWidth}
              onDelete={this.onDelete.bind(this)}
              onShow={this.handleExpandButtonClick.bind(this)}
              imgSize={this.setImgSize.bind(this)}
            />
          );
        })}
        <ImageModal
          show={this.state.modalIsOpen}
          onClose={this.handleCloseModal.bind(this)}
          imgUrl={this.state.imgUrl}
          imgId={this.state.imgId}
          onDelete={this.onDelete.bind(this)}
        />
      </div>
    );
  }
}

export default Gallery;
