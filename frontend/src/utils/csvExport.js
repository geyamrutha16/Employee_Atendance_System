export const downloadCSV = (filename, rows) => {
    const header = Object.keys(rows[0] || {}).join(',');
    const csv = rows.map(r => Object.values(r).map(v => `"${(v || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([header + '\n' + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
};
