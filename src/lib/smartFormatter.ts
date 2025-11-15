export function smartFormat(raw: string) {
  let text = raw;

  text = text.replace(/(\d+\.)\s+(?=[A-Z])/g, "\n\n$1 ");

  text = text
    .replace(/Volume 24h:/gi, "- **Volume 24h:**")
    .replace(/Price \(YES\):/gi, "- **Price (YES):**")
    .replace(/Price:/gi, "- **Price:**")
    .replace(/Market Cap:/gi, "- **Market Cap:**")
    .replace(/Liquidity:/gi, "- **Liquidity:**")
    .replace(/24h Change:/gi, "- **24h Change:**");

  text = text.replace(/:\s*"\s*(?=\n|$)/g, ": ");

  text = text.replace(/\s"\s/g, " ");

  text = text.replace(/(\n)?(\d+\.)/g, "\n\n$2");

  text = text.replace(/\n{3,}/g, "\n\n");

  // text = text.replace(/('|")/g, "");

  text = text.trim();

  return text;
}
