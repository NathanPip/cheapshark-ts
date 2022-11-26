import { GameDealsParams, GameListParams, RequireAtLeastOne } from "./types/params";
import { GameDealResponse, GameDealsResponse, GameListResponse, GameLookupResponse, MultipleGameLookupResponse, StoresResponse } from "./types/responses";
export declare class CheapShark {
    getDeals: (params?: GameDealsParams) => Promise<GameDealsResponse>;
    getDealById: (id: string) => Promise<GameDealResponse>;
    getGames: (params: RequireAtLeastOne<GameListParams>) => Promise<GameListResponse>;
    getGameById: (id: number) => Promise<GameLookupResponse>;
    getMultipleGamesById: (ids: number[]) => Promise<MultipleGameLookupResponse>;
    getStores: () => Promise<StoresResponse>;
}
