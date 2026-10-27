import {
  LuChevronDown as ChevronDown
} from "react-icons/lu";

export default function Select({
  label,
  options = [],
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  id,
  required = false,
  disabled = false,
  dark = false,
  placeholder,
  className = "",
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className={`block text-xs font-semibold uppercase tracking-wider ${
            dark ? "text-slate-300" : "text-slate-700 dark:text-slate-300"
          }`}
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon
              className="h-4 w-4 text-slate-400 dark:text-slate-400"
            />
          </div>
        )}

        <select
          id={selectId}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full appearance-none rounded-xl border text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 disabled:bg-slate-100 disabled:cursor-not-allowed ${
            Icon ? "pl-10" : "pl-3.5"
          } pr-10 py-2.5 sm:py-3 ${
            error
              ? "border-rose-300 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-rose-500/20"
              : dark
              ? "border-slate-800 bg-slate-900 text-white focus:border-[#C5A880] focus:ring-[#C5A880]/20"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] text-slate-800 dark:text-white focus:border-[#C5A880] focus:ring-[#C5A880]/20"
          }`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === "object" ? opt.value : opt;
            const labelText = typeof opt === "object" ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {labelText}
              </option>
            );
          })}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
          <ChevronDown
            className={`h-4 w-4 ${
              dark ? "text-slate-400" : "text-slate-400"
            }`}
          />
        </div>
      </div>

      {error && <p className="text-[11px] font-medium text-rose-600">{error}</p>}
      {!error && helperText && (
        <p className={`text-[11px] ${dark ? "text-slate-400" : "text-slate-500"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
