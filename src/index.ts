import { URL } from "./helpers/constants";
import { toSearchParams } from "./helpers/queries";
import {
  GameDealsParams,
  GameListParams,
  RequireAtLeastOne,
} from "./types/params";
import {
  GameDealResponse,
  GameDealsResponse,
  GameListResponse,
  GameLookupResponse,
  MultipleGameLookupResponse,
  StoresResponse,
} from "./types/responses";

export class CheapShark {

    private dealsParams: GameDealsParams;
    private gamesParams: GameListParams;

  constructor() {
    this.dealsParams = {
        storeID: undefined,
        pageNumber: undefined,
        pageSize: undefined,
        sortBy: undefined,
        desc: undefined,
        lowerPrice: undefined,
        upperPrice: undefined,
        metacritic: undefined,
        steamRating: undefined,
        streamAppID: undefined,
        title: undefined,
        exact: undefined,
        AAA: undefined,
        steamworks: undefined,
        onSale: undefined,
        output: undefined,
    };
    this.gamesParams = {
        title: undefined,
        steamAppID: undefined,
        limit: undefined,
        exact: undefined,
    };
  }

  public setNewDealsParams(params: RequireAtLeastOne<GameDealsParams>) {
    this.dealsParams = {...params, ...this.dealsParams};
  }

  public setNewGamesParams(params: RequireAtLeastOne<GameListParams>) {
    this.gamesParams = {...params, ...this.gamesParams};
  }

  public getDeals = async (
    params?: GameDealsParams
  ): Promise<GameDealsResponse> => {
    return new Promise(async (reject, resolve) => {
      try {
        let searchParams = "";
        if(params) {
            const newParams: GameDealsParams = {...this.dealsParams, ...params};
            searchParams = toSearchParams(newParams);
        } else {
            searchParams = toSearchParams(this.dealsParams);
        }
        const response = (await (
          await fetch(`${URL}/deals?${searchParams}`)
        ).json()) as GameDealsResponse;
        resolve(response);
      } catch (err: any) {
        reject(err);
      }
    });
  };

  public getDealById = async (id: string): Promise<GameDealResponse> => {
    return new Promise(async (reject, resolve) => {
      try {
        const response = (await (
          await fetch(`${URL}/deals?id=${id}`)
        ).json()) as GameDealResponse;
        resolve(response);
      } catch (err: any) {
        reject(err);
      }
    });
  };

  public getGames = async (
    params: RequireAtLeastOne<GameListParams>
  ): Promise<GameListResponse> => {
    return new Promise(async (reject, resolve) => {
      try {
        let searchParams = "";
        if(params) {
            const newParams: GameListParams = {...this.gamesParams, ...params};
            searchParams = toSearchParams(newParams);
        } else {
            searchParams = toSearchParams(this.gamesParams);
        }
        const response = (await (
          await fetch(`${URL}/games?${searchParams}`)
        ).json()) as GameListResponse;
        resolve(response);
      } catch (err: any) {
        reject(err);
      }
    });
  };

  public getGameById = async (id: number): Promise<GameLookupResponse> => {
    return new Promise(async (reject, resolve) => {
      try {
        const response = (await (
          await fetch(`${URL}/games?id=${id}`)
        ).json()) as GameLookupResponse;
        resolve(response);
      } catch (err: any) {
        reject(err);
      }
    });
  };

  public getMultipleGamesById = async (
    ids: number[]
  ): Promise<MultipleGameLookupResponse> => {
    return new Promise(async (reject, resolve) => {
      try {
        let string = "";
        for (let i = 0; i < ids.length; i++) {
          if (i < ids.length - 1) {
            string += `${ids[i]},`;
          } else {
            string += `${ids[i]}`;
          }
        }
        const response = (await (
          await fetch(`${URL}/games?ids=${string}`)
        ).json()) as MultipleGameLookupResponse;
        resolve(response);
      } catch (err: any) {
        reject(err);
      }
    });
  };

  public getStores = async (): Promise<StoresResponse> => {
    return new Promise(async (reject, resolve) => {
      try {
        const response = (await (
          await fetch(`${URL}/stores`)
        ).json()) as StoresResponse;
        resolve(response);
      } catch (err: any) {
        reject(err);
      }
    });
  };
}
