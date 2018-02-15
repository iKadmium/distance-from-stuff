import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { InterestedPlace, TravelMethod } from "../interested-place";

@Component({
	selector: 'app-interested-place-select',
	templateUrl: './interested-place-select.component.html',
	styleUrls: ['./interested-place-select.component.css']
})
export class InterestedPlaceSelectComponent implements OnInit
{
	@Input() place: InterestedPlace;
	@Output() onRemoved = new EventEmitter<void>();

	@ViewChild("locationInput") locationInput: ElementRef;

	public TravelMethod = TravelMethod;

	constructor() { }

	ngOnInit()
	{
	}

	public removePlace(): void
	{
		this.onRemoved.emit();
	}

	public options(): void
	{

	}

}
