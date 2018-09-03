export function UnmatchedCmp(errMsg: string) {
  return `
    <unmatched>
      <h1>Unmatched</h1>
      <span>${errMsg}</span>
    </unmatched>
  `;
}
