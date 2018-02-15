import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InterestedPlace, TravelMethod } from "../interested-place";
import { GoogleDistanceMatrixService } from "../google-distance-matrix.service";
import { LatitudeLongitude } from "../google-geocoding.service";
import { GooglePlacesResult, GooglePlacesService } from "../google-places.service";

@Component({
	selector: 'app-interested-place-display',
	templateUrl: './interested-place-display.component.html',
	styleUrls: ['./interested-place-display.component.css'],
	providers: [GoogleDistanceMatrixService, GooglePlacesService]
})
export class InterestedPlaceDisplayComponent implements OnInit, OnChanges
{
	@Input() location: LatitudeLongitude;
	@Input() place: InterestedPlace;

	public placeErrors: string[] = [];
	public distanceErrors: string[] = [];

	public results: GooglePlacesResult[] = [];
	public selectedResult: GooglePlacesResult;

	public distance: string = "";
	public duration: string = "";

	public searchingForPlaces: boolean = false;
	public searchingForDistance: boolean = false;

	constructor(private distanceMatrixService: GoogleDistanceMatrixService, private placesService: GooglePlacesService) { }

	ngOnInit()
	{
	}

	ngOnChanges(changes: SimpleChanges): void
	{
		if (changes["location"] != null)
		{
			let location = changes["location"].currentValue as LatitudeLongitude;
			if (!(location.lat == 0 && location.lng == 0))
			{
				this.search();
			}
		}
		if (changes["place"] != null)
		{
			let place = changes["place"].currentValue as InterestedPlace;
			place.methodObservable.subscribe(value =>
			{
				this.getDistance();
			});
			place.nameObservable.subscribe(value =>
			{
				this.search();
			});
		}
	}

	public async selectResult(result: GooglePlacesResult): Promise<void>
	{
		this.selectedResult = result;
		this.getDistance();
	}

	public async search(): Promise<void>
	{
		this.placeErrors = [];
		this.searchingForPlaces = true;
		try
		{
			let response = await this.placesService.findPlacesByKeyword(this.location, this.place.name).toPromise();
			switch (response.status)
			{
				case "OK":
					this.results = response.results;
					this.selectedResult = this.results[0];
					this.getDistance();
					break;
				case "ZERO_RESULTS":
					this.placeErrors.push("No results were found")
					break;
				default:
					this.placeErrors.push(response.status);
					break;
			}
		}
		catch (error)
		{
			this.placeErrors.push(error.message);
		}
		this.searchingForPlaces = false;
	}

	public async getDistance(): Promise<void>
	{
		this.searchingForDistance = true;
		this.distanceErrors = [];
		try
		{
			let result = await this.distanceMatrixService.getDistance(this.location, this.selectedResult.geometry.location, this.place.method).toPromise();
			let firstElement = result.rows[0].elements[0];
			switch (firstElement.status)
			{
				case "OK":
					this.distance = firstElement.distance.text;
					this.duration = firstElement.duration.text;
					break;
				case "ZERO_RESULTS":
					this.distanceErrors.push("Unable to plot a path");
					break;
				default:
					this.distanceErrors.push(firstElement.status);
					break;
			}

		}
		catch (error)
		{
			console.error(error);
			this.distanceErrors.push(error.message);
		}
		this.searchingForDistance = false;
	}

	public getMethodText(): string
	{
		switch (this.place.method)
		{
			case TravelMethod.Transit:
				return "Taking Public Transport";
			default:
				return TravelMethod[this.place.method];
		}
	}

	public getMapsLink(): string
	{
		let baseURL = "https://www.google.com/maps/dir/?api=1";
		let travelMode = "";
		switch (this.place.method)
		{
			case TravelMethod.Walking:
				travelMode = "walking";
				break;
			case TravelMethod.Driving:
				travelMode = "driving";
				break;
			case TravelMethod.Transit:
				travelMode = "transit";
				break;
		}
		let url = baseURL + "&origin=" + this.location.lat + "," + this.location.lng + "&destination=" +
			this.selectedResult.vicinity + "&travelmode=" + travelMode;

		return url;
	}

}
