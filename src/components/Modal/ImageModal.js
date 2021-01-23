import React from "react";
import "./ImageModal.scss";
import FontAwesome from "react-fontawesome";

class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: 0,
    };
  }

  handleCloseModal() {
    this.setState({ rotation: 0 });
    this.props.onClose(false);
  }

  delete() {
    this.props.onDelete(this.props.imgId);
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

  handleLikeButtonClick() {
    const { dto } = this.props;
    this.props.onLike(dto);
  }

  closeOnEscapeKeyDown(e) {
    if (e.keyCode === 27) {
      this.handleCloseModal();
    }
  }

  componentDidMount() {
    document.body.addEventListener(
      "keydown",
      this.closeOnEscapeKeyDown.bind(this)
    );
  }

  render() {
    const { imgUrl } = this.props;
    const { rotation } = this.state;
    const { show } = this.props;
    if (show) {
      return (
        <div className="modal" onClick={this.handleCloseModal.bind(this)}>
          <div
            className="modal-content"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <img src={imgUrl} alt="image" />
              <div className="icons">
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
                  onClick={this.handleCloseModal.bind(this)}
                />
                <FontAwesome
                  className="image-icon"
                  name="heart"
                  title="heart"
                  onClick={this.handleLikeButtonClick.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else return null;
  }
}

export default ImageModal;
