import { CreateEtablishmentForm } from "../../component/form/createEtablishment.form";
import { EtablishmentList } from "../../component/list/etablishment.list";
import { Header } from "../../component/header/header";
import { Footer } from "../../component/footer/footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { MainContext } from "../../context/mainContext";
import { GetEtablishmentsByUserId } from "../../api/etablishment";
export default function Homepage() {
  const { user } = useContext(AuthContext);
  const { setEtablishmentList } = useContext(MainContext);
  useEffect(() => {
    if (user) {
      console.log({user})
      GetEtablishmentsByUserId(user._id).then((values) => {
        console.log(values)
        setEtablishmentList(values);
      });
    }
  }, [user]);
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col min-h-screen">
          <Header />
          <CreateEtablishmentForm />
          <EtablishmentList />
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
