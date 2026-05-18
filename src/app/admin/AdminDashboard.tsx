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

/* ── Toast ── */
type Toast = { msg: string; type: "success" | "error" } | null;

/* ── Main component ── */
export default function AdminDashboard() {
  const [screen, setScreen] = useState<"login" | "dashboard">("login");
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

  /* Check existing session on mount */
  useEffect(() => {
    fetch("/api/admin/tests")
      .then((r) => { if (r.ok) { setScreen("dashboard"); fetchData(); } })
      .catch(() => {});
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
  }

  /* ── Data ── */
  async function fetchData() {
    const r = await fetch("/api/admin/tests");
    if (!r.ok) return;
    setCategories(await r.json());
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
          Test Directory <span>/</span> Admin
        </div>
        <div className={s.topBarMeta}>{allTests.length} tests</div>
        <button className={s.logoutBtn} onClick={logout}>Sign out</button>
      </div>

      {/* Toolbar */}
      <div className={s.toolbar}>
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

        {/* Category filter */}
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
      </div>

      {/* Table */}
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
            {filtered.length === 0 ? (
              <tr className={s.emptyRow}>
                <td colSpan={7}>No tests found.</td>
              </tr>
            ) : (
              filtered.map((t) => (
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
