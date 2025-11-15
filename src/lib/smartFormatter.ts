export function smartFormat(raw: string, title: string) {
  if (title === "DMJ CHAT") {
    return raw;
  }
  let text = raw;

  // 1. Fix markets concatenated into one line:
  //    Turns: "1. Item ... 2. Item"
  //    Into:  "\n\n1. Item\n\n2. Item"
  text = text.replace(/(\d+\.)\s+(?=[A-Z])/g, "\n\n$1 ");

  // 2. Convert key-value pairs into bullet points
  text = text
    .replace(/Volume 24h:/gi, "- **Volume 24h:**")
    .replace(/Price \(YES\):/gi, "- **Price (YES):**")
    .replace(/Price:/gi, "- **Price:**")
    .replace(/Market Cap:/gi, "- **Market Cap:**")
    .replace(/Liquidity:/gi, "- **Liquidity:**")
    .replace(/24h Change:/gi, "- **24h Change:**");

  // 3. Remove dangling quotes after values
  //    Example: `Price (YES): "`
  text = text.replace(/:\s*"\s*(?=\n|$)/g, ": ");

  // 4. Remove stray quotes between spaces
  text = text.replace(/\s"\s/g, " ");

  // 5. Ensure each list item gets its own block
  text = text.replace(/(\n)?(\d+\.)/g, "\n\n$2");

  // 6. Normalize spacing: trim multiple blank lines
  text = text.replace(/\n{3,}/g, "\n\n");

  // 7. Trim edges
  text = text.trim();

  return text;
}
