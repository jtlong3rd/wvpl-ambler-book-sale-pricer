import { HeadersFunction } from "@vercel/remix";

export const config = {
  runtime: "edge",
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return loaderHeaders;
};

export { default } from "~/app/components/App";
