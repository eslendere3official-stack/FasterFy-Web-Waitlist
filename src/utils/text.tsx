import React from "react";

/**
 * Splits a string and wraps words containing Spanish/accented letters
 * (á, é, í, ó, ú, ü, Á, É, Í, Ó, Ú, Ü) in a span using the Merriweather font.
 */
export function renderWithAccents(text: string | undefined): React.ReactNode {
  if (!text) return "";

  // Regular expression to match words containing at least one Spanish accented letter or ü
  // [a-zA-Z]*[áéíóúÁÉÍÓÚüÜ]+[a-zA-Z]*
  // We match word characters including accented ones: \w matches normal alphanumeric, let's use a specific character range
  // We can match any word-like sequence of characters that contains an accented character.
  // [A-Za-zÁÉÍÓÚáéíóúüÜñÑ]*[áéíóúÁÉÍÓÚüÜ]+[A-Za-zÁÉÍÓÚáéíóúüÜñÑ]*
  const regex = /(\b[A-Za-zÁÉÍÓÚáéíóúüÜñÑ]*[áéíóúÁÉÍÓÚüÜ]+[A-Za-zÁÉÍÓÚáéíóúüÜñÑ]*\b)/g;

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (/[áéíóúÁÉÍÓÚüÜ]/.test(part)) {
          return (
            <span key={index} className="font-serif italic tracking-normal">
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}
