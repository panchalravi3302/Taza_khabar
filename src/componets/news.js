import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./newsitem";

export class News extends Component {
  static defaultProps = {
    category: "general",
  };

  static propTypes = {
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      error: null,
    };
    this.pageSize = 12;
    this.apiKey = "cb7a3f08f2254249a5c6a90ead9e47b3";
  }

  async fetchNews(pageNumber) {
    try {
      this.setState({ loading: true, error: null });
      const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${this.apiKey}&page=${pageNumber}&pageSize=${this.pageSize}`;
      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        articles: Array.isArray(data.articles) ? data.articles : [],
        totalResults: data.totalResults || 0,
        page: pageNumber,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ articles: [], loading: false, error: "Failed to load news." });
    }
  }

  componentDidMount() {
    this.fetchNews(1);
  }

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1);
    }
  };

  handleNextClick = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.pageSize)) {
      this.fetchNews(this.state.page + 1);
    }
  };

  renderPagination() {
    return (
      <div className="container d-flex justify-content-between my-3">
        <button
          disabled={this.state.page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={this.handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.pageSize)}
          type="button"
          className="btn btn-dark mx-3"
          onClick={this.handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderPagination()}

        <div className="container my-3">
          <h2 style={{ fontFamily: "fangsong", fontWeight: "bold" }}>
            Latest News
          </h2>

          {this.state.loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : this.state.error ? (
            <p className="text-danger">{this.state.error}</p>
          ) : (
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element?.title || "No title"}
                    description={element?.description || "No description"}
                    imageurl={element?.urlToImage}
                    newsurl={element?.url}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {this.renderPagination()}
      </>
    );
  }
}

export default News;
