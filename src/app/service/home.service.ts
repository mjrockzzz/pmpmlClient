import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlMapping } from '../shared';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {

	constructor(private http: HttpClient) { }

	public getRouteDetails(route): Observable<any> {
		return this.http.get(UrlMapping.BaseUrl+UrlMapping.GetRouteDetailsUrl(route));
	}
	
	public getFromToRoutes(from, to): Observable<any> {
		return this.http.get(UrlMapping.BaseUrl+UrlMapping.GetFromToRoutesUrl(from, to));
	} 

	public getRoutesAtStop(stop): Observable<any> {
		return this.http.get(UrlMapping.BaseUrl+UrlMapping.GetRoutesAtStopUrl(stop));
	} 

	public getRoutesList(): Observable<any> {
		return this.http.get(UrlMapping.BaseUrl+UrlMapping.GetRoutesListUrl);
	} 

	public getStopList(): Observable<any> {
		return this.http.get(UrlMapping.BaseUrl+UrlMapping.GetStopListUrl);
	} 
}