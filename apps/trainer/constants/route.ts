/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-explicit-any */

// export const ROUTES = {
//   ROOT: "/schedule-management",
//   RESERVATION: "/reservation",
//   FIXED_RESERVATION: "/fixed-reservation",
//   SELECT_PT_TIMES: "/select-pt-times",
//   DATOFF_MANAGEMENT: "/dayoff-management",
//   PENDING_RESERVATIONS: "/pending-reservations",
// };

/**
 * 라우트 컨벤션
 * private 변수들은 접두사로 "_"를 붙인다.
 * 라우트의 Key는 소문자로 현재 app 디렉토리 내 페이지 네이밍과 동일하게 짓는다.
 */

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
        memberInformation: string | null;
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
        members: string | null;
        selectedDate: string | null;
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
