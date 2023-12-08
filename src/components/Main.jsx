import PropTypes from "prop-types";

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

function Main({ children }) {
  return <main className="main">{children}</main>;
}

export default Main;
