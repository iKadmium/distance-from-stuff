import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LatitudeLongitude } from "./google-geocoding.service";
import { Observable } from "rxjs/Observable";
import { TravelMethod } from "./interested-place";

@Injectable()
export class GoogleDistanceMatrixService
{
	private static url: string = 'https://maps.googleapis.com/maps/api/distancematrix/json';
	private static key: string = 'AIzaSyCqntUVlqJNwvQLZrdO_w2G2Vb-fK6hIbo';

	constructor(private http: HttpClient)
	{ }

	public getDistance(sourceLocation: LatitudeLongitude, destinationLocation: LatitudeLongitude, method: TravelMethod): Observable<GoogleDistanceMatrixServiceResponse>
	{
		let location = sourceLocation.lat + "," + sourceLocation.lng;
		let destination = destinationLocation.lat + "," + destinationLocation.lng;
		let mode = "";
		switch (method)
		{
			case TravelMethod.Driving:
				mode = "driving";
				break;
			case TravelMethod.Walking:
				mode = "walking";
				break;
			case TravelMethod.Transit:
				mode = "transit";
				break;
		}
		let url = GoogleDistanceMatrixService.url + '?key=' + GoogleDistanceMatrixService.key + '&origins=' + location + '&destinations=' + destination + '&mode=' + mode;
		let request = this.http.get<GoogleDistanceMatrixServiceResponse>(url);
		return request;
	}
}

export interface GoogleDistanceMatrixServiceResponse
{
	status: string;
	origin_addresses: string[];
	destination_addresses: string[];
	rows: GoogleDistanceMatrixServiceResult[];
}

export interface GoogleDistanceMatrixServiceResult
{
	elements: GoogleDistanceMatrixServiceResultElement[];
}

export interface GoogleDistanceMatrixServiceResultElement
{
	status: string;
	duration: Duration;
	distance: Distance;
}

export interface Duration
{
	value: number;
	text: string;
}

export interface Distance
{
	value: number;
	text: string;
}