function handleFileSelect(e) {
  let files = e.target.files
  let output = []

  for (let i = 0; i < files.length; i++) {
    let f = files[i]
    output.push(`
      <li>
        <strong>${f.name}</strong>
        (type: ${f.type || 'N/A'})
        - ${f.size / 1000} KB,
        last modified: ${f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'N/A'}
      </li>
    `)
  }
  document.getElementById('file-list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

document.getElementById('live-file-reader').addEventListener('change', handleFileSelect, false)