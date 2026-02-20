import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let analyticsInitialized = false;
export const setMetaTag = (name:string, content:string, iconSrc:string) => {
  let titleTag = document.querySelector("title");
  if (!titleTag) {
    titleTag = document.createElement("title");
    document.head.appendChild(titleTag);
  }
  titleTag.textContent = name;

  let iconLink = document.querySelector('link[rel="icon"]');
  if(!iconLink)
  {
    iconLink = document.createElement("link");
    iconLink.setAttribute("href", iconSrc);
    iconLink.setAttribute("rel", "icon");
    document.head.appendChild(iconLink);
  }

  /*if(!analyticsInitialized)
  {
    analyticsInitialized = true;

    let analyticsTag = document.createElement("script");
    analyticsTag.setAttribute("id", "google-analytics");
    analyticsTag.setAttribute("async", "");
    analyticsTag.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-6E02GF4Q02");
    document.head.appendChild(analyticsTag);

    let analyticsDataLayer = document.createElement("script");
    analyticsDataLayer.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-6E02GF4Q02');
      `;
    document.head.appendChild(analyticsDataLayer);
  }*/

  const setOrUpdate = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, value);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setOrUpdate('meta[name="description"]', "name", "description");
  setOrUpdate('meta[property="og:title"]', "property", "og:title");
  setOrUpdate('meta[property="og:description"]', "property", "og:description");
}