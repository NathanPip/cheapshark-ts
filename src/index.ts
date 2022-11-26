import fetch from "node-fetch";
import { URL } from "./helpers/constants";
import { toSearchParams } from "./helpers/queries";
import { GameDealsParams, GameListParams } from "./types/params";
import {
  GameDealResponse,
  GameDealsResponse,
  GameListResponse,
  GameLookupResponse,
  MultipleGameLookupResponse,
  StoresResponse,
} from "./types/responses";

class CheapShark {
  public getDeals = async (
    params?: GameDealsParams
  ): Promise<GameDealsResponse> => {
    return new Promise(async (reject, resolve) => {
      try {
        const searchParams = params ? toSearchParams(params) : "";
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
    params?: GameListParams
  ): Promise<GameListResponse> => {
    return new Promise(async (reject, resolve) => {
      try {
        const searchParams = params ? toSearchParams(params) : "";
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
        for (let i of ids) {
          string += `${i},`;
        }
        const response = (await (
          await fetch(`${URL}/games?id=${string}`)
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

export default CheapShark;
