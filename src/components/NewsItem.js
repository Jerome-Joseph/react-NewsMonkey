import React, { Component } from 'react'

export class NewsItem extends Component {
        render() {
        let {title, description, imgUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize:'13px'}}> {source} </span>
                    <img src={!imgUrl?"https://st1.latestly.com/wp-content/uploads/2021/11/SWOT-satellite-in-orbit-784x441.jpg":imgUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unkown":author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                    </div>
            </div>
        )
    }
}

export default NewsItem
