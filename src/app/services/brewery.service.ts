import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Brewery } from '../models/brewery.model';

@Injectable({
  providedIn: 'root',
})
export class BreweryService {
  private baseUrl = 'http://localhost:8080/api/breweries';
  private favorites: Brewery[] = [];
  private favoritesSubject = new BehaviorSubject<Brewery[]>(this.favorites);

  favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getBreweries(page: number = 1, perPage: number = 10, filters?: any): Observable<Brewery[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString());
  
    if (filters) {
      if (filters.name) params = params.set('name', filters.name);
      if (filters.city) params = params.set('city', filters.city);
      if (filters.state) params = params.set('state', filters.state);
      if (filters.breweryType) params = params.set('type', filters.breweryType);
    }
  
    return this.http.get<Brewery[]>(this.baseUrl, { params }).pipe(
      map((response: any) => {
        console.log(response); // Log the response to verify
        return response.map((item: any) => this.transformBrewery(item));
      })
    );
  }  

  searchBreweries(searchTerm: string, city: string, state: string, breweryType: string, page: number = 1, perPage: number = 10): Observable<Brewery[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString());

    if (searchTerm) {
      params = params.set('name', searchTerm);
    }
    if (city) {
      params = params.set('city', city);
    }
    if (state) {
      params = params.set('state', state);
    }
    if (breweryType) {
      params = params.set('type', breweryType);
    }

    return this.http.get<Brewery[]>(`${this.baseUrl}/search`, { params }).pipe(
      map((response: any) => response.map((item: any) => this.transformBrewery(item)))
    );
  }

  getBreweryById(id: string): Observable<Brewery> {
    return this.http.get<Brewery>(`${this.baseUrl}/${id}`).pipe(
      map((response: any) => this.transformBrewery(response))
    );
  }  

  getFavorites(): Observable<Brewery[]> {
    return this.favorites$;
  }

  addToFavorites(brewery: Brewery): void {
    if (!this.favorites.find(fav => fav.id === brewery.id)) {
      this.favorites.push(brewery);
      this.favoritesSubject.next(this.favorites);
    }
  }
  
  removeFromFavorites(brewery: Brewery): void {
    this.favorites = this.favorites.filter(fav => fav.id !== brewery.id);
    this.favoritesSubject.next(this.favorites);
  }
  
  isFavorite(brewery: Brewery): boolean {
    return this.favorites.some(fav => fav.id === brewery.id);
  }  

  private transformBrewery(apiResponse: any): Brewery {
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      brewery_type: apiResponse.brewery_type || null,
      address_1: apiResponse.address_1 || null,
      city: apiResponse.city,
      postal_code: apiResponse.postal_code || null,
      country: apiResponse.country,
      phone: apiResponse.phone || null,
      website_url: apiResponse.website_url || null,
      state: apiResponse.state,
    };
  }
}
