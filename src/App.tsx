import { useEffect, useState } from "react";
import "./App.css";

function App() {
  type Quote = {
    content: string;
    author: string;
    authorSlug: string;
  };

  const [randomQuote, setRandomQuote] = useState<Quote>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Quote[] | null>(null);
  const [view, setView] = useState<"search" | "random">("random");

  const getRandomQuote = async () => {
    // get a random quote from the API
    const result = await fetch(
      "https://usu-quotes-mimic.vercel.app/api/random"
    );
    const quote = await result.json();
    setRandomQuote(quote);
  };

  const search = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setView("search");
    // search for quotes from the API
    const result = await fetch(
      `https://usu-quotes-mimic.vercel.app/api/search?query=${searchTerm}`
    );
    const quotes = await result.json();
    setSearchResults(quotes.results);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>QuoteSearch</h1>
        <form onSubmit={search}>
          <div>
            <input
              type="text"
              placeholder="Search for a quote"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="searchButton">
            <button type="submit">Search</button>
          </div>
        </form>
        {view === "random" && randomQuote?.author && (
          <>
            <div>
              <p className="quoteText">{randomQuote?.content}</p>
            </div>
            <div>
              <p className="authorName">- {randomQuote?.author}</p>
            </div>
          </>
        )}
        {view === "random" && !randomQuote?.author && (
          <div>
            <p className="quoteText">{randomQuote?.content}</p>
          </div>
        )}
        {view === "search" && (
          <div>
            {searchResults?.map((quote) => (
              <div key={quote.authorSlug + quote.content} className="card">
                <p className="quoteText">{quote.content}</p>
                {quote.author && <p className="authorName">- {quote.author}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
