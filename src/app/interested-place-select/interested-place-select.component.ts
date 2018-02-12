import { Component, OnInit, Input } from '@angular/core';
import { InterestedPlaceWrapper, InterestedPlaceTypes, TravelMethod } from "../interested-place-wrapper";

@Component({
  selector: 'app-interested-place-select',
  templateUrl: './interested-place-select.component.html',
  styleUrls: ['./interested-place-select.component.css']
})
export class InterestedPlaceSelectComponent implements OnInit
{
  @Input() place: InterestedPlaceWrapper;
  public TravelMethod = TravelMethod;
  public PlaceType = InterestedPlaceTypes;

  constructor() { }

  ngOnInit()
  {
  }

}
