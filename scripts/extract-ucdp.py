"""Make the dated UCDP extract used for conflict exposure.

Run by hand when refreshing the data (the raw files are not committed):

    python -I scripts/extract-ucdp.py <GEDEvent_v26_1.csv> <candidate.csv> <extract-date YYYY-MM-DD>

Inputs: the UCDP Georeferenced Event Dataset (GED) global CSV and the UCDP
Candidate Events CSV for the months after GED ends, both from
https://ucdp.uu.se/downloads/ (CC BY 4.0).

Output (committed): data/ucdp/ucdp-extract.csv with every event that lies
within EXTRACT_RADIUS_KM of a plant and inside the window, and
data/ucdp/extract-meta.json describing the extract. The window is the
WINDOW_MONTHS months that end on the last event date in the Candidate file.
Events with where_prec 6 (country-level) or 7 (international waters) are
dropped: their coordinates are not event locations.
"""
import csv
import json
import math
import os
import re
import sys
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXTRACT_RADIUS_KM = 150  # wider than the 100 km test so the threshold can be changed without re-extracting
WINDOW_MONTHS = 24
GED_URL = "https://ucdp.uu.se/downloads/ged/ged261-csv.zip"
CANDIDATE_URL = "https://ucdp.uu.se/downloads/candidateged/GEDEvent_v26_01_26_09.csv"
FIELDS = ["dataset", "id", "date_start", "date_end", "type_of_violence", "conflict_name", "country", "latitude", "longitude", "where_prec", "best"]


def plants():
    src = open(os.path.join(ROOT, "src/data/commercialPlants.js"), encoding="utf8").read()
    out = re.findall(r"id: '([^']+)'.*?lat: (-?[\d.]+), lng: (-?[\d.]+)", src, re.S)
    assert len(out) >= 80, len(out)
    return [(pid, float(lat), float(lng)) for pid, lat, lng in out]


def km(a_lat, a_lng, b_lat, b_lng):
    p = math.pi / 180
    h = math.sin((b_lat - a_lat) * p / 2) ** 2 + math.cos(a_lat * p) * math.cos(b_lat * p) * math.sin((b_lng - a_lng) * p / 2) ** 2
    return 12742 * math.asin(math.sqrt(h))


def months_back(d, n):
    y, m = d.year, d.month - n + 1
    while m <= 0:
        m += 12
        y -= 1
    return date(y, m, 1)


def main(ged_path, cand_path, extract_date):
    with open(cand_path, encoding="utf8", newline="") as fh:
        window_end = max(r["date_start"][:10] for r in csv.DictReader(fh))
    end = date.fromisoformat(window_end)
    start = months_back(end, WINDOW_MONTHS).isoformat()
    pts = plants()
    rows = []
    for label, path, lo, hi in (("GED 26.1", ged_path, start, "2025-12-31"), ("Candidate 26.0.1-9", cand_path, "2026-01-01", window_end)):
        with open(path, encoding="utf8", newline="") as fh:
            for r in csv.DictReader(fh):
                d = r["date_start"][:10]
                if not (lo <= d <= hi) or r["where_prec"] in ("6", "7"):
                    continue
                lat, lng = float(r["latitude"]), float(r["longitude"])
                if any(km(lat, lng, pl, pg) <= EXTRACT_RADIUS_KM for _, pl, pg in pts):
                    rows.append({"dataset": label, **{k: r[k] for k in FIELDS[1:]}})
                    rows[-1]["date_start"] = r["date_start"][:10]
                    rows[-1]["date_end"] = r["date_end"][:10]
    rows.sort(key=lambda r: (r["date_start"], r["id"]))
    os.makedirs(os.path.join(ROOT, "data/ucdp"), exist_ok=True)
    with open(os.path.join(ROOT, "data/ucdp/ucdp-extract.csv"), "w", encoding="utf8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=FIELDS, lineterminator="\n")
        w.writeheader()
        w.writerows(rows)
    meta = {
        "extractDate": extract_date,
        "windowStart": start,
        "windowEnd": window_end,
        "windowMonths": WINDOW_MONTHS,
        "extractRadiusKm": EXTRACT_RADIUS_KM,
        "excludedWherePrec": [6, 7],
        "events": len(rows),
        "sources": [
            {"name": "UCDP Georeferenced Event Dataset (GED) Global version 26.1", "url": GED_URL, "covers": f"{start} to 2025-12-31"},
            {"name": "UCDP Candidate Events Dataset, January to September 2026", "url": CANDIDATE_URL, "covers": f"2026-01-01 to {window_end}"},
        ],
        "licence": "CC BY 4.0",
        "citation": "Sundberg, Ralph and Erik Melander (2013) Introducing the UCDP Georeferenced Event Dataset. Journal of Peace Research 50(4); Hegre et al. for the Candidate Events Dataset. Data: Uppsala Conflict Data Program, https://ucdp.uu.se",
    }
    with open(os.path.join(ROOT, "data/ucdp/extract-meta.json"), "w", encoding="utf8", newline="\n") as fh:
        json.dump(meta, fh, indent=2)
        fh.write("\n")
    print(json.dumps(meta, indent=2))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3])
