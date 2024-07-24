import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreweryService } from '../../services/brewery.service';
import { Brewery } from '../../models/brewery.model';
import { CapitalizeFirstPipe } from '../../capitalize-first.pipe';

@Component({
  selector: 'app-brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, CapitalizeFirstPipe]
})
export class BreweryListComponent implements OnInit {
  breweries: Brewery[] = [];
  favorites: Brewery[] = [];
  filters = { name: '', city: '', state: '', breweryType: '' };
  page: number = 1;
  perPage: number = 10;
  totalItems: number = 0; // Update this if you get total items from the API

  constructor(private breweryService: BreweryService) {}

  ngOnInit(): void {
    this.loadBreweries();
    this.breweryService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  loadBreweries(page: number = this.page): void {
    this.page = page;
    this.breweryService.getBreweries(page, this.perPage, this.filters).subscribe(breweries => {
      this.breweries = breweries;
      // Optionally update totalItems if your backend provides this information
    });
  }

  applyFilters(): void {
    this.page = 1; // Reset to the first page
    this.loadBreweries(); // Load breweries with the applied filters
  }

  clearFilters(): void {
    this.filters = { name: '', city: '', state: '', breweryType: '' };
    this.applyFilters(); // Apply filters after clearing
  }

  searchBreweries(): void {
    this.breweryService.searchBreweries(
      this.filters.name,
      this.filters.city,
      this.filters.state,
      this.filters.breweryType,
      this.page,
      this.perPage
    ).subscribe(data => {
      this.breweries = data;
      // Optionally update totalItems if your backend provides this information
    });
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= Math.ceil(this.totalItems / this.perPage)) {
      this.page = page;
      this.searchBreweries(); // Use searchBreweries to keep filters
    }
  }

  onSearchTermChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filters.name = input.value;
    this.searchBreweries(); // Trigger search with updated search term
  }

  onCityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filters.city = input.value;
    this.searchBreweries(); // Trigger search with updated city
  }

  onStateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filters.state = input.value;
    this.searchBreweries(); // Trigger search with updated state
  }

  onBreweryTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filters.breweryType = select.value;
    this.searchBreweries(); // Trigger search with updated brewery type
  }

  addFavorite(brewery: Brewery): void {
    this.breweryService.addToFavorites(brewery);
  }

  removeFavorite(brewery: Brewery): void {
    this.breweryService.removeFromFavorites(brewery);
  }

  isFavorite(brewery: Brewery): boolean {
    return this.favorites.some(fav => fav.id === brewery.id);
  }

  nextPage(): void {
    this.page++;
    this.searchBreweries(); // Ensure search is applied to the new page
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.searchBreweries(); // Ensure search is applied to the new page
    }
  }
}
