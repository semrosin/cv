const homeSections = new Set(["About", "Works", "Contacts"]);

export function parseHashRoute(hash = "") {
  const route = hash.startsWith("#") ? hash.slice(1) : hash;

  if (route === "" || route === "/") {
    return { kind: "home", section: null };
  }

  if (homeSections.has(route)) {
    return { kind: "home", section: route };
  }

  const projectMatch = route.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    return { kind: "project", slug: decodeURIComponent(projectMatch[1]) };
  }

  return { kind: "notFound" };
}

export function createProjectHash(slug) {
  return `#/projects/${encodeURIComponent(slug)}`;
}
