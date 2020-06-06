import { createHashHistory } from "history";

const history = createHashHistory();
export default history;

/**
 * Removes the search params not present in the searchRest.
 * @param {string} searchRest the rest string of the unconsumed search params
 */
export const consumeSearchParams = (searchRest) => {
  window.history.replaceState(
    null,
    null,
    window.location.href.replace(
      window.location.search,
      (searchRest !== "" ? "?" : "") + searchRest
    )
  );
};
