
export function fetchJson(url, options = {}) {
  const overridedOptions = Object.assign(options, {
    headers: { "Content-Type": "application/json; charset=utf-8", }
  });

  return fetch(url, overridedOptions)
    .then(response => response.json());
}