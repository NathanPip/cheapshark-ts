export type GameDealsParams = {
    storeID?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    desc?: boolean;
    lowerPrice?: number;
    upperPrice?: number;
    metacritic?: number;
    steamRating?: number;
    streamAppID?: string;
    title?: string;
    exact?: boolean;
    AAA?: boolean;
    steamworks?: boolean;
    onSale?: boolean;
    output?: string;
}

export type GameListParams = {
    title?: string;
    steamAppID?: number;
    limit?: number;
    exact?: boolean;
}