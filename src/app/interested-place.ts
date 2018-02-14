import { LatitudeLongitude } from "./google-geocoding.service";
import { GooglePlacesResult, GooglePlacesService } from "./google-places.service";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";

export class InterestedPlace
{
    public results: GooglePlacesResult[];
    public selectedResult: GooglePlacesResult;
    public distance: string = null;
    public duration: string = null;

    private _name: string = "Somewhere";

    public method: TravelMethod;

    public dirty: boolean = true;

    constructor()
    {
        this.method = TravelMethod.Walking;
        this.results = null;
        this.selectedResult = null;
    }

    public async getDistance(sourceLocation: LatitudeLongitude, method: TravelMethod, distanceMatrixService: GoogleDistanceMatrixService, errors: string[]): Promise<void>
    {
        try
        {
            let result = await distanceMatrixService.getDistance(sourceLocation, this.selectedResult.geometry.location, method).toPromise();
            this.distance = result.rows[0].elements[0].distance.text;
            this.duration = result.rows[0].elements[0].duration.text;
        }
        catch (error)
        {
            errors.push(error.message);
        }
    }

    public async search(location: LatitudeLongitude, distanceMatrixService: GoogleDistanceMatrixService, placesService: GooglePlacesService, errors: string[]): Promise<void>
    {
        let response = await placesService.findPlacesByKeyword(location, this.name).toPromise();
        this.results = response.results;
        this.selectedResult = this.results[0];
        this.dirty = false;

        await this.getDistance(location, this.method, distanceMatrixService, errors);
    }

    public get name(): string
    {
        return this._name;
    }

    public set name(value: string)
    {
        this._name = value;
        this.dirty = true;
    }
}

export enum TravelMethod
{
    Walking,
    Driving,
    Transit
}