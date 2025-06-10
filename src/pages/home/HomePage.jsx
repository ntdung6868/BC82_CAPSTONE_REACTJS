import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  // Kiểm tra xem user có tồn tại hay không
  if (user) {
    return (
      <div>
        <h2>User exists!</h2>
        <p>Name: {user.hoTen}</p> {/* Giả sử user có thuộc tính name */}
        <p>Email: {user.email}</p> {/* Giả sử user có thuộc tính email */}
      </div>
    );
  } else {
    return <div>No user in store.</div>;
  }
};

export default HomePage;
