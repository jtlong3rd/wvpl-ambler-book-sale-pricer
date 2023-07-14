import { HeadersFunction, json, LoaderArgs } from "@vercel/remix";

export async function loader(_: LoaderArgs) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return json(null, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
    },
  });
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return loaderHeaders;
};

export { default } from "~/app/components/App";
