import { Component, OnInit } from '@angular/core';
import { Brewery } from '../../models/brewery.model';
import { BreweryService } from '../../services/brewery.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { BreweryDetailsComponent } from '../brewery-details/brewery-details.component';
import { CapitalizeFirstPipe } from '../../capitalize-first.pipe';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css'],
  standalone: true,
  imports: [CommonModule, BreweryDetailsComponent, CapitalizeFirstPipe]
})
export class FavoritesListComponent implements OnInit {
  favorites: Brewery[] = [];
  filteredFavorites: Brewery[] = [];
  page = 1;
  perPage = 10;
  totalItems = 0;
  selectedBrewery: Brewery | null = null;

  constructor(
    private location: Location,
    private breweryService: BreweryService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  // Fetch the list of favorite breweries and handle pagination
  loadFavorites(): void {
    this.breweryService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
      this.totalItems = this.favorites.length;
      this.pagination();
    });
  }

  removeFavorite(brewery: Brewery): void {
    this.breweryService.removeFromFavorites(brewery);
  }

  goBack(): void {
    this.location.back();
  }

  pagination(): void {
    this.filteredFavorites = this.favorites.slice((this.page - 1) * this.perPage, this.page * this.perPage);
  }

  nextPage(): void {
    if (this.page * this.perPage < this.totalItems) {
      this.page++;
      this.pagination();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.pagination();
    }
  }

  showDetails(brewery: Brewery): void {
    this.selectedBrewery = brewery;
  }

  hideDetails(): void {
    this.selectedBrewery = null;
  }
}
