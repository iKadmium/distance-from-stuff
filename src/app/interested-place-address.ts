import { InterestedPlace } from "./interested-place";
import { LatitudeLongitude } from "./google-geocoding.service";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";

export class InterestedPlaceAddress extends InterestedPlace
{
    public placeAddress: string;

    constructor()
    {
        super();
        this.placeAddress = "";
    }

}
