// src/types/art.ts
// defining types for the required fields from the from response
export type Artwork = {
  id: number
  title: string | null
  place_of_origin: string | null
  artist_display: string | null
  inscriptions: string | null
  date_start: number | null
  date_end: number | null
}

export type ArtApiResponse = {
  data: Artwork[]
  pagination: {
    total: number
    limit: number
    offset: number
    total_pages: number
    current_page: number
  }
}
