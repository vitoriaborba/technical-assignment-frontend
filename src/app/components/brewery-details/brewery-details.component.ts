import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreweryService } from '../../services/brewery.service';
import { Brewery } from '../../models/brewery.model';
import { Location } from '@angular/common';
import { CapitalizeFirstPipe } from "../../capitalize-first.pipe";

@Component({
  selector: 'app-brewery-details',
  templateUrl: './brewery-details.component.html',
  styleUrls: ['./brewery-details.component.css'],
  standalone: true,
  imports: [CommonModule, CapitalizeFirstPipe]
})
export class BreweryDetailsComponent implements OnInit {
  error: string | null = null;
  @Input() brewery: Brewery | null = null;
  @Output() closeDetails = new EventEmitter<void>();

  constructor(
    private breweryService: BreweryService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.breweryService.getBreweryById(id).subscribe(
        (brewery) => this.brewery = brewery,
        (error) => {
          this.error = 'Brewery not found';
          console.error('Error fetching brewery details', error);
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  close() {
    this.closeDetails.emit();
  }
}
