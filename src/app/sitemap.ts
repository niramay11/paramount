import type { MetadataRoute } from "next";

const BASE_URL = "https://www.myparamountlab.com";

const routes = [
  "",
  "/about",
  "/services",
  "/contact",
  "/test-dictionary",
  "/career",
  "/insurance",
  "/join-us",
  "/laboratory-forms",
  "/test-preparation",
  "/testimonial",
  "/update-billing-insurance",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
  }));
}
