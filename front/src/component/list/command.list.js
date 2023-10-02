import { useContext, useEffect } from "react";
import { MainContext } from "../../context/mainContext";
import { UpdateEtablishment } from "../../api/etablishment";
export function CommandList() {
  const { etablishment, setCommandList, commandList } = useContext(MainContext);
  useEffect(() => {
    if (etablishment) {
      setCommandList(etablishment.commandList);
    }
  }, [etablishment]);

  function validate(index) {
    const list = [];
    etablishment.commandList.map((c, idx) => {
      if (idx === index) {
        c.validate = true;
      }
      list.push(c);
    });
    setCommandList(list);
    UpdateEtablishment(etablishment);
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="mt-12 relative h-max overflow-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 pr-6">table</th>
              <th className="py-3 pr-6">status</th>
              <th className="py-3 pr-6">price</th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {etablishment &&
              commandList &&
              commandList.map((item, idx) => (
                <tr key={idx}>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.table}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-2 rounded-full font-semibold text-xs ${
                        item.validate
                          ? "text-green-600 bg-green-50"
                          : "text-yellow-600 bg-yellow-50"
                      }`}
                    >
                      {item.validate ? "Validate" : "Not validate"}
                    </span>
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.price}€</td>
                  <td className="text-right whitespace-nowrap">
                    <button
                      onClick={() => validate(idx)}
                      disabled={item.validate}
                      className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                    >
                      Validate
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
