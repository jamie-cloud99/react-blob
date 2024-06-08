import PropTypes from "prop-types";

export const Text = ({children}) => {
  return (
    <p className="text-4xl bg-emerald-200">{children}</p>
  )
}


Text.propTypes = {
  children: PropTypes.string
}