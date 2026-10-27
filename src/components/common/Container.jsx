export default function Container({
  children,
  className = "",
  size = "default", // default (1600px), sm (3xl), md (5xl), lg (6xl), full
  as: Component = "div",
  ...props
}) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    default: "max-w-[1600px]",
    full: "max-w-full",
  };

  return (
    <Component
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size] || sizeClasses.default} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
