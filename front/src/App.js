import { Outlet } from "react-router-dom";
import AuthProvider from "./provider/authProvider";
import MenuProvider from "./provider/menuProvider";
import MainProvider from "./provider/mainProvider";
function App() {
  return (
    <AuthProvider>
      <MainProvider>
        <MenuProvider>
          <Outlet />
        </MenuProvider>
      </MainProvider>
    </AuthProvider>
  );
}

export default App;
