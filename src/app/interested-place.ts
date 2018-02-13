import { LatitudeLongitude } from "./google-geocoding.service";
import { GooglePlacesResult, GooglePlacesService } from "./google-places.service";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";

export class InterestedPlace
{
    public results: GooglePlacesResult[];
    public selectedResult: GooglePlacesResult;
    public distance: string;
    public duration: string;

    public placeName: string;

    public method: TravelMethod;

    constructor()
    {
        this.method = TravelMethod.Walking;
        this.results = null;
        this.selectedResult = null;
        this.distance = "";
        this.duration = "";
        this.placeName = "Somewhere";
    }

    public async getDistance(sourceLocation: LatitudeLongitude, method: TravelMethod, distanceMatrixService: GoogleDistanceMatrixService): Promise<void>
    {
        let result = await distanceMatrixService.getDistance(sourceLocation, this.selectedResult.geometry.location, method).toPromise();
        this.distance = result.rows[0].elements[0].distance.text;
        this.duration = result.rows[0].elements[0].duration.text;
    }

    public async search(location: LatitudeLongitude, distanceMatrixService: GoogleDistanceMatrixService, placesService: GooglePlacesService): Promise<void>
    {
        let response = await placesService.findPlacesByKeyword(location, this.placeName).toPromise();
        this.results = response.results;
        this.selectedResult = this.results[0];

        await this.getDistance(location, this.method, distanceMatrixService);
    }

    public getDisplayText(): string
    {
        return this.placeName;
    }
}

export enum TravelMethod
{
    Walking,
    Driving,
    Transit
}