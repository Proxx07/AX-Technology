export const stringQueryCheck = (query: string, string: string | void) => {
  const q = query;
  return (s: string | void = string) => {
    if (!s) return true
    return s.toLowerCase().includes(q.toLowerCase())
  }
}
