import { useEffect, useState } from "react";
import "./App.css";

function App() {
  type Quote = {
    content: string;
    author: string;
    authorSlug: string;
  };

  const [quote, setQuote] = useState<Quote>();

  const randomQuote = async () => {
    // get a random quote from the API
    const result = await fetch(
      "https://usu-quotes-mimic.vercel.app/api/random"
    );
    const quote = result.json();
    console.log(quote);
    setQuote(await quote);
  };

  useEffect(() => {
    randomQuote();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>QuoteSearch</h1>
        <form>
          <div>
            <input type="text" placeholder="Search for a quote" />
          </div>
          <div className="searchButton">
            <button type="submit">Search</button>
          </div>
        </form>
        <div>
          <p className="quoteText">{quote?.content}</p>
        </div>
        <div>
          <p className="authorName">- {quote?.author}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
