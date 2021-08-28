import React from "react";
import { useSelector } from "react-redux";

export default function Home(props) {
  const userLogin = useSelector(
    (state) => state.UserLoginCyberBugsReducer.userLogin
  );
  return (
    <div>
      {/* ? : Nếu nó có giá trị thì nó load ra những trường này , còn kh có giá trị thì lần đầu tiên kh có, khi nào lấy về có mới lấy giá trị */}
      {userLogin?.name}
      <img src={userLogin?.avatar} alt={userLogin.name} />
    </div>
  );
}
