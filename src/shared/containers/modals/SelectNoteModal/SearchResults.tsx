import { useNotes } from 'shared/api/hooks/useNotes';

import { NoteItem } from './NoteItem';

type Props = {
  query: string
}

export function SearchResults({ query = '' }: Props) {
  const {
    data,
    isLoading,
    isFetching,
    status,
  } = useNotes({
    filters: { query },
  });

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="search-status">
        Satus: {status} {isFetching && <span>fetching...</span>}
      </div>
      <div>
        <div className="search-result">
          {data && data.length > 0 ? (
            data.map((id) => (
              <NoteItem key={id} id={id} />
            ))
          ) : (
            <h3>No products found!</h3>
          )}
        </div>
      </div>
    </div>
  );
}
