// src/pages/ArtTable.tsx
import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Artwork } from '../types/art';
import { fetchArtworksPage } from '../lib/artApi';

// Local minimal event types compatible with DataTable
type PageEvent = { page?: number };
type SelectionChangeEvent<T> = { value?: T[] };

type Props = {
  selectedIds: Set<number>;
  selectMany: (rows: Artwork[]) => void;
  deselectMany: (rows: Artwork[]) => void;
  onError?: (msg: string) => void;
};

const ROWS_PER_PAGE = 12;

export default function ArtTable({ selectedIds, selectMany, deselectMany, onError }: Props) {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchArtworksPage(page)
      .then((res) => {
        if (!active) return;
        setRows(res.data);
        setTotalRecords(res.pagination.total);
      })
      .catch((e) => onError?.(e instanceof Error ? e.message : String(e)))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [page, onError]);

  // Compute selection for the current page by intersecting ids
  const pageSelected = useMemo(
    () => rows.filter((r) => selectedIds.has(r.id)),
    [rows, selectedIds]
  );

  function handlePage(e: PageEvent) {
    setPage((e.page ?? 0) + 1);
  }

  function handleSelectionChange(e: SelectionChangeEvent<Artwork>) {
    const next = new Set((e.value ?? []).map((r) => r.id));
    const toSelect = rows.filter((r) => next.has(r.id) && !selectedIds.has(r.id));
    const toDeselect = rows.filter((r) => !next.has(r.id) && selectedIds.has(r.id));
    if (toSelect.length) selectMany(toSelect);
    if (toDeselect.length) deselectMany(toDeselect);
  }

  return (
    <DataTable
      value={rows}
      loading={loading}
      paginator
      lazy
      first={(page - 1) * ROWS_PER_PAGE}
      rows={ROWS_PER_PAGE}
      totalRecords={totalRecords}
      onPage={handlePage}
      selectionMode="checkbox"
      selection={pageSelected}
      onSelectionChange={handleSelectionChange}
      dataKey="id"
      showGridlines
      stripedRows
      tableStyle={{ minWidth: '60rem' }}
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
      <Column field="title" header="Title" sortable />
      <Column field="place_of_origin" header="Origin" />
      <Column field="artist_display" header="Artist" />
      <Column field="inscriptions" header="Inscriptions" />
      <Column field="date_start" header="Start" />
      <Column field="date_end" header="End" />
    </DataTable>
  );
}
