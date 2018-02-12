import { Component, OnInit, Input } from '@angular/core';
import { InterestedPlace } from "../interested-place";
import { InterestedPlaceWrapper } from "../interested-place-wrapper";
import { GoogleDistanceMatrixService } from "../google-distance-matrix.service";
import { LatitudeLongitude } from "../google-geocoding.service";

@Component({
	selector: 'app-interested-place-display',
	templateUrl: './interested-place-display.component.html',
	styleUrls: ['./interested-place-display.component.css'],
	providers: [GoogleDistanceMatrixService]
})
export class InterestedPlaceDisplayComponent implements OnInit
{
	@Input() location: LatitudeLongitude;
	@Input() place: InterestedPlaceWrapper;

	constructor(private distanceMatrixService: GoogleDistanceMatrixService) { }

	ngOnInit()
	{
	}

	public async updateResult(): Promise<void>
	{
		this.place.place.getDistance(this.location, this.place.method, this.distanceMatrixService);
	}

}
