
# cheapshark-ts
an abstract layer for the cheapshark api which provides easy, typesafe, endpoint calling

**Note if used with Node**: Currently only compatible with Node Versions 17.5+



## Installation

Install cheapshark-ts with npm

```bash
  npm install cheapshark-ts
```
    
## Setup

```javascript
import {CheapShark} from 'cheapshark-ts'

const cheapshark = new CheapShark();
```
## Usage/Examples
The CheapShark class consists of getter functions which correspond to each different CheapShark API endpoint. Each function returns a typsafe Promise with the data requested.

----------

## Default Query Parameters
You can set default parameters for game deals and games list calls. This is useful if you want to set a default lowestPrice for deals or a filter that persists between calls. You can set default parameters by calling the setter functions. The default parameters are reset to their default values when the CheapShark class is reinstantiated.

### setNewDealsParams
set new default params for getDeals calls

```javascript
cheapshark.setNewDealsParams({lowerPrice: 0.99, metacritic: 80});
```

### setNewGamesParams
set new default params for getGames calls

```javascript
cheapshark.setNewGamesParams({title: 'Divinity Original Sin 2', exact: true});
```

## getDeals
Returns a list of game deals depending on search criteria

```javascript
/**
 * @param {
 *   storeID?: string; //id of store returned by cheapshark
 *   pageNumber?: number; // The requested page number | Default: 0
 *   pageSize?: number; // number of deals per page | Default: 60 | Max: 60 
 *   sortBy?:     
 *      | "Deal Rating"
 *      | "Title"
 *      | "Savings"
 *      | "Price"
 *      | "Metacritic"
 *      | "Reviews"
 *      | "Release"
 *      | "Store"
 *      | "recent"; // Criteria to sort list by
 *   desc?: boolean; // determines sort direction
 *   lowerPrice?: number; // Only returns deals with a price greater than this value | Deafult: 0
 *   upperPrice?: number; // Only returns deals with a price less than or equal to this value (50 acts the same as no limit)
 *   metacritic?: number; // Minimum Metacritic rating for a game
 *   steamRating?: number; // Minimum Steam reviews rating for a game
 *   streamAppID?: string; // Look for deals on specific games, comma separated list of Steam App ID (still bound by pageSize)
 *   title?: string; // Looks for the string contained anywhere in the game name
 *   exact?: boolean; // Flag to allow only exact string match for title parameter | Default: 0
 *   AAA?: boolean; // Flag to include only deals with retail price > $29
 *   steamworks?: boolean; // Flag to include only deals that redeem on Steam (best guess, depends on store support)
 *   onSale?: boolean; // Flag to include only games that are currently on sale
 *   output?: string; // Option to output deals in RSS format (overrides page number/size to 0/100)
 * }
 */

cheapshark
  .getDeals({
    lowerPrice: 1.99
  })
  .then((deals) => console.log(deals));

// or async await example
try {
  const deals = await cheapshark.getDeals({
    lowerPrice: 1.99,
    upperPrice: 29.99,
    pageSize: 30,
    sortBy: "Reviews"
  });
  console.log(deals);
} catch (error) {
  console.error(error);
}
```

## getDealByID
Returns a specific deal based on ID

```javascript
/**
 * @param {
 *   id: string
 * }
 */

cheapshark
  .getDealByID("X8sebHhbc1Ga0dTkgg59WgyM506af9oNZZJLU9uSrX8%3D")
  .then((deal) => console.log(deal));

// or async await example
try {
  const games = await cheapshark.getDealByID("X8sebHhbc1Ga0dTkgg59WgyM506af9oNZZJLU9uSrX8%3D")
  console.log(games);
} catch (error) {
  console.error(error);
}
```

## getGames
Returns a list of games and their info

```javascript
/**
 * @param {
 *  title?: string; // Search for a game by title, case insensitive
 *  steamAppID?: number; // Search for games by steam app ID
 *  limit?: number; // The maximum number of games to return, up to 60 | Default: 60
 *  exact?: boolean; // Flag to allow only exact string match for title parameter
 * }
 */

cheapshark
  .getGames({title: "batman"})
  .then((games) => console.log(games));

// or async await example
try {
  const games = await cheapshark.getGames({title: "batman"})
  console.log(games);
} catch (error) {
  console.error(error);
}
```

## getGameByID
Returns a game based on ID

```javascript
/**
 * @param {
 *  id: number
 * }
 */

cheapshark
  .getGameByID(612)
  .then((game) => console.log(game));

// or async await example
try {
  const game = await cheapshark.getGameByID(612)
  console.log(game);
} catch (error) {
  console.error(error);
}
```

## getMultipleGamesByID
Returns an array of games based on ID

```javascript
/**
 * @param {
 *  id: number[]
 * }
 */

cheapshark
  .getMultipleGamesByID([612, 513, 245])
  .then((games) => console.log(games));

// or async await example
try {
  const games = await cheapshark.getMultipleGamesByID([612, 513, 245])
  console.log(games);
} catch (error) {
  console.error(error);
}
```
## getStores
Returns an array of stores where deals are retrieved

```javascript
/**
 * @param {
 * }
 */

cheapshark
  .getStores()
  .then((stores) => console.log(stores));

// or async await example
try {
  const stores = await cheapshark.getStores()
  console.log(stores);
} catch (error) {
  console.error(error);
}
```

## setAlert
Returns an array of stores where deals are retrieved

```javascript
/**
 * @param {
 * email: string;
 * gameID: number;
 * price: number;
 * }
 */
/** returns true if resolved, false if rejected */

cheapshark
  .setAlert({email: randomExample@example123.com, gameID: 612, price: 9.99})
  .then((didPass) => console.log(didPass));

// or async await example
try {
  const didPass = await cheapshark.setAlert({email: randomExample@example123.com, gameID: 612, price: 9.99})
  console.log(didPass);
} catch (error) {
  console.error(error);
}
```

## deleteAlert
Returns an array of stores where deals are retrieved

```javascript
/**
 * @param {
 * email: string;
 * gameID: number;
 * price: number;
 * }
 */
/** returns true if resolved, false if rejected */

cheapshark
  .deleteAlert({email: "randomExample@example123.com", gameID: 412, price: 15.00})
  .then((didPass) => console.log(didPass));

// or async await example
try {
  const didPass = await cheapshark.deleteAlert({email: "randomExample@example123.com", gameID: 412, price: 15.00})
  console.log(didPass);
} catch (error) {
  console.error(error);
}
```

## sendManageAlertsEmail
Returns an array of stores where deals are retrieved

```javascript
/**
 * @param email: string
 */
/** returns true if resolved, false if rejected */

cheapshark
  .sendManageAlertsEmail("randomExample@example123.com")
  .then((didPass) => console.log(didPass));

// or async await example
try {
  const didPass = await cheapshark.sendManageAlertsEmail("randomExample@example123.com")
  console.log(didPass);
} catch (error) {
  console.error(error);
}
```

## Official API Docs

Official Docs: https://apidocs.cheapshark.com/


## Contributing

Contributions are always welcome!

Please provide and issue/enhancement and pull request along with it at https://github.com/NathanPip/cheapshark-ts

