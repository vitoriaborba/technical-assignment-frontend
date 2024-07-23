import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreweryService } from '../../services/brewery.service';
import { Brewery } from '../../models/brewery.model';

@Component({
  selector: 'app-brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BreweryListComponent implements OnInit {
  breweries: Brewery[] = [];
  favorites: Brewery[] = [];
  filters = { name: '', city: '', state: '', breweryType: '' };
  currentPage = 1;
  searchTerm: string = '';
  city: string = '';
  state: string = '';
  breweryType: string = '';
  page: number = 1;
  perPage: number = 10;
  totalItems = 0;

  constructor(private breweryService: BreweryService) {}

  ngOnInit(): void {
    this.loadBreweries();
    this.breweryService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  loadBreweries(page: number = 1): void {
    this.page = page; // Ensure the page number is updated correctly
    this.breweryService.getBreweries(page, this.perPage, this.filters).subscribe(breweries => {
      this.breweries = breweries;
      // Optionally, update totalItems if your backend supports returning the total count
    });
  }

  applyFilters(): void {
    this.page = 1; // Reset to the first page
    this.filters = {
      name: this.searchTerm,
      city: this.city,
      state: this.state,
      breweryType: this.breweryType
    };
    this.loadBreweries(); // Load breweries with the applied filters
  }

  clearFilters(): void {
    this.filters = { name: '', city: '', state: '', breweryType: '' };
    this.applyFilters(); // Apply filters after clearing
  }

  onPageChange(page: number): void {
    if (page > 0 && (page - 1) * this.perPage < this.totalItems) {
      this.loadBreweries(page);
    }
  }

  onSearchTermChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.applyFilters(); // Apply filters after searching
  }

  onCityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.city = input.value;
    this.applyFilters(); // Apply filters after changing city
  }

  onStateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.state = input.value;
    this.applyFilters(); // Apply filters after changing state
  }

  onBreweryTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.breweryType = select.value;
    this.applyFilters(); // Apply filters after changing brewery type
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
    this.loadBreweries(this.page);
  }
  
  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadBreweries(this.page);
    }
  }  
}
