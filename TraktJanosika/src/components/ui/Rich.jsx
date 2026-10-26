/** Renders copy where *asterisks* mark an italic accent:
 *  <Rich text="Osiem domów w rytmie *Podhala*" /> */
export default function Rich({ text }) {
  if (!text) return null;
  return text
    .split(/(\*[^*]+\*)/g)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <em key={i}>{part.slice(1, -1)}</em>
      ) : (
        part
      )
    );
}
