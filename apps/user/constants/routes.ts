/* eslint-disable no-magic-numbers */
const ROUTE_DIVIDER = "/";
const SEARCH_PARAMS_DIVIDER = "&";

const filterEmptyDynamicRoute = (url: string | undefined, index: number) => {
  if (index === 0) return true;

  return url !== undefined;
};

const generateQueryString = (searchParams: Partial<{ [key: string]: string | null }>) => {
  return (
    Object.entries(searchParams)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined || value !== null)
      .map(([key, value]) => `${key}=${value!}`)
      .join(SEARCH_PARAMS_DIVIDER)
  );
};

class ROUTES {
  private _root = () => [""];
  private "_sns-verification" = () => [...this._root(), "sns-verification"];
  private _login = () => [...this._root(), "login"];
  private _register = () => [...this._root(), "register"];
  private "_my-page" = () => [...this._root(), "my-page"];
  private "_connect-trainer" = () => [...this["_my-page"](), "connect-trainer"];
  private "_edit-workout-schedules" = () => [...this["_my-page"](), "edit-workout-schedules"];
  private "_my-information" = () => [...this["_my-page"](), "my-information"];
  private "_verify-phone" = () => [...this["_my-information"](), "verify-phone"];
  private "_my-trainer-information" = () => [...this["_my-page"](), "my-trainer-information"];

  private _notification = () => [...this._root(), "notification"];
  private "_schedule-management" = () => [...this._root(), "schedule-management"];
  private "_reservation" = (routeParams?: string) => [
    ...this["_schedule-management"](),
    "reservation",
    routeParams,
  ];

  get root() {
    return () => this._root().join(ROUTE_DIVIDER) + "/";
  }
  get "sns-verification"() {
    return () => this["_sns-verification"]().join(ROUTE_DIVIDER);
  }
  get login() {
    return () => this._login().join(ROUTE_DIVIDER);
  }
  get register() {
    return () => this._register().join(ROUTE_DIVIDER);
  }
  get "my-page"() {
    return () => this["_my-page"]().join(ROUTE_DIVIDER);
  }
  get "connect-trainer"() {
    return () => this["_connect-trainer"]().join(ROUTE_DIVIDER);
  }
  get "edit-workout-schedules"() {
    return () => this["_edit-workout-schedules"]().join(ROUTE_DIVIDER);
  }
  get "my-information"() {
    return () => this["_my-information"]().join(ROUTE_DIVIDER);
  }
  get "verify-phone"() {
    return () => this["_verify-phone"]().join(ROUTE_DIVIDER);
  }
  get "my-trainer-information"() {
    return () => this["_my-trainer-information"]().join(ROUTE_DIVIDER);
  }
  get notification() {
    return () => this["_notification"]().join(ROUTE_DIVIDER);
  }
  get "schedule-management"() {
    return () => this["_schedule-management"]().join(ROUTE_DIVIDER);
  }
  get reservation() {
    return (
      routeParams?: string,
      searchParams?: {
        reservationDate: string | null;
      },
    ) => {
      const filteredRoute = this["_reservation"](routeParams).filter(filterEmptyDynamicRoute);
      const beforeSearchParams = filteredRoute.slice(0, filteredRoute.length);
      const queryString = searchParams && generateQueryString(searchParams);

      return queryString
        ? `${beforeSearchParams.join(ROUTE_DIVIDER)}?${queryString}`
        : beforeSearchParams.join(ROUTE_DIVIDER);
    };
  }
}

const RouteInstance = new ROUTES();

export default RouteInstance;
