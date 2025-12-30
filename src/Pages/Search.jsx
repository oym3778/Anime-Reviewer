import { useEffect, useState, useRef } from "react";
import { SearchBar } from "../Components/SearchBar";
import { Spinner } from "../Components/Spinner";
import { AnimeCard } from "../Components/AnimeCard";
import { useDebounce } from "react-use";

/* keys used in sessionStorage */
const STORAGE_KEY_TERM = "search_term";
const STORAGE_KEY_RESULTS = "search_results";

export function Search() {
  // TODO input sounds broad, maybe searchTerm and setSearchTerm.
  // Be carful, the fetchAnime() uses that var aswell
  // TODO figure out how to keep the input persitent among routes, i dont
  //    want to retype a search term if i just wanted to see my reviews
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // TODO potentially make this its own component to be used in multiple pages
  const [errorMsg, setErrorMsg] = useState(""); // TODO go through and make these user friendly, while mainting dev errors

  // Similar to useState hook except it will not re-mouunt the page on change
  // Prevent the first fetch after restoring cached results from sessionStorage.
  const skipNextFetchRef = useRef(false);
  // Ensure sessionStorage restoration runs only once on initial mount.
  const restoredRef = useRef(false);

  useDebounce(() => setDebouncedInput(input), 500, [input]);

  // Restore from sessionStorage on mount (if available)
  useEffect(() => {
    try {
      const savedTerm = sessionStorage.getItem(STORAGE_KEY_TERM);
      const savedResults = sessionStorage.getItem(STORAGE_KEY_RESULTS);

      if (savedTerm && savedResults) {
        setInput(savedTerm);
        setAnimeList(JSON.parse(savedResults));
        // we restored state that matches `input`, so skip the immediate fetch
        skipNextFetchRef.current = true;
        restoredRef.current = true;
      }
    } catch (err) {
      console.warn("Failed to read search state from sessionStorage", err);
    }
  }, []); // run once on mount

  // Persist to sessionStorage whenever input or animeList changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_TERM, input);
      sessionStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(animeList));
    } catch (err) {
      console.warn("Failed to write search state to sessionStorage", err);
    }
  }, [input, animeList]);

  useEffect(() => {
    if (skipNextFetchRef.current) {
      // we have restored matching animeList for this input — don't refetch now
      skipNextFetchRef.current = false;
      return;
    }
    if (restoredRef.current) {
      restoredRef.current = false;
      return;
    }

    const fetchAnime = async (searchTerm = "") => {
      if (searchTerm.trim() === "") {
        setAnimeList([]);
        return;
      }

      setIsLoading(true);
      setErrorMsg("");

      // TODO look up common practices for where to place queries from GraphQL within React projects
      try {
        const query = `
        query ($search: String!, $page: Int) {
          Page(page: $page) {
            pageInfo {
              hasNextPage
              currentPage
            }
            media(search: $search, type: ANIME, isAdult: false) {
              id
              title {
                romaji
                english
              }
            
              coverImage {
                extraLarge
              }          
            }
          }
        }
      `;

        const variables = { search: searchTerm, page: currentPage };

        // This initial fetch returns a promise, it will either be fufilled or rejected
        // if fufilled it will return a response object we can use .then() on
        // fetch("url").then((res) => res.doSomething )
        //    Well need to parse the data returned from res with res.json() which also returns a promise

        // However if rejected well need to use catch() to read what the rejection was
        //    fetch("url").then("Didn't work so go to catch ->").catch(error message)
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });

        // If the fetch fails (400, 404, etc), response.json() might still run.
        if (!response.ok) {
          setErrorMsg(`HTTP error: ${response.status}`);
          // throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        // Explicitly check for GraphQL errors
        if (data.errors) {
          setErrorMsg(data.errors[0].message);
          throw new Error(data.errors[0].message);
        }

        // TODO add pagination with currentPage...
        setAnimeList(data.data?.Page?.media ?? []);
        // console.log(data.data.Page.media);
      } catch (error) {
        setErrorMsg(`fetchAnime() error: ${error.message}`);
        console.log("fetchAnime() error:", error);
        // TODO come back to this throw error; // rethrow so populateAnimes() receives it too
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnime(debouncedInput);
  }, [currentPage, debouncedInput]);

  return (
    <div className="flex flex-col items-center bg-orange-700 min-h-screen py-20">
      <SearchBar input={input} setInput={setInput}></SearchBar>
      <div
        id="search-result"
        // TODO Lags when stretching or shrinking... figure out why
        className="bg-orange-500 w-[80%] max-w-[1200px] min-w-[475px] p-10 rounded-xl shadow-xl"
      >
        <ul className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {/* TODO come back and re think logic, just seems a bit much. */}
          {animeList.length === 0 && !errorMsg ? (
            <li className="col-span-full text-center">
              Try Searching Something!
            </li>
          ) : isLoading ? (
            <li className="col-span-full flex justify-center items-center">
              <Spinner />
            </li>
          ) : errorMsg ? (
            <h1>{errorMsg}</h1>
          ) : (
            animeList.map((anime) => (
              <AnimeCard key={anime["id"]} anime={anime} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
