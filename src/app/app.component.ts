import { Component, OnInit } from '@angular/core';
import { InterestedPlace } from "./interested-place";
import { InterestedPlaceWrapper, InterestedPlaceTypes, TravelMethod } from "./interested-place-wrapper";
import { InterestedPlaceType } from "./interested-place-type";
import { GoogleGeocodingService, LatitudeLongitude } from "./google-geocoding.service";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";
import { GooglePlacesService } from "./google-places.service";
import { InterestedPlaceName } from "./interested-place-name";

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
	public interestedPlaces: InterestedPlaceWrapper[];
	public location: LatitudeLongitude;

	constructor(private geocodingService: GoogleGeocodingService, private placesService: GooglePlacesService,
		private distanceMatrixService: GoogleDistanceMatrixService)
	{

	}

	public ngOnInit()
	{
		this.address = "2/15 Curwen Tce Chermside";
		this.interestedPlaces = this.getDefaultPlaces();
		this.location = {
			lat: -27.383845,
			lng: 153.0250059
		};
	}

	private getDefaultPlaces(): InterestedPlaceWrapper[]
	{
		let places: InterestedPlaceWrapper[] = [];

		let gym = new InterestedPlaceWrapper(this.distanceMatrixService, this.geocodingService, this.placesService);
		gym.method = TravelMethod.Walking;
		let gymPlace = new InterestedPlaceType();
		gym.type = InterestedPlaceTypes.Type;
		gymPlace.placeType = "gym";
		gym.place = gymPlace;

		let aldi = new InterestedPlaceWrapper(this.distanceMatrixService, this.geocodingService, this.placesService);
		aldi.method = TravelMethod.Walking;
		let aldiPlace = new InterestedPlaceName();
		aldi.type = InterestedPlaceTypes.Name;
		aldiPlace.placeName = "Aldi";
		aldi.place = aldiPlace;

		let city = new InterestedPlaceWrapper(this.distanceMatrixService, this.geocodingService, this.placesService);
		city.method = TravelMethod.Transit;
		let cityPlace = new InterestedPlaceName();
		city.type = InterestedPlaceTypes.Name;
		cityPlace.placeName = "City";
		city.place = cityPlace;

		places.push(gym);
		places.push(aldi);
		places.push(city);

		return places;
	}

	public addPlace(): void
	{
		let newPlace = new InterestedPlaceWrapper(this.distanceMatrixService, this.geocodingService, this.placesService);
		this.interestedPlaces.push(newPlace);
	}

	public async search(): Promise<void>
	{
		let response = await this.geocodingService.getCoordinates(this.address).toPromise();
		this.location = response.results[0].geometry.location;
		let promises: Promise<void>[] = [];
		for (let place of this.interestedPlaces)
		{
			promises.push(place.search(this.location));
		}
		await Promise.all(promises);
	}
}
