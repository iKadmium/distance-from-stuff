import { Component, OnInit, QueryList, ViewChildren, ContentChildren } from '@angular/core';
import { InterestedPlace, TravelMethod } from "./interested-place";
import { GoogleGeocodingService, LatitudeLongitude } from "./google-geocoding.service";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";
import { GooglePlacesService } from "./google-places.service";
import { InterestedPlaceDisplayComponent } from "./interested-place-display/interested-place-display.component";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [GoogleGeocodingService, GooglePlacesService, GoogleDistanceMatrixService]
})
export class AppComponent implements OnInit
{
	title = 'app';

	@ViewChildren(InterestedPlaceDisplayComponent) placeDisplays: QueryList<InterestedPlaceDisplayComponent>;

	public address: string;
	public interestedPlaces: InterestedPlace[];
	public location: LatitudeLongitude = null;

	public isSearching: boolean = false;
	public errors: string[] = [];

	constructor(private geocodingService: GoogleGeocodingService, private placesService: GooglePlacesService,
		private distanceMatrixService: GoogleDistanceMatrixService)
	{

	}

	public ngOnInit()
	{
		// this.address = "2/15 Curwen Tce Chermside";
		this.address = "";
		this.interestedPlaces = this.getDefaultPlaces();
	}

	private getDefaultPlaces(): InterestedPlace[]
	{
		let places: InterestedPlace[] = [];

		// let gym = new InterestedPlace();
		// gym.method = TravelMethod.Walking;
		// gym.placeName = "gym";

		// let aldi = new InterestedPlace();
		// aldi.method = TravelMethod.Walking;
		// aldi.placeName = "Aldi";

		// let city = new InterestedPlace();
		// city.method = TravelMethod.Transit;
		// city.placeName = "City";

		// places.push(gym);
		// places.push(aldi);
		// places.push(city);

		let gym = new InterestedPlace();
		gym.method = TravelMethod.Walking;
		gym.name = "gym";

		let aldi = new InterestedPlace();
		aldi.method = TravelMethod.Walking;
		aldi.name = "supermarket";

		places.push(gym);
		places.push(aldi);

		return places;
	}

	public addPlace(): void
	{
		let newPlace = new InterestedPlace();
		this.interestedPlaces.push(newPlace);
	}

	public removePlace(place: InterestedPlace): void
	{
		let index = this.interestedPlaces.indexOf(place);
		this.interestedPlaces.splice(index, 1);
	}

	public async search(): Promise<void>
	{
		this.isSearching = true;
		this.location = null;

		this.errors = [];

		try
		{
			let response = await this.geocodingService.getCoordinates(this.address).toPromise();
			if (response.status != "OK")
			{
				throw new Error(response.status);
			}
			this.location = response.results[0].geometry.location;
		}
		catch (error)
		{
			this.errors.push(error.message);
		}

		this.isSearching = false;
	}
}
