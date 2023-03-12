import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
// import rtl from "stylis-plugin-rtl";
// NB: A unique `key` is important for it to work!
const options = {
  ltr: { key: "css-en" },
};
export function RtlProvider({ children }) {
  const dir = "ltr";
  const cache = createCache(options[dir]);
  return <CacheProvider value={cache} children={children} />;
}
