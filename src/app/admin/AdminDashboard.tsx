"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import s from "./admin.module.css";

/* ── Types ── */
interface TestEntry {
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
interface Section { id: string; name: string; tests: TestEntry[]; }
interface Category { id: string; name: string; sections: Section[]; }

interface FlatTest extends TestEntry {
  _uid: string;
  categoryId: string;
  categoryName: string;
  sectionId: string;
  sectionName: string;
}

interface InsuranceProvider {
  id: string;
  name: string;
  category: "featured" | "specialty";
  sort_order: number;
  image_url?: string | null;
  storage_path?: string | null;
}
interface InsForm {
  name: string;
  category: "featured" | "specialty";
  sort_order: number;
}

interface FormState {
  categoryId: string;
  sectionId: string;
  sectionName: string;
  code: string;
  name: string;
  subTestsText: string;
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

/* ── Helpers ── */
function makeUid(catId: string, secId: string, code: string, name: string): string {
  const str = `${catId}||${secId}||${code}||${name}`;
  // browser-safe base64url (UTF-8 safe via percent-encoding roundtrip)
  const b64 = btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16))
    )
  );
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function flattenCategories(cats: Category[]): FlatTest[] {
  const out: FlatTest[] = [];
  for (const cat of cats) {
    for (const sec of cat.sections) {
      for (const t of sec.tests) {
        out.push({
          ...t,
          _uid: makeUid(cat.id, sec.id, t.code, t.name),
          categoryId: cat.id,
          categoryName: cat.name,
          sectionId: sec.id,
          sectionName: sec.name,
        });
      }
    }
  }
  return out;
}

function testToForm(t: FlatTest): FormState {
  return {
    categoryId: t.categoryId,
    sectionId: t.sectionId,
    sectionName: t.sectionName,
    code: t.code,
    name: t.name,
    subTestsText: t.subTests.filter(Boolean).join("\n"),
    specimenTube: t.specimenTube,
    patientPreparation: t.patientPreparation,
    minimumVolume: t.minimumVolume,
    specimenPreparation: t.specimenPreparation,
    storageTransport: t.storageTransport,
    stability: t.stability,
    rejectionCriteria: t.rejectionCriteria,
    specialNotes: t.specialNotes,
    approvedFor: t.approvedFor,
    performingLab: t.performingLab,
    cptCodes: t.cptCodes,
    tatForResult: t.tatForResult,
    methodology: t.methodology,
  };
}

function formToTest(f: FormState): TestEntry {
  return {
    id: f.code,
    code: f.code.trim(),
    name: f.name.trim(),
    subTests: f.subTestsText.split("\n").map((s) => s.trim()).filter(Boolean),
    specimenTube: f.specimenTube.trim(),
    patientPreparation: f.patientPreparation.trim(),
    minimumVolume: f.minimumVolume.trim(),
    specimenPreparation: f.specimenPreparation.trim(),
    storageTransport: f.storageTransport.trim(),
    stability: f.stability.trim(),
    rejectionCriteria: f.rejectionCriteria.trim(),
    specialNotes: f.specialNotes.trim(),
    approvedFor: f.approvedFor.trim(),
    performingLab: f.performingLab.trim(),
    cptCodes: f.cptCodes.trim(),
    tatForResult: f.tatForResult.trim(),
    methodology: f.methodology.trim(),
  };
}

const EMPTY_FORM: FormState = {
  categoryId: "blood", sectionId: "panels", sectionName: "Panels",
  code: "", name: "", subTestsText: "",
  specimenTube: "", patientPreparation: "", minimumVolume: "",
  specimenPreparation: "", storageTransport: "", stability: "",
  rejectionCriteria: "", specialNotes: "", approvedFor: "",
  performingLab: "", cptCodes: "", tatForResult: "", methodology: "",
};

const INS_EMPTY: InsForm = { name: "", category: "featured", sort_order: 0 };

/* ── Toast ── */
type Toast = { msg: string; type: "success" | "error" } | null;

/* ── Main component ── */
export default function AdminDashboard() {
  const [screen, setScreen] = useState<"checking" | "login" | "dashboard">("checking");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingUid, setEditingUid] = useState<string | null>(null); // null = new test
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [deleteUid, setDeleteUid] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  /* ── Pagination ── */
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(25);

  /* ── Panel ── */
  const [panel, setPanel] = useState<"tests" | "insurance">("tests");

  /* ── Insurance ── */
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProvider[]>([]);
  const [insDrawerOpen, setInsDrawerOpen] = useState(false);
  const [insEditId, setInsEditId] = useState<string | null>(null);
  const [insForm, setInsForm] = useState<InsForm>(INS_EMPTY);
  const [insDeleteId, setInsDeleteId] = useState<string | null>(null);
  const [insImageFile, setInsImageFile] = useState<File | null>(null);
  const [insImagePreview, setInsImagePreview] = useState<string | null>(null);
  const [insRemoveImage, setInsRemoveImage] = useState(false);

  /* Check existing session on mount — avoids false "logged out" on hard refresh */
  useEffect(() => {
    fetch("/api/admin/tests")
      .then((r) => {
        if (r.ok) { setScreen("dashboard"); fetchData(); fetchInsurance(); }
        else       { setScreen("login"); }
      })
      .catch(() => setScreen("login"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Auto-dismiss toast */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  /* Close drawer on Escape */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawerOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
  }, []);

  /* ── Auth ── */
  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      const r = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!r.ok) { setLoginError("Incorrect password. Try again."); return; }
      setScreen("dashboard");
      await fetchData();
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setScreen("login");
    setPassword("");
    setCategories([]);
    setInsuranceProviders([]);
  }

  /* ── Data ── */
  async function fetchData() {
    const r = await fetch("/api/admin/tests");
    if (!r.ok) return;
    setCategories(await r.json());
  }

  async function fetchInsurance() {
    const r = await fetch("/api/admin/insurance");
    if (!r.ok) return;
    setInsuranceProviders(await r.json());
  }

  /* ── Flat tests for table ── */
  const allTests = useMemo(() => flattenCategories(categories), [categories]);
  const filtered = useMemo(() => {
    let list = allTests;
    if (filterCat !== "all") list = list.filter((t) => t.categoryId === filterCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q) ||
          t.performingLab.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allTests, search, filterCat]);

  /* Reset to page 1 whenever filter or search changes */
  useEffect(() => { setPage(1); }, [search, filterCat, pageSize]);

  /* ── Paginated slice ── */
  const totalPages  = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safeePage   = Math.min(page, totalPages);
  const pageStart   = (safeePage - 1) * pageSize;
  const pageRows    = filtered.slice(pageStart, pageStart + pageSize);

  /* ── Sections for current category in form ── */
  const formSections = useMemo(() => {
    const cat = categories.find((c) => c.id === form.categoryId);
    return cat?.sections ?? [];
  }, [categories, form.categoryId]);

  /* ── Open drawer ── */
  function openAdd() {
    setForm(EMPTY_FORM);
    setEditingUid(null);
    setDrawerOpen(true);
  }
  function openEdit(t: FlatTest) {
    setForm(testToForm(t));
    setEditingUid(t._uid);
    setDrawerOpen(true);
  }
  function closeDrawer() { setDrawerOpen(false); }

  /* Update a single form field */
  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // When category changes, reset section to first available
      if (key === "categoryId") {
        const cat = categories.find((c) => c.id === value);
        const firstSec = cat?.sections[0];
        next.sectionId = firstSec?.id ?? "";
        next.sectionName = firstSec?.name ?? "";
      }
      if (key === "sectionId") {
        const cat = categories.find((c) => c.id === next.categoryId);
        const sec = cat?.sections.find((s) => s.id === value);
        next.sectionName = sec?.name ?? String(value);
      }
      return next;
    });
  }

  /* ── Save (create or update) ── */
  async function handleSave() {
    if (!form.code.trim() || !form.name.trim()) {
      showToast("Code and Name are required.", "error");
      return;
    }
    setSaving(true);
    try {
      const test = formToTest(form);
      let r: Response;
      if (editingUid) {
        r = await fetch(`/api/admin/tests/${editingUid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newCategoryId: form.categoryId,
            newSectionId: form.sectionId,
            newSectionName: form.sectionName,
            test,
          }),
        });
      } else {
        r = await fetch("/api/admin/tests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            categoryId: form.categoryId,
            sectionId: form.sectionId,
            sectionName: form.sectionName,
            test,
          }),
        });
      }
      if (!r.ok) { showToast("Save failed. Try again.", "error"); return; }
      await fetchData();
      setDrawerOpen(false);
      showToast(editingUid ? "Test updated." : "Test added.");
    } finally {
      setSaving(false);
    }
  }

  /* ── Delete ── */
  async function handleDelete(uid: string) {
    const r = await fetch(`/api/admin/tests/${uid}`, { method: "DELETE" });
    if (!r.ok) { showToast("Delete failed.", "error"); return; }
    await fetchData();
    setDeleteUid(null);
    showToast("Test deleted.");
  }

  /* ── Insurance Save ── */
  async function handleInsSave() {
    if (!insForm.name.trim()) { showToast("Name is required.", "error"); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", insForm.name.trim());
      fd.append("category", insForm.category);
      fd.append("sort_order", String(insForm.sort_order));
      if (insImageFile) fd.append("image", insImageFile);
      if (insRemoveImage) fd.append("remove_image", "true");

      const url = insEditId ? `/api/admin/insurance/${insEditId}` : "/api/admin/insurance";
      const r = await fetch(url, { method: insEditId ? "PUT" : "POST", body: fd });
      if (!r.ok) { showToast("Save failed.", "error"); return; }
      await fetchInsurance();
      setInsDrawerOpen(false);
      setInsImageFile(null);
      setInsImagePreview(null);
      setInsRemoveImage(false);
      showToast(insEditId ? "Provider updated." : "Provider added.");
    } finally {
      setSaving(false);
    }
  }

  /* ── Insurance Delete ── */
  async function handleInsDelete(id: string) {
    const r = await fetch(`/api/admin/insurance/${id}`, { method: "DELETE" });
    if (!r.ok) { showToast("Delete failed.", "error"); return; }
    await fetchInsurance();
    setInsDeleteId(null);
    showToast("Provider deleted.");
  }

  /* ═══════════════════ CHECKING SCREEN ═══════════════════ */
  if (screen === "checking") {
    return (
      <div className={s.wrap} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#6b7280", letterSpacing: "0.06em" }}>
          Verifying session…
        </p>
      </div>
    );
  }

  /* ═══════════════════ LOGIN SCREEN ═══════════════════ */
  if (screen === "login") {
    return (
      <div className={s.wrap}>
        <div className={s.loginWrap}>
          <form className={s.loginCard} onSubmit={login}>
            <p className={s.loginEyebrow}>Paramount Diagnostic Lab</p>
            <h1 className={s.loginTitle}>Admin Access</h1>
            <p className={s.loginSub}>Enter your admin password to manage the test directory.</p>
            <label className={s.loginLabel} htmlFor="pwd">Password</label>
            <input
              id="pwd"
              type="password"
              className={s.loginInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              autoComplete="current-password"
            />
            {loginError && <div className={s.loginError}>{loginError}</div>}
            <button className={s.loginBtn} type="submit" disabled={loading || !password}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ═══════════════════ DASHBOARD ═══════════════════ */
  return (
    <div className={s.wrap}>
      {/* Top bar */}
      <div className={s.topBar}>
        <div className={s.topBarBrand}>
          Paramount <span>/</span> Admin
        </div>
        <div className={s.panelTabs}>
          <button
            className={`${s.panelTab} ${panel === "tests" ? s.panelTabActive : ""}`}
            onClick={() => setPanel("tests")}
          >
            Tests
          </button>
          <button
            className={`${s.panelTab} ${panel === "insurance" ? s.panelTabActive : ""}`}
            onClick={() => setPanel("insurance")}
          >
            Insurance
          </button>
        </div>
        <div className={s.topBarMeta}>
          {panel === "tests" ? `${allTests.length} tests` : `${insuranceProviders.length} providers`}
        </div>
        <a href="/test-dictionary" target="_blank" rel="noopener noreferrer" className={s.backLink}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Live
        </a>
        <button className={s.logoutBtn} onClick={logout}>Sign out</button>
      </div>

      {/* Toolbar */}
      <div className={s.toolbar}>
        {panel === "tests" ? (
          <>
            <div className={s.searchWrap}>
              <svg className={s.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input
                className={s.searchInput}
                type="text"
                placeholder="Search by name, code, lab…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className={s.formSelect}
              style={{ width: 180 }}
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <button className={s.addBtn} onClick={openAdd}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Test
            </button>
          </>
        ) : (
          <button className={s.addBtn} onClick={() => { setInsForm(INS_EMPTY); setInsEditId(null); setInsImageFile(null); setInsImagePreview(null); setInsRemoveImage(false); setInsDrawerOpen(true); }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Provider
          </button>
        )}
      </div>

      {/* Test Directory Table */}
      {panel === "tests" && (
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead className={s.thead}>
            <tr>
              <th>Code</th>
              <th>Test Name</th>
              <th>Category / Section</th>
              <th>Specimen Tube</th>
              <th>Performing Lab</th>
              <th>TAT</th>
              <th style={{ width: 160 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr className={s.emptyRow}>
                <td colSpan={7}>No tests found.</td>
              </tr>
            ) : (
              pageRows.map((t) => (
                <tr key={t._uid} className={s.tr}>
                  <td className={s.td}><span className={s.codeChip}>{t.code}</span></td>
                  <td className={s.td}>
                    <div className={s.testName}>{t.name}</div>
                    {t.subTests.filter(Boolean).length > 0 && (
                      <div className={s.catLabel}>{t.subTests.filter(Boolean).length} analytes</div>
                    )}
                  </td>
                  <td className={s.td}>
                    <div className={s.testName}>{t.categoryName}</div>
                    <div className={s.catLabel}>{t.sectionName}</div>
                  </td>
                  <td className={s.td}><span className={s.catLabel}>{t.specimenTube || "—"}</span></td>
                  <td className={s.td}><span className={s.catLabel}>{t.performingLab || "—"}</span></td>
                  <td className={s.td}><span className={s.catLabel}>{t.tatForResult || "—"}</span></td>
                  <td className={s.td}>
                    {deleteUid === t._uid ? (
                      <div className={s.confirmRow}>
                        <span className={s.confirmText}>Delete?</span>
                        <button className={s.confirmYes} onClick={() => handleDelete(t._uid)}>Yes</button>
                        <button className={s.confirmNo} onClick={() => setDeleteUid(null)}>No</button>
                      </div>
                    ) : (
                      <div className={s.actions}>
                        <a
                          href={`/test-dictionary?search=${encodeURIComponent(t.code)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={s.viewBtn}
                          title="View on public test directory"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          View
                        </a>
                        <button className={s.editBtn} onClick={() => openEdit(t)}>Edit</button>
                        <button className={s.deleteBtn} onClick={() => setDeleteUid(t._uid)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      )}

      {/* Insurance Table */}
      {panel === "insurance" && (
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead className={s.thead}>
              <tr>
                <th style={{ width: 52 }}>Logo</th>
                <th>Name</th>
                <th>Category</th>
                <th>Sort Order</th>
                <th style={{ width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {insuranceProviders.length === 0 ? (
                <tr className={s.emptyRow}>
                  <td colSpan={5}>No providers yet. Add one above.</td>
                </tr>
              ) : (
                insuranceProviders.map((p) => (
                  <tr key={p.id} className={s.tr}>
                    <td className={s.td}>
                      {p.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image_url} alt={p.name} style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 4, background: "#f3f4f6" }} />
                      ) : (
                        <div style={{ width: 36, height: 36, borderRadius: 4, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className={s.td}><div className={s.testName}>{p.name}</div></td>
                    <td className={s.td}>
                      <span className={p.category === "featured" ? s.categoryFeatured : s.categorySpecialty}>
                        {p.category === "featured" ? "Featured" : "Specialty"}
                      </span>
                    </td>
                    <td className={s.td}><span className={s.catLabel}>{p.sort_order}</span></td>
                    <td className={s.td}>
                      {insDeleteId === p.id ? (
                        <div className={s.confirmRow}>
                          <span className={s.confirmText}>Delete?</span>
                          <button className={s.confirmYes} onClick={() => handleInsDelete(p.id)}>Yes</button>
                          <button className={s.confirmNo} onClick={() => setInsDeleteId(null)}>No</button>
                        </div>
                      ) : (
                        <div className={s.actions}>
                          <button
                            className={s.editBtn}
                            onClick={() => {
                              setInsForm({ name: p.name, category: p.category, sort_order: p.sort_order });
                              setInsEditId(p.id);
                              setInsImageFile(null);
                              setInsImagePreview(p.image_url ?? null);
                              setInsRemoveImage(false);
                              setInsDrawerOpen(true);
                            }}
                          >Edit</button>
                          <button className={s.deleteBtn} onClick={() => setInsDeleteId(p.id)}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}


      {/* ── Pagination bar ── */}
      {panel === "tests" && filtered.length > 0 && (
        <div className={s.pagination}>
          <span className={s.pageInfo}>
            {pageStart + 1}–{Math.min(pageStart + pageSize, filtered.length)} of {filtered.length} tests
          </span>

          <div className={s.pageControls}>
            <button
              className={s.pageBtn}
              onClick={() => setPage(1)}
              disabled={safeePage === 1}
              aria-label="First page"
            >
              «
            </button>
            <button
              className={s.pageBtn}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={safeePage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>

            {/* Page number pills */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(n => n === 1 || n === totalPages || Math.abs(n - safeePage) <= 1)
              .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                if (idx > 0 && n - (arr[idx - 1] as number) > 1) acc.push("…");
                acc.push(n);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "…" ? (
                  <span key={`ellipsis-${idx}`} className={s.pageEllipsis}>…</span>
                ) : (
                  <button
                    key={item}
                    className={`${s.pageBtn} ${item === safeePage ? s.pageBtnActive : ""}`}
                    onClick={() => setPage(item as number)}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              className={s.pageBtn}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={safeePage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
            <button
              className={s.pageBtn}
              onClick={() => setPage(totalPages)}
              disabled={safeePage === totalPages}
              aria-label="Last page"
            >
              »
            </button>
          </div>

          <select
            className={s.pageSizeSelect}
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            aria-label="Rows per page"
          >
            {[10, 25, 50, 100].map(n => (
              <option key={n} value={n}>{n} / page</option>
            ))}
          </select>
        </div>
      )}

      {/* ── Add/Edit drawer ── */}
      {drawerOpen && (
        <>
          <div className={s.backdrop} onClick={closeDrawer} />
          <div className={s.drawer}>
            <div className={s.drawerHead}>
              <div>
                <h2 className={s.drawerHeadTitle}>
                  {editingUid ? "Edit Test" : "Add New Test"}
                </h2>
                <p className={s.drawerHeadSub}>
                  {editingUid ? `Editing: ${form.code} — ${form.name}` : "Fill in the details below"}
                </p>
              </div>
              <button className={s.drawerCloseBtn} onClick={closeDrawer} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={s.drawerBody}>
              {/* ── Basic Info ── */}
              <div className={s.formSection}>Basic Info</div>
              <div className={s.formGrid}>
                <div className={s.formField}>
                  <label className={s.formLabel}>Category</label>
                  <select
                    className={s.formSelect}
                    value={form.categoryId}
                    onChange={(e) => setField("categoryId", e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className={s.formField}>
                  <label className={s.formLabel}>Section</label>
                  {formSections.length > 0 ? (
                    <select
                      className={s.formSelect}
                      value={form.sectionId}
                      onChange={(e) => setField("sectionId", e.target.value)}
                    >
                      {formSections.map((sec) => (
                        <option key={sec.id} value={sec.id}>{sec.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className={s.formInput}
                      value={form.sectionName}
                      onChange={(e) => {
                        setField("sectionId", e.target.value.toLowerCase().replace(/\s+/g, "_"));
                        setField("sectionName", e.target.value);
                      }}
                      placeholder="Section name"
                    />
                  )}
                </div>
                <div className={s.formField}>
                  <label className={s.formLabel}>Code *</label>
                  <input
                    className={s.formInput}
                    value={form.code}
                    onChange={(e) => setField("code", e.target.value.toUpperCase())}
                    placeholder="e.g. PE10"
                  />
                </div>
                <div className={`${s.formField} ${s.formGridFull}`}>
                  <label className={s.formLabel}>Test Name *</label>
                  <input
                    className={s.formInput}
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="e.g. ANEMIA PROFILE"
                  />
                </div>
              </div>

              {/* ── Included Tests ── */}
              <div className={s.formSection}>Included Tests / Analytes</div>
              <div className={s.formField}>
                <label className={s.formLabel}>Analytes (one per line)</label>
                <textarea
                  className={s.formTextarea}
                  style={{ minHeight: 100 }}
                  value={form.subTestsText}
                  onChange={(e) => setField("subTestsText", e.target.value)}
                  placeholder={"Iron\nUIBC\nTIBC\nVitamin B12"}
                />
                <span className={s.formHint}>Leave empty for individual tests. One analyte per line.</span>
              </div>

              {/* ── Specimen Requirements ── */}
              <div className={s.formSection}>Specimen Requirements</div>
              <div className={s.formGrid}>
                <div className={s.formField}>
                  <label className={s.formLabel}>Specimen Tube</label>
                  <input
                    className={s.formInput}
                    value={form.specimenTube}
                    onChange={(e) => setField("specimenTube", e.target.value)}
                    placeholder="e.g. SST, LAV+SST"
                  />
                </div>
                <div className={s.formField}>
                  <label className={s.formLabel}>Minimum Volume</label>
                  <input
                    className={s.formInput}
                    value={form.minimumVolume}
                    onChange={(e) => setField("minimumVolume", e.target.value)}
                    placeholder="e.g. 4 mL"
                  />
                </div>
                <div className={`${s.formField} ${s.formGridFull}`}>
                  <label className={s.formLabel}>Patient Preparation</label>
                  <textarea
                    className={s.formTextarea}
                    value={form.patientPreparation}
                    onChange={(e) => setField("patientPreparation", e.target.value)}
                    placeholder="e.g. Fasting 8-12 hours before collection"
                  />
                </div>
                <div className={`${s.formField} ${s.formGridFull}`}>
                  <label className={s.formLabel}>Specimen Preparation</label>
                  <textarea
                    className={s.formTextarea}
                    value={form.specimenPreparation}
                    onChange={(e) => setField("specimenPreparation", e.target.value)}
                    placeholder="Instructions for collecting/handling the specimen"
                  />
                </div>
              </div>

              {/* ── Handling & Stability ── */}
              <div className={s.formSection}>Handling &amp; Stability</div>
              <div className={s.formGrid}>
                <div className={`${s.formField} ${s.formGridFull}`}>
                  <label className={s.formLabel}>Storage / Transport</label>
                  <textarea
                    className={s.formTextarea}
                    value={form.storageTransport}
                    onChange={(e) => setField("storageTransport", e.target.value)}
                    placeholder="e.g. Store and transport at room temperature"
                  />
                </div>
                <div className={s.formField}>
                  <label className={s.formLabel}>Stability</label>
                  <input
                    className={s.formInput}
                    value={form.stability}
                    onChange={(e) => setField("stability", e.target.value)}
                    placeholder="e.g. 24-48 hours"
                  />
                </div>
                <div className={`${s.formField} ${s.formGridFull}`}>
                  <label className={s.formLabel}>Rejection Criteria</label>
                  <textarea
                    className={s.formTextarea}
                    value={form.rejectionCriteria}
                    onChange={(e) => setField("rejectionCriteria", e.target.value)}
                    placeholder="Conditions under which the specimen will be rejected"
                  />
                </div>
              </div>

              {/* ── Reporting ── */}
              <div className={s.formSection}>Reporting</div>
              <div className={s.formGrid}>
                <div className={s.formField}>
                  <label className={s.formLabel}>Performing Lab</label>
                  <input
                    className={s.formInput}
                    value={form.performingLab}
                    onChange={(e) => setField("performingLab", e.target.value)}
                    placeholder="e.g. Paramount diagnostic Lab"
                  />
                </div>
                <div className={s.formField}>
                  <label className={s.formLabel}>CPT Code(s)</label>
                  <input
                    className={s.formInput}
                    value={form.cptCodes}
                    onChange={(e) => setField("cptCodes", e.target.value)}
                    placeholder="e.g. 85025, 85027"
                  />
                </div>
                <div className={s.formField}>
                  <label className={s.formLabel}>TAT for Result</label>
                  <input
                    className={s.formInput}
                    value={form.tatForResult}
                    onChange={(e) => setField("tatForResult", e.target.value)}
                    placeholder="e.g. 24-48 hours"
                  />
                </div>
                <div className={s.formField}>
                  <label className={s.formLabel}>Methodology</label>
                  <input
                    className={s.formInput}
                    value={form.methodology}
                    onChange={(e) => setField("methodology", e.target.value)}
                    placeholder="e.g. PCR, ELISA"
                  />
                </div>
              </div>

              {/* ── Notices ── */}
              <div className={s.formSection}>Notices</div>
              <div className={s.formGrid}>
                <div className={s.formField}>
                  <label className={s.formLabel}>Approved For</label>
                  <input
                    className={s.formInput}
                    value={form.approvedFor}
                    onChange={(e) => setField("approvedFor", e.target.value)}
                    placeholder="e.g. Not approved for NY state"
                  />
                </div>
                <div className={`${s.formField} ${s.formGridFull}`}>
                  <label className={s.formLabel}>Special Notes</label>
                  <textarea
                    className={s.formTextarea}
                    value={form.specialNotes}
                    onChange={(e) => setField("specialNotes", e.target.value)}
                    placeholder="Any additional notes for ordering providers"
                  />
                </div>
              </div>
            </div>

            <div className={s.drawerFooter}>
              <button className={s.cancelBtn} onClick={closeDrawer}>Cancel</button>
              <button className={s.saveBtn} onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : editingUid ? "Save Changes" : "Add Test"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Insurance drawer ── */}
      {insDrawerOpen && (
        <>
          <div className={s.backdrop} onClick={() => setInsDrawerOpen(false)} />
          <div className={s.drawer}>
            <div className={s.drawerHead}>
              <div>
                <h2 className={s.drawerHeadTitle}>
                  {insEditId ? "Edit Provider" : "Add Provider"}
                </h2>
                <p className={s.drawerHeadSub}>
                  {insEditId ? `Editing: ${insForm.name}` : "Fill in the details below"}
                </p>
              </div>
              <button className={s.drawerCloseBtn} onClick={() => { setInsDrawerOpen(false); setInsImageFile(null); setInsImagePreview(null); setInsRemoveImage(false); }} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className={s.drawerBody}>
              <div className={s.formSection}>Provider Details</div>
              <div className={s.formGrid}>
                <div className={`${s.formField} ${s.formGridFull}`}>
                  <label className={s.formLabel}>Name *</label>
                  <input
                    className={s.formInput}
                    value={insForm.name}
                    onChange={(e) => setInsForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. United Healthcare"
                    autoFocus
                  />
                </div>
                <div className={s.formField}>
                  <label className={s.formLabel}>Category</label>
                  <select
                    className={s.formSelect}
                    value={insForm.category}
                    onChange={(e) => setInsForm((f) => ({ ...f, category: e.target.value as "featured" | "specialty" }))}
                  >
                    <option value="featured">Featured National &amp; Regional</option>
                    <option value="specialty">Specialty &amp; Network Plans</option>
                  </select>
                </div>
                <div className={s.formField}>
                  <label className={s.formLabel}>Sort Order</label>
                  <input
                    type="number"
                    className={s.formInput}
                    value={insForm.sort_order}
                    onChange={(e) => setInsForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
                    min={0}
                  />
                  <span className={s.formHint}>Lower numbers appear first.</span>
                </div>
                <div className={`${s.formField} ${s.formGridFull}`}>
                  <label className={s.formLabel}>Logo / Image (optional)</label>
                  {insImagePreview && !insRemoveImage ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={insImagePreview} alt="preview" style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 6, border: "1px solid #e5e7eb", background: "#f9fafb" }} />
                      <button
                        type="button"
                        className={s.deleteBtn}
                        onClick={() => { setInsRemoveImage(true); setInsImageFile(null); setInsImagePreview(null); }}
                      >Remove</button>
                    </div>
                  ) : null}
                  <input
                    type="file"
                    accept="image/*"
                    className={s.fileInput}
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      setInsImageFile(f);
                      setInsRemoveImage(false);
                      if (f) setInsImagePreview(URL.createObjectURL(f));
                    }}
                  />
                  <span className={s.formHint}>PNG, JPG, SVG, or WebP. Shown as logo on the insurance page.</span>
                </div>
              </div>
            </div>
            <div className={s.drawerFooter}>
              <button className={s.cancelBtn} onClick={() => { setInsDrawerOpen(false); setInsImageFile(null); setInsImagePreview(null); setInsRemoveImage(false); }}>Cancel</button>
              <button className={s.saveBtn} onClick={handleInsSave} disabled={saving}>
                {saving ? "Saving…" : insEditId ? "Save Changes" : "Add Provider"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className={`${s.toast} ${toast.type === "error" ? s.toastError : s.toastSuccess}`}>
          {toast.type === "success" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
            </svg>
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
