import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

	public TravelMethod = TravelMethod;

	public travelMethodOpen: boolean = false;

	constructor() { }

	ngOnInit()
	{
	}

	public removePlace(): void
	{
		this.onRemoved.emit();
	}

	public getTravelMethodText(): string
	{
		switch (this.place.method)
		{
			case TravelMethod.Transit:
				return "Taking Public Transport";
			default:
				return TravelMethod[this.place.method];
		}
	}

	public updateName(event: TextEvent): void
	{
		let newText = (event.target as HTMLSpanElement).innerText;
		newText = newText.replace(/\n/g, " ");
		(event.target as HTMLSpanElement).innerText = newText;
		if (newText != "")
		{
			this.place.placeName = newText;
		}
		else
		{
			this.place.placeName = "Somewhere";
		}
	}

}
