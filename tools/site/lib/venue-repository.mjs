// 読み出し元（Source）から学会欄（VenueCollection / Venue / VenuePaper）を組み立てる
import { Venue, VenueCollection } from "./venue-models.mjs";

export const VENUES_META = "conferences.json";

export class VenueRepository {
  /** @param {import("./sources.mjs").Source[]} sources */
  constructor(sources) {
    this.sources = sources;
  }

  /** conferences.json を持つ最初の読み出し元を学会欄として読む（無ければ null） */
  load({ log = () => {} } = {}) {
    const src = this.sources.find((s) => s.exists(VENUES_META));
    return src ? this.loadFrom(src, log) : null;
  }

  /** @param {import("./sources.mjs").Source} src */
  loadFrom(src, log = () => {}) {
    const collection = new VenueCollection(src.readJSON(VENUES_META), src.name);
    for (const slug of collection.meta.venues) {
      const metaPath = `${slug}/venue.json`;
      if (!src.exists(metaPath)) {
        log(`warn: venue ${slug} has no venue.json; skipped`);
        continue;
      }
      const spec = src.exists(`${slug}/spec.json`) ? src.readJSON(`${slug}/spec.json`) : { papers: [] };
      const readme = src.exists(`${slug}/README.md`) ? src.readText(`${slug}/README.md`) : "";
      collection.venues.push(new Venue(collection, src.readJSON(metaPath), spec, readme));
    }
    log(`venues: ${collection.venues.length} venues, ${collection.papers.length} papers (${src.name})`);
    return collection;
  }
}
