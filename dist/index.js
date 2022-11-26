var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { URL } from "./helpers/constants";
import { toSearchParams } from "./helpers/queries";
export class CheapShark {
    constructor() {
        this.getDeals = (params) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((reject, resolve) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const searchParams = params ? toSearchParams(params) : "";
                    const response = (yield (yield fetch(`${URL}/deals?${searchParams}`)).json());
                    resolve(response);
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
        this.getDealById = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((reject, resolve) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = (yield (yield fetch(`${URL}/deals?id=${id}`)).json());
                    resolve(response);
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
        this.getGames = (params) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((reject, resolve) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const searchParams = params ? toSearchParams(params) : "";
                    const response = (yield (yield fetch(`${URL}/games?${searchParams}`)).json());
                    resolve(response);
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
        this.getGameById = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((reject, resolve) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = (yield (yield fetch(`${URL}/games?id=${id}`)).json());
                    resolve(response);
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
        this.getMultipleGamesById = (ids) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((reject, resolve) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let string = "";
                    for (let i = 0; i < ids.length; i++) {
                        if (i < ids.length - 1) {
                            string += `${ids[i]},`;
                        }
                        else {
                            string += `${ids[i]}`;
                        }
                    }
                    const response = (yield (yield fetch(`${URL}/games?ids=${string}`)).json());
                    resolve(response);
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
        this.getStores = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((reject, resolve) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = (yield (yield fetch(`${URL}/stores`)).json());
                    resolve(response);
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
    }
}
