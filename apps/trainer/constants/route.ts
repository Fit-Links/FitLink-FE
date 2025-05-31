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

  private _login = () => [...this._root(), "login"];

  private "_sns-verification" = () => [...this._root(), "sns-verification"];

  private _register = () => [...this._root(), "register"];

  private "_member-management" = (routeParams?: string) => [
    ...this._root(),
    "member-management",
    routeParams,
  ];

  private "_schedule-management" = () => [...this._root(), "schedule-management"];
  private "_dayoff-management" = () => [...this["_schedule-management"](), "dayoff-management"];
  private "_fixed-reservation" = () => [...this["_schedule-management"](), "fixed-reservation"];
  private "_select-pt-times" = (routeParams?: string) => [
    ...this["_fixed-reservation"](),
    "select-pt-times",
    routeParams,
  ];
  private "_pending-reservations" = (routeParams?: string) => [
    ...this["_schedule-management"](),
    "pending-reservations",
    routeParams,
  ];
  private "_reservation" = (routeParams?: string) => [
    ...this["_schedule-management"](),
    "reservation",
    routeParams,
  ];

  private "_my-page" = () => [...this._root(), "my-page"];
  private "_my-information" = () => [...this["_my-page"](), "my-information"];
  private "_trainer-code" = () => [...this["_my-page"](), "trainer-code"];
  private "_edit-workout-schedule" = () => [...this["_my-page"](), "edit-workout-schedule"];
  private "_edit-verificated-phone" = () => [
    ...this["_my-information"](),
    "edit-verificated-phone",
  ];

  private _notification = (routeParams?: string) => [...this._root(), "notification", routeParams];

  get root() {
    return () => {
      return this._root().join(ROUTE_DIVIDER) + "/";
    };
  }
  get login() {
    return () => {
      return this._login().join(ROUTE_DIVIDER);
    };
  }
  get "sns-verification"() {
    return () => {
      return this["_sns-verification"]().join(ROUTE_DIVIDER);
    };
  }
  get register() {
    return () => {
      return this._register().join(ROUTE_DIVIDER);
    };
  }

  get "member-management"() {
    return (routeParams?: string) => {
      const filteredRoute = this["_member-management"](routeParams).filter(filterEmptyDynamicRoute);

      return filteredRoute.join(ROUTE_DIVIDER);
    };
  }
  get "schedule-management"() {
    return () => {
      return this["_schedule-management"]().join(ROUTE_DIVIDER);
    };
  }
  get "dayoff-management"() {
    return () => {
      return this["_dayoff-management"]().join(ROUTE_DIVIDER);
    };
  }
  get "fixed-reservation"() {
    return () => {
      return this["_fixed-reservation"]().join(ROUTE_DIVIDER);
    };
  }
  get "select-pt-times"() {
    return (
      routeParams?: string,
      searchParams?: {
        memberId: string | null;
        name: string | null;
      },
    ) => {
      const filteredRoute = this["_select-pt-times"](routeParams).filter(filterEmptyDynamicRoute);
      const beforeSearchParams = filteredRoute.slice(0, filteredRoute.length);
      const queryString = searchParams && generateQueryString(searchParams);

      return queryString
        ? `${beforeSearchParams.join(ROUTE_DIVIDER)}?${queryString}`
        : beforeSearchParams.join(ROUTE_DIVIDER);
    };
  }
  get "pending-reservations"() {
    return (
      routeParams?: string,
      searchParams?: {
        selectedDate: string | null;
        formattedSelectedDate: string | null;
      },
    ) => {
      const filteredRoute =
        this["_pending-reservations"](routeParams).filter(filterEmptyDynamicRoute);
      const beforeSearchParams = filteredRoute.slice(0, filteredRoute.length);
      const queryString = searchParams && generateQueryString(searchParams);

      return queryString
        ? `${beforeSearchParams.join(ROUTE_DIVIDER)}?${queryString}`
        : beforeSearchParams.join(ROUTE_DIVIDER);
    };
  }
  get reservation() {
    return (
      routeParams?: string,
      searchParams?: {
        selectedDate: string | null;
        selectedFormatDate: string | null;
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

  get "my-page"() {
    return () => {
      return this["_my-page"]().join(ROUTE_DIVIDER);
    };
  }
  get "my-information"() {
    return () => {
      return this["_my-information"]().join(ROUTE_DIVIDER);
    };
  }
  get "trainer-code"() {
    return () => {
      return this["_trainer-code"]().join(ROUTE_DIVIDER);
    };
  }
  get "edit-workout-schedule"() {
    return () => {
      return this["_edit-workout-schedule"]().join(ROUTE_DIVIDER);
    };
  }
  get "edit-verificated-phone"() {
    return () => {
      return this["_edit-verificated-phone"]().join(ROUTE_DIVIDER);
    };
  }

  get notification() {
    return (routeParams?: string) => {
      const filteredRoute = this["_notification"](routeParams).filter(filterEmptyDynamicRoute);

      return filteredRoute.join(ROUTE_DIVIDER);
    };
  }
}

const RouteInstance = new ROUTES();

export default RouteInstance;
