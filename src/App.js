import Navbar from "./components/Navbar";
import News from "./components/News";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  // const apiKey = process.env.REACT_APP_NEWS_API;
  const apiKey="069e1afc8e98445c922615472d041200";

  const [progress, setProgress] = useState(0);

  const settingProgress = (progress) => {
    setProgress(progress);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar color="red" progress={progress} />

        <Routes>
          {/* 👇 Define all categories as separate routes */}
          <Route
            path="/"
            element={
              <News
                apiKey={apiKey}
                setProgress={settingProgress}
                key="general"
                pageSize={6}
                country="us"
                category="general"
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                apiKey={apiKey}
                setProgress={settingProgress}
                key="business"
                pageSize={6}
                country="us"
                category="business"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                apiKey={apiKey}
                setProgress={settingProgress}
                key="entertainment"
                pageSize={6}
                country="us"
                category="entertainment"
              />
            }
          />
          <Route
            path="/general"
            element={
              <News
                apiKey={apiKey}
                setProgress={settingProgress}
                key="general"
                pageSize={6}
                country="us"
                category="general"
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                apiKey={apiKey}
                setProgress={settingProgress}
                key="health"
                pageSize={6}
                country="us"
                category="health"
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                apiKey={apiKey}
                setProgress={settingProgress}
                key="science"
                pageSize={6}
                country="us"
                category="science"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                apiKey={apiKey}
                setProgress={settingProgress}
                key="sports"
                pageSize={6}
                country="us"
                category="sports"
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                apiKey={apiKey}
                setProgress={settingProgress}
                key="technology"
                pageSize={6}
                country="us"
                category="technology"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
