import { parseCollection } from "../helpers/leagueHelper.mjs";

class LeaguesCollection {
  constructor(yf) {
    this.yf = yf;
  }

  fetch(...args) {
    let leagueKeys = args.shift(),
      subresources = args.length > 1 ? args.shift : [];
    const cb = args.pop();

    let url =
      "https://fantasysports.yahooapis.com/fantasy/v2/leagues;league_keys=";

    if ("string" === typeof leagueKeys) {
      leagueKeys = [leagueKeys];
    }

    url += leagueKeys.join(",");

    if ("string" === typeof subresources) {
      subresources = [subresources];
    }

    if (subresources.length > 0) {
      url += `;out=${subresources.join(",")}`;
    }

    url += "?format=json";

    this.yf.api(this.yf.GET, url, (e, data) => {
      if (e) {
        return cb(e);
      }

      const leagues = leagueHelper.parseCollection(
        data.fantasy_content.leagues,
        subresources
      );

      return cb(null, leagues);
    });
  }
}

export default LeaguesCollection;
