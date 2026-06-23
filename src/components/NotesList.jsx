import React from 'react';
import NoteItem from './NoteItem.jsx';

function formatGroupHeader(groupKey) {
  const [year, month] = groupKey.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);

  return date.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });
}

function NotesList({
  notes,
  onDelete,
  onArchive,
  dataTestId = 'notes-list',
  searchKeyword = '',
}) {
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  const groupedNotes = notes.reduce((groups, note) => {
    const createdAt = new Date(note.createdAt);
    const groupKey = `${createdAt.getFullYear()}-${String(
      createdAt.getMonth() + 1
    ).padStart(2, '0')}`;

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(note);
    return groups;
  }, {});

  return (
    <div
      className="notes-list notes-list--grouped"
      data-testid={dataTestId}
    >
      {Object.entries(groupedNotes).map(([groupKey, groupedItems]) => (
        <section
          key={groupKey}
          data-testid={`${groupKey}-group`}
          className="notes-group"
        >
          <div className="notes-group__header">
            <h3 className="notes-group__title">{formatGroupHeader(groupKey)}</h3>
            <span
              className="notes-group__count"
              data-testid={`${groupKey}-group-count`}
            >
              {groupedItems.length} catatan
            </span>
          </div>
          <div className="notes-group__items">
            {groupedItems.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
