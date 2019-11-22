exports.sayFilesChecked = (type, count, apply) =>
    `${apply ? 'Formatted' : 'Checked'} ${count} ${type} file(s)`

exports.sayNoFiles = (type, pattern, staged) =>
    `No matching ${
        staged ? 'staged ' : ''
    }${type} files for pattern "${pattern}"`
