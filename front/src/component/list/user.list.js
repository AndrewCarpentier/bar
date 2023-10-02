import { useContext } from "react";
import { CreateTeamMemberForm } from "../form/createTeamMember";
import { MainContext } from "../../context/mainContext";
import { DeleteUser } from "../../api/etablishment";
export function UserList({ userList }) {
  const { setEtablishment, etablishment } = useContext(MainContext);
  async function deleteUser(idx) {
    const etablishmentUpdated = await DeleteUser(etablishment, idx);
    setEtablishment(etablishmentUpdated);
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <CreateTeamMemberForm />
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Team members
        </h3>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Position</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {userList.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.role}</td>
                <button
                  onClick={() => deleteUser(idx)}
                  className="px-6 py-4 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
