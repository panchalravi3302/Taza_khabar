import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title,description,imageurl,newsurl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src={imageurl ? imageurl : "https://media.zenfs.com/en/coingape_360/9666ffd53aebba899efea6ee3770e282"} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsurl} target="_blank" className="btn btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
