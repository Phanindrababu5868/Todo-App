import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      <Header />
      {isLoading && <div>Loading...</div>}
      <Outlet />
    </div>
  );
};

export default AppLayout;
