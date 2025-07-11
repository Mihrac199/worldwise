export const BASE_URL = "http://localhost:9000";

export const ROUTE_CİTİES = "cities";

export function convertToEmoji(countryCode) {

     const codePoints = countryCode
          .toUpperCase()
          .split("")
          .map((char) => 127397 + char.charCodeAt());
     return String.fromCodePoint(...codePoints);

};

export const formatDateV1 = (date) =>
     new Intl.DateTimeFormat("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
     }).format(new Date(date));

export const formatDateV2 = (date) =>
     new Intl.DateTimeFormat("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
          weekday: "long",
     }).format(new Date(date));