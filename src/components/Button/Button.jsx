export const Button = ({ className, children, type }) => {
  return (
    <button
      type={type}
      className={`${className} px-4 py-2 font-bold uppercase tracking-widest`}
    >
      {children}
    </button>
  );
};
