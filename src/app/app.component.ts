import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { HomeService } from './service';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	@ViewChild('routeDetailsModal') routeDetailsModal: ModalDirective;
	@ViewChild('mapViewModal') mapViewModal: ModalDirective;
	@ViewChild('mapView1Modal') mapView1Modal: ModalDirective;

	p:number = 1;
	public loading: boolean= false;
	public routeNoList = [];
	public stopList = [];
	public route;
	public from;
	public to;
	public stop;
	public selectedRoute;
	public selectedFrom;
	public selectedTo;
	public selectedStop;
	public markers= [];
	public baseCoordinates= [18.535694, 73.856944];
	public currentLocation= [];
	public currentCoordinates= [];
	public zoom= 12;
	public flag=0;
	public alert= false;
	public selectedButton=1;
  	public list;

	public selectedItem= {
		route_no: null,
		route_description: null,
		stop_details: []
	};

	constructor(private homeService: HomeService, private toastr: ToastrService) {}

	ngOnInit() {
		this.getRoutesList();
		this.getStopList();
		this.getCurrentPosition();
	}

  	changeButton(button) {
		this.selectedButton= button;
	}

	getCurrentPosition() {
		navigator.geolocation.getCurrentPosition(position => {
			this.currentLocation= [position.coords.latitude, position.coords.longitude];
		},
		error => {
			console.log("Toaster thrown");
			this.toastr.error("We are unable to get your current location. Hence, some functions may not work properly.");
		})
	}

	openMapView1Modal() {
		this.selectedFrom= null;
		this.selectedRoute= null;
		this.selectedTo= null;
		this.selectedStop= null;
		this.selectedItem= {
			route_no: null,
			route_description: null,
			stop_details: []
		};
		this.flag=0;
		this.list= null;
		this.alert= false;
		this.currentCoordinates= this.currentLocation;
		this.mapView1Modal.show();
	}

	getIcon(marker) {
		if(this.selectedFrom==marker.stop_name || this.selectedTo==marker.stop_name || this.selectedStop==marker.stop_name)
			return 'assets/bus - Copy.svg';
		else
			return 'assets/bus.svg';
	}

	dragEvent(event) {
		this.currentCoordinates= [event.coords.lat, event.coords.lng];
	}

	swap() {
		var temp= this.from;
		this.from= this.to;
		this.to= temp;
	}

	setStopFromMap(stopName) {
		this.mapViewModal.hide();
		this.stop= stopName;
	}

	isQueryStop(stop) {
		if(this.selectedFrom==stop || this.selectedTo==stop || this.selectedStop==stop)
			return true;
		else
			return false;
	}

	openRouteDetailsModal(item) {
		this.selectedItem= item;
		this.mapViewModal.hide();
		this.routeDetailsModal.show();
	}

	viewNearby(lat, long) {
		this.markers= [];
		this.stopList.forEach(stop => {
			if(lat+0.005000>=stop.latitude && stop.latitude>=lat-0.005000) {
				if(long+0.005000>=stop.longitude && stop.longitude>=long-0.005000) {
					this.markers.push(stop);
				}
			}
		})
		this.baseCoordinates= [lat, long];
		this.zoom= 12;
		this.mapView1Modal.hide();
		this.mapViewModal.show();
	}

	openMapViewModal() {
		this.markers= [];
		this.routeDetailsModal.hide();
		this.selectedItem.stop_details.forEach(stop => {
			this.stopList.forEach(data => {
				if(data.stop_name==stop) {
					this.markers.push(data);
				}
			})
		})
		this.baseCoordinates= [this.markers[0].latitude, this.markers[0].longitude];
		this.zoom= 12;
		this.mapViewModal.show();
	}

	getRoutesList() {
		this.loading= true;
		this.homeService.getRoutesList().subscribe(response => {
			this.loading= false;
			this.routeNoList = response;
		},
		error => {
			this.loading= false;
		})
	}

	getStopList() {
		this.loading= true;
		this.homeService.getStopList().subscribe(response => {
			this.loading= false;
			this.stopList = response;
		},
		error => {
			this.loading= false;
		})
	}

	getFromToRoutes() {
		this.loading= true;
		this.stop= null;
		this.route= null;
		this.alert= false;
		if(this.from!="" && this.to!="" && this.from!=null && this.to!=null) {
			this.list= [];
			this.homeService.getFromToRoutes(this.from, this.to).subscribe(response => {
				this.loading= false;
				this.flag=1;
				this.selectedFrom= this.from;
				this.selectedTo= this.to;
				this.selectedStop= null;
				var list= response;
				var finalList= [];
				if(list.length>0) {
					list.forEach(item => {
						var stopDetails= item.stop_details.split(',');
						item.stop_details= stopDetails;
						if(item.stop_details.includes(this.from) && item.stop_details.includes(this.to)) {
							finalList.push(item);
						}
					})
					this.list= finalList;
				}
				else {
					this.alert=true;
				}
			},
			error => {
				this.loading= false;
			})
		}
		else {
			this.loading= false;
			this.toastr.warning("Please enter a source and destination stop first.");
		}
	}

	getRoutesAtStop() {
		this.loading= true;
		this.from= null;
		this.to= null;
		this.route= null;
		this.alert= false;
		if(this.stop!="" && this.stop!=null) {
			this.list= [];
			this.homeService.getRoutesAtStop(this.stop).subscribe(response => {
				this.loading= false;
				this.flag=2;
				this.selectedStop= this.stop;
				this.selectedFrom= null;
				this.selectedTo= null;
				var list= response;
				var finalList= [];
				if(list.length>0) {
					list.forEach(item => {
						var stopDetails= item.stop_details.split(',');
						item.stop_details= stopDetails;
						if(item.stop_details.includes(this.stop)) {
							finalList.push(item);
						}
					})
					this.list= finalList;
				}
				else {
					this.alert= true;
				}
			},
			error => {
				this.loading= false;
			})
		}
		else {
			this.loading= false;
			this.toastr.warning("Please enter a stop name first.");
		}
	}

	getRouteDetails() {
		this.loading= true;
		this.from= null;
		this.to= null;
		this.stop= null;
		this.alert= false;
		if(this.route!="" && this.route!=null) {
			this.list= [];
			this.homeService.getRouteDetails(this.route.trim()).subscribe(response => {
				this.loading= false;
				this.flag=3;
				this.selectedRoute= this.route;
				this.selectedStop= null;
				this.selectedFrom= null;
				this.selectedTo= null;
				var list= response;
				if(list.length>0) {
					list.forEach(item => {
						var stopDetails= item.stop_details.split(',');
						item.stop_details= stopDetails;
					})
					this.list= list;
				}
				else {
					this.alert= true;
				}
			},
			error => {
				this.loading= false;
			})
		}
		else {
			this.loading= false;
			this.toastr.warning("Please enter a route no first.");
		}
	}
}