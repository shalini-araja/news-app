import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);

    let data = await fetch(url);
    props.setProgress(30);
    let dataJson = await data.json();
    props.setProgress(70);
   // console.log(dataJson);
    setArticles(dataJson.articles);
    setTotalResults(dataJson.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(
      props.category
    )} - Newsly`;
    fetchNews();
  }, [props.category]);

  const handleNextClick = async () => {
    if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
      await setPage(page + 1);
      fetchNews();
    }
  };

  const handlePreviousClick = async () => {
    if (page > 1) {
      await setPage(page - 1);
      fetchNews();
    }
  };

  const fetchMoreData = async () => {
    await setPage(page + 1);
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading({ loading: true });

      let data = await fetch(url);
      let dataJson = await data.json();

      console.log(dataJson);

      // console.log(dataJson);
      if (dataJson.status === "ok") {
        setArticles(articles.concat(dataJson.articles));
        setTotalResults(dataJson.totalResults);
        setLoading(false);
      } else {
        //  console.error("API Error:", dataJson.message);
        setLoading(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-center my-10" style={{ margin: "70px" }}>
        Newsly top {props.category} Headlines{" "}
      </h2>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={
          Array.isArray(articles) ? articles.length < totalResults : false
        }
        loader={
          <h4>
            <Spinner />
          </h4>
        }
      >
        <div className="container">
          <div className="row">
            {Array.isArray(articles) &&
              articles.map((ele) => (
                <div className="col-md-4 my-2" key={ele.url}>
                  <NewsItem
                    title={ele.title}
                    description={ele.description}
                    imgUrl={ele.urlToImage}
                    url={ele.url}
                    date={ele.publishedAt}
                    author={ele.author}
                    source={ele.source.name}
                  />
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>
      <div className="container d-flex justify-content-between">
        <button
          type="button"
          disabled={page <= 1}
          className="btn btn-dark"
          onClick={handlePreviousClick}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="btn btn-dark"
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};
