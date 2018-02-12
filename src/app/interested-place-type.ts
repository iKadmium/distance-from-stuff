import { InterestedPlace } from "./interested-place";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";
import { LatitudeLongitude, GoogleGeocodingService } from "./google-geocoding.service";
import { GooglePlacesService, GooglePlacesResult } from "./google-places.service";

export class InterestedPlaceType extends InterestedPlace
{
    public placeType: string;

    constructor()
    {
        super();
        this.placeType = "";
    }

    public async searchPlaces(location: LatitudeLongitude, distanceMatrixService: GoogleDistanceMatrixService, placesService: GooglePlacesService): Promise<void>
    {
        let response = await placesService.findPlacesByType(location, this.placeType).toPromise();
        this.results = response.results;
        this.selectedResult = this.results[0];
    }
}