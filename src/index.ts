import { URL } from "./helpers/constants";
import { toSearchParams } from "./helpers/queries";
import {
  AlertParams,
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

  /** Set new default getDeals params */
  public setNewDealsParams(params: RequireAtLeastOne<GameDealsParams>) {
    this.dealsParams = { ...params, ...this.dealsParams };
  }

  /** Set new default getGames params */
  public setNewGamesParams(params: RequireAtLeastOne<GameListParams>) {
    this.gamesParams = { ...params, ...this.gamesParams };
  }

  /** Get a paged list of deals matching any number of criteria */
  public getDeals = async (
    params?: GameDealsParams
  ): Promise<GameDealsResponse> => {
    return new Promise(async (reject, resolve) => {
      try {
        let searchParams = "";
        if (params) {
          const newParams: GameDealsParams = { ...this.dealsParams, ...params };
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

  /** Get info on a specific deal based on ID */
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

  /** Get a list of games that contain a given title or match a steamAppID */
  public getGames = async (
    params: RequireAtLeastOne<GameListParams>
  ): Promise<GameListResponse> => {
    return new Promise(async (reject, resolve) => {
      try {
        let searchParams = "";
        if (params) {
          const newParams: GameListParams = { ...this.gamesParams, ...params };
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

  /** Get info on a specific game based on ID */
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

  /** Get info on multiple games based on ID */
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

  /** Get a list of all stores tracked by Cheapshark */
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

  /** Set an email alert for when game reaches or drops below specified price*/
  public setAlert = async (params: AlertParams): Promise<boolean> => {
    return new Promise(async (reject, resolve) => {
      try {
        const paramString = toSearchParams(params);
        await (await fetch(`${URL}/alerts?action=set&${paramString}`)).json();
        resolve(true);
      } catch (err: any) {
        reject(err);
      }
    });
  };

  /** Delete an email alert for specified game*/
  public deleteAlert = async (params: AlertParams): Promise<boolean> => {
    return new Promise(async (reject, resolve) => {
      try {
        const paramString = toSearchParams(params);
        await fetch(`${URL}/alerts?action=delete&${paramString}`);
        resolve(true);
      } catch (err: any) {
        reject(err);
      }
    });
  };

  /** Send email to manage alerts*/
  public sendManageAlertsEmail = async(email: string): Promise<boolean> => {
    return new Promise(async (reject, resolve) => {
      try {
        await fetch(`${URL}/alerts?action=manage&email=${email}`);
        resolve(true);
      } catch (err: any) {
        reject(err);
      }
    });
  }
}
