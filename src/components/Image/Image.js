import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import "./Image.scss";
class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      size: 200,
      rotation: 0,
    };
  }

  delete() {
    this.props.onDelete(this.props.dto.id);
  }

  rotate() {
    let newRotation = this.state.rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    this.setState({
      rotation: newRotation,
    });
  }

  handleExpandClick() {
    const { dto } = this.props;
    this.props.onShow(
      `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg}`,
      dto.id,
      dto
    );
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  handleLikeButtonClick() {
    const { dto } = this.props;
    this.props.onLike(dto);
  }

  handleModalClose() {
    this.setState({ modalIsOpen: false });
  }

  onDragStart(event, imgId) {
    event.dataTransfer.setData("DraggedImgId", imgId);
  }

  onDrop(event, droppedImgId) {
    const { imagesArray } = this.props;
    let draggedImgId = event.dataTransfer.getData("DraggedImgId");
    event.dataTransfer.clearData();
    const dragImageIndex = imagesArray.findIndex(
      (image) => image.id === draggedImgId
    );
    const dropImageIndex = imagesArray.findIndex(
      (image) => image.id === droppedImgId
    );

    const temp = imagesArray[dragImageIndex];
    imagesArray[dragImageIndex] = imagesArray[dropImageIndex];
    imagesArray[dropImageIndex] = temp;

    this.props.dragAndDrop(imagesArray);
  }

  render() {
    const { rotation } = this.state;
    return (
      <div
        draggable
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDragStart={(e) => {
          this.onDragStart(e, this.props.dto.id);
        }}
        onDrop={(e) => {
          this.onDrop(e, this.props.dto.id);
        }}
        className="image-root"
        style={{
          transform: `rotate(${rotation}deg)`,
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          height: this.state.size + "px",
        }}
      >
        <div>
          <FontAwesome
            className="image-icon"
            name="sync-alt"
            title="rotate"
            onClick={this.rotate.bind(this)}
          />
          <FontAwesome
            className="image-icon"
            name="trash-alt"
            title="delete"
            onClick={this.delete.bind(this)}
          />
          <FontAwesome
            className="image-icon"
            name="expand"
            title="expand"
            onClick={this.handleExpandClick.bind(this)}
          />
          <FontAwesome
            className="image-icon"
            name="heart"
            title="heart"
            onClick={this.handleLikeButtonClick.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Image;
