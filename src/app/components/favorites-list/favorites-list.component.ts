import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Brewery } from '../../models/brewery.model';
import { Location } from '@angular/common';
import { BreweryService } from '../../services/brewery.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FavoritesListComponent implements OnInit {
  favorites: Brewery[] = [];

  constructor(private location: Location,
    private breweryService: BreweryService
  ) {}

  ngOnInit(): void {
    this.breweryService.getFavorites().subscribe(favorites => {
      console.log(favorites); // Log the favorites to verify
      this.favorites = favorites;
    });
  }
  

  getFavorites(): void {
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
      this.favorites = JSON.parse(favoritesString);
    }
  }

  removeFavorite(brewery: Brewery): void {
    this.breweryService.removeFromFavorites(brewery);
  }

  goBack(): void {
    this.location.back();
  }
}
