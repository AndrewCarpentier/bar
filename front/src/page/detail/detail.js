import { SectionHeader } from "../../component/sectionHeader/sectionHeader";
import { useContext, useEffect, useState } from "react";
import { Product } from "../../component/product/product";
import { GetEtablishmentByEtablishmentId } from "../../api/etablishment";
import { UserList } from "../../component/list/user.list";
import { Header } from "../../component/header/header";
import { CommandList } from "../../component/list/command.list";
import { MainContext } from "../../context/mainContext";
import { Footer } from "../../component/footer/footer";
import QrcodePage from "../../component/qrcode/qrcode";
export default function Detail() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [number, setNumber] = useState(0);
  const { etablishment, setEtablishment } = useContext(MainContext);
  useEffect(() => {
    GetEtablishmentByEtablishmentId(urlParams.get("id")).then((value) => {
      setEtablishment(value);
    });
  }, [number, setEtablishment]);

  return (
    <div>
      <Header />
      <h3 className="text-gray-800 ml-96 text-3xl font-semibold sm:text-4xl">
        {etablishment && etablishment.name}
      </h3>
      <SectionHeader number={number} setNumber={setNumber} />
      {number === 0 && <CommandList />}
      {number === 1 && (
        <Product
          idEtablishment={etablishment._id}
          etablishment={etablishment}
        />
      )}
      {number === 2 && <UserList userList={etablishment.userList} />}
      {number === 3 && <QrcodePage />}
    </div>
  );
}
