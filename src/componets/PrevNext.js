import React from 'react'

function PrevNext() {
  return (
    <div>
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
    </div>
  )
}

export default PrevNext
