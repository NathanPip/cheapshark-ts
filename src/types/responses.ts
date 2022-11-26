type GameInfo = {
    storeId: string;
    gameId: string;
    name: string;
    steamAppId: string | null;
    salePrice: string;
    retailPrice: string;
    steamRatingText: string | null;
    steamRatingPercent: string;
    steamRatingCount: string;
    metacriticScore: string;
    metacriticLink: string | null;
    releaseDate: number;
    publisher: string;
    steamworks: string;
    thumb: string;
}

type BasicGameInfo = {
    gameID: string;
    steamAppID: string;
    cheapest: string;
    cheapestDealID: string;
    external: string;
    internalName: string;
    thumb: string;
}

type CheapestPrice = {
    price?: string;
    date: number;
}

type GameStorePrice = {
    dealId: string;
    storeId: string;
    salePrice: string;
    retailPrice: string;
}

type StoreInfo = {
    storeID: string;
    storeName: string;
    isActive: string;
    images: {
        banner: string;
        logo: string;
        icon: string;
    }
}

// /deals
export type GameDealsResponse = {
  internalName: string;
  title: string;
  metacriticLink: string | null;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string | null;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string | null;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb: string;
}[];

// /deals?id={}
export type GameDealResponse = {
  gameInfo: GameInfo;
  cheaperStores: GameStorePrice[];
  cheapestPrice: CheapestPrice;
};

// /games
export type GameListResponse = BasicGameInfo[];

// /games?id={}
export type GameLookupResponse = {
    info: {
        title: string;
        steamAppID: string | null;
        thumb: string;
    }
    cheapestPriceEver: CheapestPrice;
    deals: {
        storeID: string;
        dealID: string;
        price: string;
        retailPrice: string;
        savings: string;
    }[]
}

// /games?ids={}
export type MultipleGameLookupResponse = {
    [key: string] : GameLookupResponse
}

// /stores
export type StoresResponse = StoreInfo[];