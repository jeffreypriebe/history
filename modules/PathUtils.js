export const addLeadingSlash = (path) =>
  path.charAt(0) === '/' ? path : '/' + path

export const stripLeadingSlash = (path) =>
  path.charAt(0) === '/' ? path.substr(1) : path

export const hasBasename = (path, prefix) => 
  (new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i')).test(path)

export const stripBasename = (path, prefix) =>
  hasBasename(path, prefix) ? path.substr(prefix.length) : path

export const stripTrailingSlash = (path) =>
  path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path

export const parsePath = (path) => {
  let pathname = path || '/'
  let search = ''
  let hash = ''

  const hashIndex = pathname.indexOf('#')
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex)
    pathname = pathname.substr(0, hashIndex)
  }

  const searchIndex = pathname.indexOf('?')
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex)
    pathname = pathname.substr(0, searchIndex)
  }
  
  pathname = decodeURI(pathname)

  return {
    pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  }
}

export const createPath = (location) => {
  const { pathname, search, hash } = location

  let path = encodeURI(pathname || '/')

  if (search && search !== '?')
    path += (search.charAt(0) === '?' ? search : `?${search}`)

  if (hash && hash !== '#')
    path += (hash.charAt(0) === '#' ? hash : `#${hash}`)

  return path
}
