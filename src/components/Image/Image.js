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
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotation: 0,
    };

    // this.rotate = this.rotate.bind(this);
  }

  calcImageSize() {
    const { galleryWidth } = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = galleryWidth / imagesPerRow;
    this.setState({
      size,
    });
  }

  rotate() {
    console.log(this);
    let newRotation = this.state.rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    this.setState({
      rotation: newRotation,
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  render() {
    const { rotation } = this.state;
    return (
      <div
        className="image-root"
        style={{
          transform: `rotate(${rotation}deg)`,
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.size + "px",
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
          <FontAwesome className="image-icon" name="trash-alt" title="delete" />
          <FontAwesome className="image-icon" name="expand" title="expand" />
        </div>
      </div>
    );
  }
}

export default Image;
