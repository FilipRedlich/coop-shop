import { Link, useNavigate } from "react-router-dom";
import { TEST_CAT } from "./Test";
// const buttonBuilder = (ARRAY_NAME) => {
//   //Creates buttons, adds classes and text to them
//   var button = document.createElement("button").cloneNode(true);
//   var clone = button.cloneNode(true);
//   var holder = document.querySelector(".categories");
//   let isExisting = document.querySelector(".cat-btn");

//   //Adding details to button
//   clone.classList.add(
//     "cat-btn",
//     "btn",
//     "categories-button",
//     "mb-2",
//     "mx-auto",
//     "text-white",
//     "bg-dark"
//   );

//   //console.log(button)
//   console.log(clone);

//   if (holder.contains(isExisting)) {
//     console.log("it exists so I wont add more buttons");
//     return;
//   }
//   if (!holder.contains(isExisting)) {
//     for (let i = 0; i < ARRAY_NAME.length; i++) {
//       clone.textContent = ARRAY_NAME[i];
//       holder.appendChild(clone.cloneNode(true));
//     }

//     return;
//   }
// };

const ButtonBuilder2 = (props) => {
  const catBtn = props.el;
  const navigate = useNavigate();
  return catBtn.map((el) => {
    console.log(el);
    return (
      <>
        <button
          className="categories---main--container-category"
          onClick={(e) => {
            // Navigate to a new route based on the trigger text
            if (el === "Podzespoły komputerowe") {
              navigate("/A");
            }
            if (el === "Komputery") {
              navigate("/B");
            }
          }}
        >
          {el}
        </button>
      </>
    );
  });
};
export { ButtonBuilder2 };
