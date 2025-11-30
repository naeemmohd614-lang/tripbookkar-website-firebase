
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
  queryEqual,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
export type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useCollection hook.
 * @template T Type of the document data.
 */
export interface UseCollectionResult<T> {
  data: WithId<T>[] | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

// Internal private properties of a Firestore Query object.
// This is not part of the public API and might change, but it's used
// here to create a stable key for memoization.
export interface InternalQuery extends Query<DocumentData> {
  _query: {
    path: {
      canonicalString(): string;
    };
    filters: {
      field: {
        canonicalString(): string;
      };
      op: string;
      value: any;
    }[];
    orderBy: {
      field: {
        canonicalString(): string;
      };
      dir: string;
    }[];
    limit: number | null;
  };
}

function getQueryPath(query: Query<DocumentData> | CollectionReference<DocumentData>): string {
    if (query.type === 'collection') {
        return (query as CollectionReference).path;
    }
    
    // Attempt to get a stable string representation for a query
    try {
        const internalQuery = (query as InternalQuery);
        const path = internalQuery._query.path.canonicalString();

        const filters = internalQuery._query.filters.map(f => `${f.field.canonicalString()}${f.op}${JSON.stringify(f.value)}`).join(',');
        const orderBy = internalQuery._query.orderBy.map(o => `${o.field.canonicalString()}:${o.dir}`).join(',');
        const limit = internalQuery._query.limit;

        return `${path}|${filters}|${orderBy}|${limit || ''}`;
    } catch {
        // Fallback for different structures or versions
        return `unserializable-query-${Date.now()}`;
    }
}

/**
 * Custom hook to store the previous value of a prop or state.
 * @param value The value to track.
 * @returns The value from the previous render.
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}


/**
 * React hook to subscribe to a Firestore collection or query in real-time.
 * Handles nullable references/queries.
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {CollectionReference<DocumentData> | Query<DocumentData> | null | undefined} targetRefOrQuery -
 * The Firestore CollectionReference or Query. Waits if null/undefined.
 * @returns {UseCollectionResult<T>} Object with data, isLoading, error.
 */
export function useCollection<T = any>(
    targetRefOrQuery: ((CollectionReference<DocumentData> | Query<DocumentData>))  | null | undefined,
): UseCollectionResult<T> {
  type ResultItemType = WithId<T>;
  type StateDataType = ResultItemType[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  const prevQuery = usePrevious(targetRefOrQuery);

  useEffect(() => {
    // If the query is null or hasn't changed, do nothing.
    if (!targetRefOrQuery || (prevQuery && queryEqual(targetRefOrQuery, prevQuery))) {
      // If there's no query, set loading to false.
      if (!targetRefOrQuery) {
          setData(null);
          setIsLoading(false);
          setError(null);
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      targetRefOrQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const results: ResultItemType[] = snapshot.docs.map(doc => ({
          ...(doc.data() as T),
          id: doc.id,
        }));
        setData(results);
        setError(null);
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        const path = getQueryPath(targetRefOrQuery);
        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path,
        });

        setError(contextualError);
        setData(null);
        setIsLoading(false);
        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [targetRefOrQuery, prevQuery]);

  return { data, isLoading, error };
}
