import { useState } from 'react';
import type { Artwork } from '../types/art';

export function useRowSelection() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectedRows, setSelectedRows] = useState<Map<number, Artwork>>(new Map());

  function selectMany(rows: Artwork[]) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const r of rows) next.add(r.id);
      return next;
    });
    setSelectedRows((prev) => {
      const next = new Map(prev);
      for (const r of rows) next.set(r.id, r);
      return next;
    });
  }

  function deselectMany(rows: Artwork[]) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const r of rows) next.delete(r.id);
      return next;
    });
    setSelectedRows((prev) => {
      const next = new Map(prev);
      for (const r of rows) next.delete(r.id);
      return next;
    });
  }

  function clearAll() {
    setSelectedIds(new Set());
    setSelectedRows(new Map());
  }

  return { selectedIds, selectedRows, selectMany, deselectMany, clearAll };
}
