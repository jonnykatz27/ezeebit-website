function handler(event) {
  var request = event.request
  var host = request.headers.host && request.headers.host.value
  var uri = request.uri || '/'

  var parts = []
  var qs = request.querystring || {}
  for (var key in qs) {
    var entry = qs[key]
    if (entry.multiValue) {
      for (var i = 0; i < entry.multiValue.length; i++) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(entry.multiValue[i].value))
      }
    } else if (entry.value !== undefined) {
      parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(entry.value))
    }
  }
  var search = parts.length ? '?' + parts.join('&') : ''

  // One host. www is not a second site.
  if (host === 'www.ezeebit.com') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://ezeebit.com' + uri + search },
        'cache-control': { value: 'public, max-age=86400' },
      },
    }
  }

  // One URL shape: no trailing slash, except the root.
  if (uri.length > 1 && uri.charAt(uri.length - 1) === '/') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://ezeebit.com' + uri.replace(/\/+$/, '') + search },
        'cache-control': { value: 'public, max-age=86400' },
      },
    }
  }

  // S3 REST origins do not map /in-store to /in-store/index.html.
  if (uri === '/') {
    request.uri = '/index.html'
  } else if (uri.lastIndexOf('.') <= uri.lastIndexOf('/')) {
    request.uri = uri + '/index.html'
  }

  return request
}
