import { useId } from "react";
import "./Field.css";

/**
 * Labelled form control with floating-free, always-visible label.
 * as: "input" | "textarea" | "select"  (pass <option>s as children for select)
 */
export default function Field({
  label,
  name,
  as = "input",
  type = "text",
  required = false,
  hint,
  error,
  className = "",
  children,
  ...rest
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const Control = as;

  return (
    <div className={`field ${error ? "field--error" : ""} ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <Control
        id={id}
        name={name}
        className="field__control"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        {...(as === "input" && { type })}
        {...(as === "textarea" && { rows: 5 })}
        {...rest}
      >
        {as === "select" ? children : undefined}
      </Control>
      {hint && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}
