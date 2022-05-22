import React from "react";
import "./App.css";
import { getArticles } from "./api";
import ArticleList from "./components/articleList";
import SearchBar from "./components/searchBar";
import { Container, Header } from "semantic-ui-react";

function App() {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTopic, setSearchTopic] = React.useState('');
  const [totalResults, setTotalResults] = React.useState('');
  const [apiError, setApiError] = React.useState('');

  React.useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.response.articles);
      });
  }, []);

  const searchForTopic = async (topic) => {
    try {
      const data = await getArticles(topic);
      setLoading(false);
      setArticles(data.response.articles);
      setSearchTopic(topic);
      setTotalResults(data.response.totalResults);
    } catch (error) {
      setArticles([]);
      setApiError("Could not find any articles");
    }
  };

  return (
    <div className="App">
      <Container>
        <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
          News
        </Header>
        <SearchBar searchForTopic={searchForTopic} setLoading={setLoading} loader={loading} />
        {searchTopic && (
          <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
            Found {totalResults} articles on "{searchTopic}"
          </Header>
        )}
        {articles.length > 0 && <ArticleList articles={articles} />}
      </Container>
    </div>
  );
}

export default App;