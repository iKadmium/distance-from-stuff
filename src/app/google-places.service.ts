import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable";
import { LatitudeLongitude, GoogleGeocodingGeometry } from "./google-geocoding.service";

@Injectable()
export class GooglePlacesService
{
	private static url = "google-places.php";

	constructor(private http: HttpClient)
	{ }

	public findPlacesByKeyword(sourceLocation: LatitudeLongitude, keyword: string): Observable<GooglePlacesServiceResponse>
	{
		let location = sourceLocation.lat + "," + sourceLocation.lng;
		let request = this.http.get<GooglePlacesServiceResponse>(GooglePlacesService.url + '?location=' + location + '&rankby=distance' + '&keyword=' + keyword);
		return request;
	}

}

export interface GooglePlacesServiceResponse
{
	results: GooglePlacesResult[];
	status: string;
}

export interface GooglePlacesResult
{
	geometry: GoogleGeocodingGeometry;
	icon: string;
	id: string;
	name: string;
	opening_hours: OpeningHours;
	place_id: string;
	reference: string;
	scope: string;
	types: string[];
	vicinity: string;
}

export interface OpeningHours
{
	open_now: boolean;
	weekday_text: string[];
}