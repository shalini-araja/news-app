export default function NewsItem(props) {
  let { title, description, imgUrl, url, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          alt="reference"
          src={
            !imgUrl
              ? "https://dims.apnews.com/dims4/default/32f1cff/2147483647/strip/true/crop/5114x2877+0+266/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F6c%2Fe2%2F70679d3039f940c6a7e9a90f07e8%2Fbd9a554b73b641aab39cb25ec40d02b3"
              : imgUrl
          }
        />
        <div className="card-body">
          <h5 className="card-title">{title || "".slice(0, 45)}</h5>
          <div className="card">
            <p className="card-text">{description || "".slice(0, 85)}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={url}
              target="_blank"
              className="btn btn-primary"
              rel="noopener noreferrer"
            >
              read more...
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
