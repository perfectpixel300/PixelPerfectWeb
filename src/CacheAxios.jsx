import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const CacheAxios = setupCache(axios, {
  ttl: 1000 * 60 * 5, // cache for 5 minutes
});


export default CacheAxios;
