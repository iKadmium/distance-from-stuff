import { Component, OnInit, Input } from '@angular/core';
import { InterestedPlace } from "../interested-place";
import { GoogleDistanceMatrixService } from "../google-distance-matrix.service";
import { LatitudeLongitude } from "../google-geocoding.service";
import { GooglePlacesResult } from "../google-places.service";

@Component({
	selector: 'app-interested-place-display',
	templateUrl: './interested-place-display.component.html',
	styleUrls: ['./interested-place-display.component.css'],
	providers: [GoogleDistanceMatrixService]
})
export class InterestedPlaceDisplayComponent implements OnInit
{
	@Input() location: LatitudeLongitude;
	@Input() place: InterestedPlace;

	public resultOpen: boolean = false;
	public errors: string[] = [];

	constructor(private distanceMatrixService: GoogleDistanceMatrixService) { }

	ngOnInit()
	{
	}

	public async selectResult(result: GooglePlacesResult): Promise<void>
	{
		this.place.selectedResult = result;
		this.place.getDistance(this.location, this.place.method, this.distanceMatrixService, this.errors);
	}

}
