// 読み出し元（Source）から Field / Theme / Paper を組み立てる
import { Field, Theme } from "./models.mjs";

export const FIELD_META = "field.json";

export class FieldRepository {
  /** @param {import("./sources.mjs").Source[]} sources */
  constructor(sources) {
    this.sources = sources;
  }

  /** field.json を持つ読み出し元だけを分野として読み込み、order 順に並べる */
  loadFields({ log = () => {} } = {}) {
    const fields = [];
    for (const src of this.sources) {
      if (!src.exists(FIELD_META)) continue;
      fields.push(this.loadField(src, log));
    }
    const seen = new Set();
    return fields
      .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug))
      .filter((f) => (seen.has(f.slug) ? (log(`skip duplicate field ${f.slug} (${f.branch})`), false) : seen.add(f.slug)));
  }

  /** @param {import("./sources.mjs").Source} src */
  loadField(src, log = () => {}) {
    const field = new Field(src.readJSON(FIELD_META), src.name);
    for (const meta of field.meta.themes) {
      const specPath = `${meta.slug}/spec.json`;
      if (!src.exists(specPath)) {
        log(`warn: ${field.slug}/${meta.slug} has no spec.json; skipped`);
        continue;
      }
      const readmePath = `${meta.slug}/README.md`;
      const readme = src.exists(readmePath) ? src.readText(readmePath) : "";
      field.themes.push(new Theme(field, meta, src.readJSON(specPath), readme));
    }
    log(`field ${field.slug}: ${field.themes.length} themes, ${field.papers.length} papers (${src.name})`);
    return field;
  }
}
