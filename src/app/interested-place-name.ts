import { InterestedPlace } from "./interested-place";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";
import { LatitudeLongitude } from "./google-geocoding.service";
import { GooglePlacesService } from "./google-places.service";

export class InterestedPlaceName extends InterestedPlace
{
    public placeName: string;
    constructor()
    {
        super();
        this.placeName = "";
    }

    public async searchPlaces(location: LatitudeLongitude, distanceMatrixService: GoogleDistanceMatrixService, placesService: GooglePlacesService): Promise<void>
    {
        let response = await placesService.findPlacesByKeyword(location, this.placeName).toPromise();
        this.results = response.results;
        this.selectedResult = this.results[0];
    }
}
