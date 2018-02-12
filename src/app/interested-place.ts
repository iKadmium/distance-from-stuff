import { LatitudeLongitude } from "./google-geocoding.service";
import { GooglePlacesResult } from "./google-places.service";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";
import { TravelMethod } from "./interested-place-wrapper";

export abstract class InterestedPlace
{
    public results: GooglePlacesResult[];
    public selectedResult: GooglePlacesResult;
    public distance: string;
    public duration: string;

    constructor()
    {
        this.results = null;
        this.selectedResult = null;
        this.distance = "";
        this.duration = "";
    }

    public async getDistance(sourceLocation: LatitudeLongitude, method: TravelMethod, distanceMatrixService: GoogleDistanceMatrixService): Promise<void>
    {
        let result = await distanceMatrixService.getDistance(sourceLocation, this.selectedResult.geometry.location, method).toPromise();
        this.distance = result.rows[0].elements[0].distance.text;
        this.duration = result.rows[0].elements[0].duration.text;
    }
}