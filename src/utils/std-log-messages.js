exports.sayFilesChecked = (type, count, apply) =>
    `${apply ? 'Fixed' : 'Checked'} ${type} ${count} file(s)`

exports.sayNoFiles = (pattern, staged) =>
    `No matching ${staged ? 'staged ' : ''}files for pattern "${pattern}"`
