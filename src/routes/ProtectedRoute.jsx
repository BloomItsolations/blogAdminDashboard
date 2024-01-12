import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div>
      {userInfo === null ? <Navigate to="/login" state={{ from: location }} replace /> : children}
    </div>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
