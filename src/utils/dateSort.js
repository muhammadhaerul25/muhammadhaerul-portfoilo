const MONTHS = {
  jan: 0, january: 0, januari: 0,
  feb: 1, february: 1, februari: 1,
  mar: 2, march: 2, maret: 2,
  apr: 3, april: 3,
  may: 4, mei: 4,
  jun: 5, june: 5, juni: 5,
  jul: 6, july: 6, juli: 6,
  aug: 7, august: 7, agustus: 7, agu: 7,
  sep: 8, sept: 8, september: 8,
  oct: 9, october: 9, oktober: 9, okt: 9,
  nov: 10, november: 10, nopember: 10,
  dec: 11, december: 11, desember: 11, des: 11
};

function parseFlexDateScore(raw) {
  if (!raw) return 0;
  if (raw instanceof Date) return raw.getTime();
  const s = String(raw).trim();
  if (!s) return 0;
  if (/present|current|now|sekarang/i.test(s)) return Date.UTC(2099, 11, 31);

  const mFull = s.match(/([a-zA-Z]+)\s+(\d{1,2}),?\s+(\d{4})/);
  if (mFull && MONTHS[mFull[1].toLowerCase()] !== undefined) {
    return Date.UTC(parseInt(mFull[3], 10), MONTHS[mFull[1].toLowerCase()], parseInt(mFull[2], 10));
  }

  const mDayMonthYear = s.match(/(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})/);
  if (mDayMonthYear && MONTHS[mDayMonthYear[2].toLowerCase()] !== undefined) {
    return Date.UTC(parseInt(mDayMonthYear[3], 10), MONTHS[mDayMonthYear[2].toLowerCase()], parseInt(mDayMonthYear[1], 10));
  }

  const mMonthYear = s.match(/([a-zA-Z]+)\s+(\d{4})/);
  if (mMonthYear && MONTHS[mMonthYear[1].toLowerCase()] !== undefined) {
    return Date.UTC(parseInt(mMonthYear[2], 10), MONTHS[mMonthYear[1].toLowerCase()], 1);
  }

  const mIso = s.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?/);
  if (mIso) {
    return Date.UTC(parseInt(mIso[1], 10), parseInt(mIso[2], 10) - 1, mIso[3] ? parseInt(mIso[3], 10) : 1);
  }

  const parsed = Date.parse(s);
  if (!isNaN(parsed)) return parsed;

  const mYear = s.match(/\b(19|20)\d{2}\b/);
  if (mYear) return Date.UTC(parseInt(mYear[0], 10), 0, 1);

  return 0;
}

function sortByDateDesc(items, dateField = 'date') {
  if (!Array.isArray(items)) return [];
  return items.slice().sort((a, b) => {
    const scoreA = parseFlexDateScore(a && a[dateField]);
    const scoreB = parseFlexDateScore(b && b[dateField]);
    if (scoreA !== scoreB) return scoreB - scoreA;
    const sortA = (a && typeof a.sort_order === 'number') ? a.sort_order : 9999;
    const sortB = (b && typeof b.sort_order === 'number') ? b.sort_order : 9999;
    if (sortA !== sortB) return sortA - sortB;
    const createdA = a && a.created_at ? new Date(a.created_at).getTime() : 0;
    const createdB = b && b.created_at ? new Date(b.created_at).getTime() : 0;
    return createdB - createdA;
  });
}

function sortExperiencesByDateDesc(items) {
  if (!Array.isArray(items)) return [];
  return items.slice().sort((a, b) => {
    const endA = (a && (a.is_current || /present/i.test(a.end_date || ''))) ? Date.UTC(2099, 11, 31) : parseFlexDateScore((a && a.end_date) || (a && a.start_date));
    const endB = (b && (b.is_current || /present/i.test(b.end_date || ''))) ? Date.UTC(2099, 11, 31) : parseFlexDateScore((b && b.end_date) || (b && b.start_date));
    if (endA !== endB) return endB - endA;
    const startA = parseFlexDateScore(a && a.start_date);
    const startB = parseFlexDateScore(b && b.start_date);
    if (startA !== startB) return startB - startA;
    return ((a && a.sort_order) || 0) - ((b && b.sort_order) || 0);
  });
}

module.exports = {
  parseFlexDateScore,
  sortByDateDesc,
  sortExperiencesByDateDesc
};

