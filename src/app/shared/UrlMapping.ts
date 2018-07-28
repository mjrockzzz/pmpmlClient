export class UrlMapping {

    public static BaseUrl = "http://pmpmlserver.herokuapp.com/";

    public static GetRouteDetailsUrl(route) {
        return "getRouteDetails?route="+route.trim();
    }

    public static GetFromToRoutesUrl(from, to) {
        return "getFromToRoutes?from="+from+"&to="+to;
    }

    public static GetRoutesAtStopUrl(stop) {
        return "getRoutesAtStop?stop="+stop;
    }

    public static GetRoutesListUrl = "getRoutesList";
    
    public static GetStopListUrl = "getStopList";
}