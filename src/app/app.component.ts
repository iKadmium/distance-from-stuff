import { Component, OnInit } from '@angular/core';
import { InterestedPlace, TravelMethod } from "./interested-place";
import { GoogleGeocodingService, LatitudeLongitude } from "./google-geocoding.service";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";
import { GooglePlacesService } from "./google-places.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [GoogleGeocodingService, GooglePlacesService, GoogleDistanceMatrixService]
})
export class AppComponent implements OnInit
{
	title = 'app';

	public address: string;
	public interestedPlaces: InterestedPlace[];
	public location: LatitudeLongitude;

	public isSearching: boolean = false;
	public searchComplete: boolean = false;

	constructor(private geocodingService: GoogleGeocodingService, private placesService: GooglePlacesService,
		private distanceMatrixService: GoogleDistanceMatrixService)
	{

	}

	public ngOnInit()
	{
		// this.address = "2/15 Curwen Tce Chermside";
		this.address = "";
		this.interestedPlaces = this.getDefaultPlaces();
		this.location = {
			lat: 0,
			lng: 0
		};
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
		gym.placeName = "gym";

		let aldi = new InterestedPlace();
		aldi.method = TravelMethod.Walking;
		aldi.placeName = "supermarket";

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
		this.searchComplete = false;

		let response = await this.geocodingService.getCoordinates(this.address).toPromise();
		this.location = response.results[0].geometry.location;
		let promises: Promise<void>[] = [];
		for (let place of this.interestedPlaces)
		{
			promises.push(place.search(this.location, this.distanceMatrixService, this.placesService));
		}
		try
		{
			await Promise.all(promises);
			this.searchComplete = true;
		}
		catch (error)
		{
			console.error(error);
		}

		this.isSearching = false;
	}
}
