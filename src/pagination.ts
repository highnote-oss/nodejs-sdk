/**
 * Async iterator over Relay-style cursor-based connections.
 *
 * Wraps a page-fetching function so callers can write:
 * ```ts
 * for await (const item of paginate(fetchPage)) {
 *   console.log(item);
 * }
 * ```
 */

/** Shape of a Relay connection returned by Highnote. */
export interface RelayConnection<T> {
  edges?: Array<{ node?: T | null; cursor?: string | null } | null> | null;
  pageInfo?: {
    hasNextPage?: boolean;
    endCursor?: string | null;
  } | null;
}

export type PageFetcher<T> = (after?: string) => Promise<RelayConnection<T>>;

/**
 * Returns an async iterable that lazily fetches pages and yields individual
 * nodes. Supports `break` and early termination.
 *
 * ```ts
 * for await (const item of paginate(fetchPage)) {
 *   console.log(item);
 * }
 * ```
 */
export function paginate<T>(fetchPage: PageFetcher<T>): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator]() {
      let cursor: string | undefined;
      let done = false;
      let buffer: T[] = [];
      let bufferIndex = 0;

      return {
        async next(): Promise<IteratorResult<T>> {
          // Yield buffered items first
          if (bufferIndex < buffer.length) {
            return { value: buffer[bufferIndex++], done: false };
          }

          // Fetch next page
          while (!done) {
            const connection = await fetchPage(cursor);
            const edges = connection.edges ?? [];

            // Buffer all non-null nodes from this page
            buffer = [];
            bufferIndex = 0;
            for (const edge of edges) {
              if (edge?.node != null) {
                buffer.push(edge.node);
              }
            }

            // Advance cursor
            const newCursor = connection.pageInfo?.endCursor ?? undefined;
            if (connection.pageInfo?.hasNextPage && newCursor != null && newCursor === cursor) {
              // Cursor didn't advance — treat as done to prevent infinite loop
              done = true;
            } else {
              cursor = newCursor;
              done = !connection.pageInfo?.hasNextPage;
            }

            if (buffer.length > 0) {
              return { value: buffer[bufferIndex++], done: false };
            }

            // Empty page but more pages exist — continue loop
            if (done) break;
          }

          return { value: undefined as unknown as T, done: true };
        },
      };
    },
  };
}
