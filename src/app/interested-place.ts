import { LatitudeLongitude } from "./google-geocoding.service";
import { GooglePlacesResult, GooglePlacesService } from "./google-places.service";
import { GoogleDistanceMatrixService } from "./google-distance-matrix.service";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

export class InterestedPlace
{
    private _name: string = "Somewhere";
    private _method: TravelMethod = TravelMethod.Walking;

    private methodSubject: Subject<TravelMethod>;
    private nameSubject: Subject<string>;

    constructor()
    {
        this.methodSubject = new Subject<TravelMethod>();
        this.nameSubject = new Subject<string>();
    }

    public get name(): string
    {
        return this._name;
    }

    public set name(value: string)
    {
        this._name = value;
        this.nameSubject.next(value);
    }

    public get nameObservable(): Observable<string>
    {
        return this.nameSubject.asObservable();
    }

    public get method(): TravelMethod
    {
        return this._method;
    }

    public set method(value: TravelMethod)
    {
        this._method = value;
        this.methodSubject.next(value);
    }

    public get methodObservable(): Observable<TravelMethod>
    {
        return this.methodSubject.asObservable();
    }
}

export enum TravelMethod
{
    Walking,
    Driving,
    Transit
}