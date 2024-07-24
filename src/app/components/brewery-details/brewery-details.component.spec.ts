import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryDetailsComponent } from './brewery-details.component';
import { CapitalizeFirstPipe } from '../../capitalize-first.pipe';

describe('BreweryDetailsComponent', () => {
  let component: BreweryDetailsComponent;
  let fixture: ComponentFixture<BreweryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreweryDetailsComponent, CapitalizeFirstPipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreweryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
