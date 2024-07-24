import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreweryService } from '../../services/brewery.service';
import { Brewery } from '../../models/brewery.model';
import { CapitalizeFirstPipe } from '../../capitalize-first.pipe';
import { BreweryDetailsComponent } from '../brewery-details/brewery-details.component';

@Component({
  selector: 'app-brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, CapitalizeFirstPipe, BreweryDetailsComponent]
})
export class BreweryListComponent implements OnInit {
  breweries: Brewery[] = [];
  favorites: Brewery[] = [];
  filters = { name: '', city: '', state: '', breweryType: '' };
  page: number = 1;
  perPage: number = 10;
  totalItems: number = 0;
  selectedBrewery: Brewery | null = null;
  displayFavorites = false;
  loading = false; 

  constructor(private breweryService: BreweryService) {}

  ngOnInit(): void {
    this.loadBreweries();
    this.breweryService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  // Load breweries with pagination and filtering
  loadBreweries(page: number = this.page): void {
    this.page = page;
    this.loading = true; // Indicate loading state
    this.breweryService.getBreweries(page, this.perPage, this.filters).subscribe({
      next: (breweries) => {
        this.breweries = breweries;
        this.loading = false; 
      },
      error: (error) => {
        console.error('Error loading breweries', error);
        this.loading = false; 
      }
    });
  }

  applyFilters(): void {
    this.page = 1; 
    this.loadBreweries();
  }

  clearFilters(): void {
    this.filters = { name: '', city: '', state: '', breweryType: '' };
    this.applyFilters();
  }

  // Search breweries based on current filters
  searchBreweries(): void {
    this.loading = true; 
    this.breweryService.searchBreweries(
      this.filters.name,
      this.filters.city,
      this.filters.state,
      this.filters.breweryType,
      this.page,
      this.perPage
    ).subscribe({
      next: (data) => {
        this.breweries = data;
        this.loading = false; 
      },
      error: (error) => {
        console.error('Error searching breweries', error);
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= Math.ceil(this.totalItems / this.perPage)) {
      this.page = page;
      this.searchBreweries();
    }
  }

  onSearchTermChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filters.name = input.value;
    this.searchBreweries();
  }

  onCityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filters.city = input.value;
    this.searchBreweries();
  }

  onStateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filters.state = input.value;
    this.searchBreweries();
  }

  onBreweryTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filters.breweryType = select.value;
    this.searchBreweries();
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

  toggleFavorite(brewery: Brewery): void {
    if (this.isFavorite(brewery)) {
      this.removeFavorite(brewery);
    } else {
      this.addFavorite(brewery);
    }
  }

  showDetails(brewery: Brewery): void {
    this.selectedBrewery = brewery;
  }

  hideDetails(): void {
    this.selectedBrewery = null;
  }

  nextPage(): void {
    this.page++;
    this.searchBreweries();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.searchBreweries();
    }
  }
}
