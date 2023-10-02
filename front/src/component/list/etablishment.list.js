import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../context/mainContext";
export function EtablishmentList() {
  const { etablishmentList } = useContext(MainContext);

  const EtablishmentCard = (props) => {
    const answerElRef = useRef();
    const [state, setState] = useState(false);
    const [answerH, setAnswerH] = useState("0px");
    const { item, idx } = props;

    const handleOpenAnswer = () => {
      const answerElH = answerElRef.current.childNodes[0].offsetHeight;
      setState(!state);
      setAnswerH(`${answerElH + 20}px`);
    };

    return (
      <div className="space-y-3 mt-5 overflow-hidden border-b" key={idx}>
        <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
          {item.name}
          {state ? (
            <svg
              onClick={handleOpenAnswer}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4"
              />
            </svg>
          ) : (
            <svg
              onClick={handleOpenAnswer}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </h4>
        <div
          ref={answerElRef}
          className="duration-300"
          style={state ? { height: answerH } : { height: "0px" }}
        >
          <div>
            <button className="px-6 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg ml-4">
              <Link to={`/detail?id=${item._id}`}>Detail</Link>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="leading-relaxed max-w-screen-xl mt-12 px-4 md:px-8">
      <div className="mt-14 max-w-2xl">
        {etablishmentList &&
          etablishmentList.map((item, idx) => (
            <EtablishmentCard key={idx} idx={idx} item={item} />
          ))}
      </div>
    </section>
  );
}
