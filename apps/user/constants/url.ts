export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? `${process.env.NEXT_PUBLIC_DEV_API_BASE_URL}`
    : `${process.env.NEXT_PUBLIC_PROD_API_BASE_URL}`;

export const BASE_ROUTE_HANDLER_URL =
  process.env.NODE_ENV === "development" ? `http://localhost:3000` : `https://fitlink.biz`;
