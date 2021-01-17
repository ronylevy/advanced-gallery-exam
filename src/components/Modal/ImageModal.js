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

  render() {
    const { imgUrl } = this.props;
    const { rotation } = this.state;
    if (this.props.show) {
      return (
        <div className="modal" onClick={this.handleCloseModal.bind(this)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <img src={imgUrl} alt="image" />
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
                  onClick={this.handleCloseModal.bind(this)}
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
