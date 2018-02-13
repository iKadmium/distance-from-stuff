import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GoogleGeocodingService
{
	private static url: string = 'google-geocoding.php';

	constructor(private http: HttpClient)
	{ }

	public getCoordinates(address: string): Observable<GoogleGeocodingResponse>
	{
		let request = this.http.get<GoogleGeocodingResponse>(GoogleGeocodingService.url + '?address=' + address);
		return request;
	}

}

export interface GoogleGeocodingResponse
{
	status: string;
	results: GoogleGeocodingResult[];
}

export interface GoogleGeocodingResult
{
	address_components: GoogleGeocodingAddressComponent[];
	formatted_address: string;
	geometry: GoogleGeocodingGeometry;
	partial_match: boolean;
	place_id: string;
	types: string[];
}

export interface GoogleGeocodingAddressComponent
{
	long_name: string;
	short_name: string;
}

export interface GoogleGeocodingGeometry
{
	location: LatitudeLongitude;
	location_type: string;
	viewport: Viewport;
}

export interface LatitudeLongitude
{
	lat: number;
	lng: number;
}

export interface Viewport
{
	northeast: LatitudeLongitude;
	southwest: LatitudeLongitude;
}