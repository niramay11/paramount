"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Footer from "@/component/Footer";
import Pagination from "@/component/Pagination";
import s from "./dictionary.module.css";

const PAGE_SIZE = 10;

/* ── Types ── */
export interface TestEntry {
  id: string;
  code: string;
  name: string;
  subTests: string[];
  specimenTube: string;
  patientPreparation: string;
  minimumVolume: string;
  specimenPreparation: string;
  storageTransport: string;
  stability: string;
  rejectionCriteria: string;
  specialNotes: string;
  approvedFor: string;
  performingLab: string;
  cptCodes: string;
  tatForResult: string;
  methodology: string;
}
export interface TestSection { id: string; name: string; tests: TestEntry[]; }
export interface TestCategory { id: string; name: string; sections: TestSection[]; }

interface FlatTest extends TestEntry {
  category: string;
  categoryId: string;
}

/* ── Tube chip parsing ── */
const TUBE_MAP: Record<string, { label: string; cls: string }> = {
  lav: { label: "LAV", cls: "lav" }, lv: { label: "LAV", cls: "lav" }, lavender: { label: "LAV", cls: "lav" },
  sst: { label: "SST", cls: "sst" },
  gt: { label: "GT", cls: "gt" }, green: { label: "GT", cls: "gt" },
  bt: { label: "BT", cls: "bt" }, blue: { label: "BT", cls: "bt" },
  rt: { label: "RT", cls: "rt" }, red: { label: "RT", cls: "rt" },
  gy: { label: "GREY", cls: "gy" }, grey: { label: "GREY", cls: "gy" }, gray: { label: "GREY", cls: "gy" },
  uc: { label: "URINE", cls: "uc" }, urine: { label: "URINE", cls: "uc" },
  swab: { label: "SWAB", cls: "swab" },
  stl: { label: "STOOL", cls: "stl" },
  nail: { label: "NAIL", cls: "swab" },
  saline: { label: "SALINE", cls: "gy" },
};

function parseTubes(tube: string): { label: string; cls: string }[] {
  if (!tube) return [];
  const lc = tube.toLowerCase();
  if (lc.includes("quantisal") || lc.includes("oral fluid")) return [{ label: "ORAL FLUID", cls: "uc" }];
  if (lc.includes("utm") || lc.includes("vtm")) return [{ label: "UTM/VTM", cls: "rt" }];
  if (lc.includes("thin prep") || lc.includes("thin-prep")) return [{ label: "THIN PREP", cls: "gy" }];
  if (lc.includes("fecal") || lc.includes("copan")) return [{ label: "FECAL SW", cls: "stl" }];
  if (lc.includes("aptima")) return [{ label: "APTIMA", cls: "gt" }];
  if (lc.includes("formalin")) return [{ label: "FORMALIN", cls: "gt" }];
  if (lc.includes("e-swab") || lc.includes("eswab")) return [{ label: "E-SWAB", cls: "swab" }];
  if (lc.includes("breath") || lc.includes("bag")) return [{ label: "BREATH", cls: "gy" }];
  if (lc.includes("stool") || lc === "stl") return [{ label: "STOOL", cls: "stl" }];
  if (lc === "swab" || (lc.includes("swab") && !lc.includes("e-swab"))) return [{ label: "SWAB", cls: "swab" }];

  const parts = lc.split(/[+,]/).map((p) => p.trim()).filter(Boolean);
  const result: { label: string; cls: string }[] = [];
  for (const part of parts) {
    const m = TUBE_MAP[part];
    if (m && !result.some((r) => r.label === m.label)) result.push(m);
  }
  if (result.length > 0) return result.slice(0, 2);
  return [{ label: tube.toUpperCase().slice(0, 9), cls: "gy" }];
}

/* ── Data helpers ── */
function flattenTests(categories: TestCategory[]): FlatTest[] {
  const out: FlatTest[] = [];
  for (const cat of categories) {
    for (const sec of cat.sections) {
      const catLabel =
        cat.id === "blood"
          ? sec.name === "Panels" ? "Panels / Profiles" : sec.name
          : cat.name;
      const catId = cat.id === "blood" ? `blood_${sec.id}` : cat.id;
      for (const t of sec.tests) {
        out.push({ ...t, category: catLabel, categoryId: catId });
      }
    }
  }
  return out;
}

type CategoryGroup = { id: string; label: string; count: number };

function buildCategoryGroups(tests: FlatTest[]): CategoryGroup[] {
  const map = new Map<string, { label: string; count: number }>();
  for (const t of tests) {
    const entry = map.get(t.categoryId);
    if (entry) entry.count++;
    else map.set(t.categoryId, { label: t.category, count: 1 });
  }
  return Array.from(map.entries()).map(([id, v]) => ({ id, label: v.label, count: v.count }));
}

/* ── Legend ── */
const LEGEND = [
  { label: "Lavender (LAV / LV)", cls: "lav", bg: "#f3eafd", border: "#c4b5fd" },
  { label: "SST (Gold / Red-Grey)", cls: "sst", bg: "#fef9c3", border: "#fde047" },
  { label: "UTM / VTM (Viral)", cls: "rt", bg: "#fee2e2", border: "#fca5a5" },
  { label: "Blue Top (BT)", cls: "bt", bg: "#dbeafe", border: "#93c5fd" },
  { label: "Green Top (GT)", cls: "gt", bg: "#dcfce7", border: "#86efac" },
  { label: "Grey Top", cls: "gy", bg: "#f1f5f9", border: "#cbd5e1" },
  { label: "Urine Cup (UC)", cls: "uc", bg: "#fef3c7", border: "#fcd34d" },
  { label: "Swab / E-Swab", cls: "swab", bg: "#f1f5f9", border: "#cbd5e1" },
  { label: "Stool / Fecal", cls: "stl", bg: "#fef3c7", border: "#d6a45c" },
];

const PLACEHOLDER = "Information being added — contact lab for current details.";

/* ── Section heading inside drawer ── */
function DrawerSection({ title }: { title: string }) {
  return <div className={s.drawerSection}>{title}</div>;
}

/* ── Field row — always renders, placeholder when empty ── */
function FieldRow({ label, value }: { label: string; value: string }) {
  const empty = !value?.trim();
  return (
    <div className={s.field}>
      <div className={s.fieldLabel}>{label}</div>
      <div className={empty ? s.fieldEmpty : s.fieldValue}>
        {empty ? PLACEHOLDER : value}
      </div>
    </div>
  );
}

/* ── Tube chip ── */
function TubeChips({ tube }: { tube: string }) {
  const chips = parseTubes(tube);
  if (!chips.length) return null;
  return (
    <div className={s.tubeCell}>
      {chips.map((c, i) => (
        <span key={i} className={`${s.chip} ${s[c.cls] ?? ""}`}>{c.label}</span>
      ))}
    </div>
  );
}

/* ── Main component ── */
export default function DictionaryClient({ categories }: { categories: TestCategory[] }) {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<FlatTest | null>(null);
  const [page, setPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);

  const allTests = useMemo(() => flattenTests(categories), [categories]);
  const catGroups = useMemo(() => buildCategoryGroups(allTests), [allTests]);

  const filtered = useMemo(() => {
    let list = allTests;
    if (activeCatId) list = list.filter((t) => t.categoryId === activeCatId);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q) ||
          t.subTests.some((sub) => sub.toLowerCase().includes(q)) ||
          t.specimenTube.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allTests, activeCatId, query]);

  const panelCount = useMemo(
    () => allTests.filter((t) => t.subTests.filter(Boolean).length > 0).length,
    [allTests]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  /* Keyboard shortcuts */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const selectCat = useCallback((id: string | null) => {
    setActiveCatId(id);
    setQuery("");
    setSelected(null);
    setPage(1);
  }, []);

  const activeLabel = activeCatId
    ? catGroups.find((c) => c.id === activeCatId)?.label ?? "All tests"
    : "All tests";

  return (
    <div className={s.wrapper}>
      {/* ── Hero ── */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.eyebrow}>Reference · Test Directory</p>
          <h1 className={s.heroTitle}>
            Find a test. <em>Order with confidence.</em>
          </h1>
          <p className={s.lede}>
            Complete reference for every assay performed at Paramount Diagnostic
            Lab — specimen requirements, stability, CPT codes, and turnaround
            time in one place.
          </p>
          <div className={s.search}>
            <svg className={s.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveCatId(null); setPage(1); }}
              placeholder="Search by test name or code — e.g. CBC, lipid panel, IA32…"
              autoComplete="off"
            />
          </div>
          <p className={s.searchHint}>
            Press <kbd>/</kbd> to focus search · <kbd>Esc</kbd> to close panel
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className={s.stats}>
        <div className={s.statsInner}>
          <div className={s.stat}>
            <div className={s.statNum}>{allTests.length}</div>
            <div className={s.statLbl}>Total Assays</div>
          </div>
          <div className={s.stat}>
            <div className={s.statNum}>{panelCount}</div>
            <div className={s.statLbl}>Panels &amp; Profiles</div>
          </div>
          <div className={s.stat}>
            <div className={s.statNum}>{categories.length}</div>
            <div className={s.statLbl}>Specialties</div>
          </div>
          <div className={s.stat}>
            <div className={s.statNum}>24–48h</div>
            <div className={s.statLbl}>Typical Turnaround</div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className={s.layout}>
        {/* Sidebar */}
        <aside className={s.sidebar}>
          <h3 className={s.sidebarTitle}>Browse by Category</h3>
          <ul className={s.catList}>
            <li>
              <button
                className={`${s.catBtn} ${activeCatId === null && !query ? s.catBtnActive : ""}`}
                onClick={() => selectCat(null)}
              >
                All tests
                <span className={s.catCount}>{allTests.length}</span>
              </button>
            </li>
            {catGroups.map((cg) => (
              <li key={cg.id}>
                <button
                  className={`${s.catBtn} ${activeCatId === cg.id ? s.catBtnActive : ""}`}
                  onClick={() => selectCat(cg.id)}
                >
                  <span>{cg.label}</span>
                  <span className={s.catCount}>{cg.count}</span>
                </button>
              </li>
            ))}
          </ul>

          <h3 className={s.sidebarTitle}>Tube / Specimen Key</h3>
          <div className={s.legend}>
            {LEGEND.map((l) => (
              <div key={l.cls} className={s.legendRow}>
                <div
                  className={s.legendDot}
                  style={{ background: l.bg, borderColor: l.border }}
                />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Results */}
        <section>
          <div className={s.resultsHead}>
            <h2 className={s.resultsTitle}>{activeLabel}</h2>
            <div className={s.resultsMeta}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              {totalPages > 1 && ` · page ${page} of ${totalPages}`}
            </div>
          </div>

          <div className={s.testList}>
            {filtered.length === 0 ? (
              <div className={s.empty}>No tests found matching &ldquo;{query}&rdquo;</div>
            ) : (
              paged.map((t) => (
                <button
                  key={t.categoryId + t.code + t.name}
                  className={`${s.testRow} ${selected?.code === t.code && selected?.name === t.name ? s.testRowActive : ""}`}
                  onClick={() => setSelected(
                    selected?.code === t.code && selected?.name === t.name ? null : t
                  )}
                >
                  <span className={s.testCode}>{t.code}</span>
                  <span className={s.testName}>
                    {t.name}
                    {t.subTests.filter(Boolean).length > 0 && (
                      <span className={s.panelBadge}>Panel</span>
                    )}
                  </span>
                  <span className={s.testCat}>{t.category}</span>
                  <TubeChips tube={t.specimenTube} />
                  <span className={s.testChev}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                </button>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className={s.paginationWrap}>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => { setPage(p); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              />
            </div>
          )}
        </section>
      </div>

      {/* ── Backdrop ── */}
      <div
        className={`${s.backdrop} ${selected ? s.backdropOpen : ""}`}
        onClick={() => setSelected(null)}
      />

      {/* ── Drawer ── */}
      <aside className={`${s.drawer} ${selected ? s.drawerOpen : ""}`} aria-hidden={!selected}>
        {selected && (
          <>
            <div className={s.drawerHead}>
              <button className={s.drawerClose} onClick={() => setSelected(null)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <div className={s.drawerCodeBig}>{selected.code}</div>
              <h2 className={s.drawerTitle}>{selected.name}</h2>
              <div className={s.drawerMetaRow}>
                {selected.specimenTube && <TubeChips tube={selected.specimenTube} />}
                {selected.tatForResult && (
                  <span className={s.chip} style={{ background: "#f0fdf4", borderColor: "#86efac", color: "#166534" }}>
                    TAT: {selected.tatForResult}
                  </span>
                )}
                {selected.performingLab && (
                  <span className={s.chip}>{selected.performingLab}</span>
                )}
              </div>
            </div>

            <div className={s.drawerBody}>
              {/* Included Tests — only shown when sub-tests exist */}
              {selected.subTests.filter(Boolean).length > 0 && (
                <>
                  <DrawerSection title="Included Tests" />
                  <div className={s.field}>
                    <div className={s.fieldLabel}>Analytes</div>
                    <ul className={s.components}>
                      {selected.subTests.filter(Boolean).map((sub, i) => (
                        <li key={i} className={s.componentItem}>{sub}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Specimen Requirements */}
              <DrawerSection title="Specimen Requirements" />
              <FieldRow label="Specimen Tube" value={selected.specimenTube} />
              <FieldRow label="Minimum Volume" value={selected.minimumVolume} />
              <FieldRow
                label="Patient Preparation"
                value={selected.patientPreparation || "No special preparation required."}
              />
              <FieldRow label="Specimen Prep" value={selected.specimenPreparation} />

              {/* Handling & Stability */}
              <DrawerSection title="Handling &amp; Stability" />
              <FieldRow label="Storage / Transport" value={selected.storageTransport} />
              <FieldRow label="Stability" value={selected.stability} />
              <div className={s.field}>
                <div className={s.fieldLabel}>Rejection Criteria</div>
                {selected.rejectionCriteria?.trim() ? (
                  <div className={s.infoNote}>{selected.rejectionCriteria}</div>
                ) : (
                  <div className={s.fieldEmpty}>{PLACEHOLDER}</div>
                )}
              </div>

              {/* Reporting */}
              <DrawerSection title="Reporting" />
              <FieldRow label="Turnaround Time" value={selected.tatForResult} />
              <FieldRow label="Methodology" value={selected.methodology} />
              <FieldRow label="CPT Code(s)" value={selected.cptCodes} />
              <FieldRow label="Performing Lab" value={selected.performingLab} />

              {/* Notices — only shown when there is restriction or notes data */}
              {(selected.approvedFor?.trim() || selected.specialNotes?.trim()) && (
                <>
                  <DrawerSection title="Notices" />
                  {selected.approvedFor?.trim() && (
                    <div className={s.field}>
                      <div className={s.fieldLabel}>Geographic Restriction</div>
                      <div className={s.infoNote}>{selected.approvedFor}</div>
                    </div>
                  )}
                  {selected.specialNotes?.trim() && (
                    <FieldRow label="Special Notes" value={selected.specialNotes} />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </aside>

      <Footer />
    </div>
  );
}
