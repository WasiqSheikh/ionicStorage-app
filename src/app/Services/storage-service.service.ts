import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  private _storage: Storage | null = null;

  apiKey = 'de1cc2ed';
  url = 'http://www.omdbapi.com/';
  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async setMultiple(pairs: { key: string, value: any }[]): Promise<void> {
    for (const pair of pairs) {
      await this._storage?.set(pair.key, pair.value);
    }
  }

  public async get(key: string) {
    return await this._storage?.get(key);
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }

  public async clear() {
    await this._storage?.clear();
  }
  public async getAllKeys() {
    return await this._storage?.keys();
  }
  public async getAll(): Promise<{ key: string, value: any }[]> {
    const keys = await this._storage?.keys();
    const result: { key: string, value: any }[] = [];

    if (keys) {
      for (const key of keys) {
        const value = await this._storage?.get(key);
        result.push({ key, value });
      }
    }

    return result;
  }

  public async getDetailsbyId(key: string) {
    console.log('key = ', key);
    const keys = await this._storage?.keys();
    let result: any = [];
    if (keys) {
      for (const key of keys) {
        key === 'formData' ? result = await this._storage?.get(key).then(k => result = [...k]) : null;
      }
    }

    let data = result.filter((record: any) => {
      if (record.id === key) {
        return record;
      }
    })
    return data;
  }
  async createUser(formData: any): Promise<void> {
    const keys = await this._storage?.keys();
    let result: any = [];

    if (keys) {
      for (const key of keys) {
        key === 'formData' ? result = await this._storage?.get(key).then(k => result = [...k]) : null;
      }
    }
    result.push(formData);
    await this._storage?.set('formData', result);

  }

  async UpdateData(formData: any): Promise<void> {
    const keys = await this._storage?.keys();
    let result: any = [];
    if (keys) {
      for (const key of keys) {
        key === 'formData' ? result = await this._storage?.get(key).then(k => result = [...k]) : null;
      }
    }

    result.forEach((item: any, index: number) => {
      if (item.id === formData.id) {
        result[index] = formData;
      }
    });
    await this._storage?.set('formData', result);
  }

  async getPopularMovies(): Promise<any> {
    const storedMovies = await this._storage?.get('popularMovies');
    if (storedMovies) {
      return storedMovies;
    } else {
      const url = `${environment.apiUrl}/movie/popular?api_key=${environment.apiKey}`;
      const movies = this.http.get<any>(url);
      return new Promise((resolve, reject) => {
        movies.subscribe(
          async data => {
            await this._storage?.set('popularMovies', data);
            resolve(data);
          },
          error => {
            console.error("Error fetching movies:", error);
            reject(error);
          }
        );
      });
    }
  }

  searchData(title: string, type: SearchType): Observable<any> {
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
      map(results => results)
    );
  }

  getDetails(id: string) {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }


}

export interface IUser {
  key: string;
  value: string;
}

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}
