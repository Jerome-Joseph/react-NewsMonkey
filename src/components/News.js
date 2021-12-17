import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize:'8',
    category:'general'
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

   capitalizeFirstLetter=(string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    // console.log("Hello this constructor in news component");
    this.state={
      articles: [ ],
      loading:false,
      page:1,
      totalResults:0
    }
    document.title=`NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async updateNews(){
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    // console.log(parsedData);
    this.setState({
       articles: parsedData.articles ,
       totalArticles: parsedData.totalResults,
       loading : false
      })
      this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews()
  }
  fetchMoreData = async () =>{
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
    articles: this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults,
    loading: false,
    })
    };
    

    render() {
        return (
            <>
                <h2 className="text-center">News Monkey Top {this.capitalizeFirstLetter(this.props.category)} News</h2>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                  dataLength={this.state.articles.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.articles.length !== this.state.totalResults}
                  loader={<Spinner/>}
                >
              <div className="container">
                <div className="row">
                 {this.state.articles.map((element)=>{
                   return <div className="col-md-4" key={element.url}>
                   <NewsItem newsUrl ={element.url} title={element.title?element.title:" "} description={element.description?element.description:" "} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
                 </div>
                 })} 
                </div>
                </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
