import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import * as data from './../googleSearch.json';
import { Iimage } from './interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private url = 'https://customsearch.googleapis.com/customsearch/v1';
  private searchParams = data.default;

  constructor(private http: HttpClient) {}

  public getSearchData(
    searchTerms: string,
    count = 10,
    c2coff = 1,
    searchType = 'image'
  ): Observable<Iimage[] | null> {
    const cx = this.searchParams.id;
    const key = this.searchParams.apiKey;
    const url = `${this.url}?q=${searchTerms}&num=${count}&cx=${cx}&c2coff=${c2coff}&key=${key}&searchType=${searchType}`;

    return this.http.get(url).pipe(
      map((val:any) => val.items),
      catchError(_ => of(null))
      );
  }
}
