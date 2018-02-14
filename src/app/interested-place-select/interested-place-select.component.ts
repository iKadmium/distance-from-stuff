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

	public travelMethodOpen: boolean = false;
	public locationOpen: boolean = false;

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
			this.place.name = newText;
		}
		else
		{
			this.place.name = "Somewhere";
		}
	}

	public locationInputBlur(): void
	{
		this.locationOpen = false;
		if (this.place.name == "")
		{
			this.place.name = "Somewhere";
		}
	}

	public async locationLinkClick(): Promise<void>
	{
		this.locationOpen = !this.locationOpen;
		if (this.locationOpen)
		{
			let locationElement = this.locationInput.nativeElement as HTMLInputElement;
			await InterestedPlaceSelectComponent.sleep(50);
			locationElement.focus();
		}
	}

	private static sleep(duration: number): Promise<void>
	{
		let promise = new Promise<void>((resolve, reject) =>
		{
			window.setTimeout(() =>
			{
				resolve();
			});
		});
		return promise;
	}

	private static sleepUntil(conditions: () => boolean): Promise<void>
	{
		let promise = new Promise<void>(async (resolve, reject) =>
		{
			while (!conditions())
			{
				await InterestedPlaceSelectComponent.sleep(50);
			}
			resolve();
		});
		return promise;
	}

}
