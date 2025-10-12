// src/lib/artApi.ts
import type { ArtApiResponse } from '../types/art'

const BASE = 'https://api.artic.edu/api/v1/artworks'

// fetch only one page of results
// page number starting at 1, to support pagination
// and to avoid off by one errors
// and then return data as ArtApiResponse type

export async function fetchArtworksPage(page: number): Promise<ArtApiResponse> {
  const res = await fetch(`${BASE}?page=${page}`)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`HTTP ${res.status}: ${text}`)
  }
  return (await res.json()) as ArtApiResponse
}
