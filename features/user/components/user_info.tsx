import { User } from "../types/user";

const UserInfo = (item: User) => {
  return <div>
    {item.name}
  </div>
}