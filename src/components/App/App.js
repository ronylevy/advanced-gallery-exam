import React from "react";
import "./App.scss";
import Gallery from "../Gallery";

class App extends React.Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      tag: "art",
      page: "search",
    };
  }

  handleSearchButtonClick() {
    this.setState({ page: "search" });
  }

  handleLikedImagesButtonClick() {
    this.setState({ page: "likedImages" });
  }

  render() {
    const { page } = this.state;
    return (
      <div className="app-root">
        <div className="app-header">
          <h2> Flickr Gallery </h2>
          <div className="page-buttons">
            <button
              className="button"
              onClick={this.handleSearchButtonClick.bind(this)}
              disabled={page === "search" ? true : false}
            >
              Search Page
            </button>
            <button
              className="button"
              onClick={this.handleLikedImagesButtonClick.bind(this)}
              disabled={page === "search" ? false : true}
            >
              Liked Images
            </button>
          </div>
          {page === "search" ? (
            <input
              className="app-input"
              onChange={(event) => this.setState({ tag: event.target.value })}
              value={this.state.tag}
            />
          ) : null}
        </div>
        <Gallery tag={this.state.tag} page={page} />
      </div>
    );
  }
}

export default App;
