exports.sayFilesChecked = (type, count, apply) =>
    `${apply ? 'Fixed' : 'Checked'} ${type} ${count} file(s)`

exports.sayNoFiles = (type, pattern, staged) =>
    `No matching ${
        staged ? 'staged ' : ''
    }${type} files for pattern "${pattern}"`
