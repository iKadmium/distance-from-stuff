import { InterestedPlace } from "./interested-place";
import { InterestedPlaceAddress } from "./interested-place-address";
import { InterestedPlaceName } from "./interested-place-name";
import { InterestedPlaceType } from "./interested-place-type";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";
import { GoogleGeocodingService, LatitudeLongitude } from "./google-geocoding.service";
import { GooglePlacesService } from "./google-places.service";

export class InterestedPlaceWrapper
{
    private _type: InterestedPlaceTypes;
    public place: InterestedPlace;
    public method: TravelMethod;

    constructor(protected googleDistanceMatrixService: GoogleDistanceMatrixService, protected googleGeocodingService: GoogleGeocodingService,
        protected googlePlacesService: GooglePlacesService)
    {
        this.type = InterestedPlaceTypes.Type;
    }

    public get type(): InterestedPlaceTypes
    {
        return this._type;
    }

    public set type(type: InterestedPlaceTypes)
    {
        this._type = type;
        switch (type)
        {
            case InterestedPlaceTypes.Address:
                this.place = new InterestedPlaceAddress();
                break;
            case InterestedPlaceTypes.Name:
                this.place = new InterestedPlaceName();
                break;
            case InterestedPlaceTypes.Type:
                this.place = new InterestedPlaceType();
                break;
        }
    }

    public async search(location: LatitudeLongitude): Promise<void>
    {
        switch (this.type)
        {
            case InterestedPlaceTypes.Address:
                (this.place as InterestedPlaceAddress)
                break;
            case InterestedPlaceTypes.Name:
                await (this.place as InterestedPlaceName).searchPlaces(location, this.googleDistanceMatrixService, this.googlePlacesService);
                break;
            case InterestedPlaceTypes.Type:
                await (this.place as InterestedPlaceType).searchPlaces(location, this.googleDistanceMatrixService, this.googlePlacesService);
                break;
        }
        await this.getDistance(location);
    }

    public async getDistance(location: LatitudeLongitude): Promise<void>
    {
        switch (this.type)
        {
            case InterestedPlaceTypes.Address:
                (this.place as InterestedPlaceAddress)
                break;
            case InterestedPlaceTypes.Name:
                await (this.place as InterestedPlaceName).getDistance(location, this.method, this.googleDistanceMatrixService);
                break;
            case InterestedPlaceTypes.Type:
                await (this.place as InterestedPlaceType).getDistance(location, this.method, this.googleDistanceMatrixService);
                break;
        }
    }

}

export enum InterestedPlaceTypes
{
    Address,
    Name,
    Type
}

export enum TravelMethod
{
    Walking,
    Driving,
    Transit
}