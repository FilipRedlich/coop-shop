import { RenderSubcat } from "../utility/RenderScripts";
function RootSubcategories({subcatNames}) {
    return (
      <div className="root-subcategories">
        {subcatNames.map((subcatName, index) => (
          <RenderSubcat key={index} subcatName={subcatName} />
        ))}
      </div>
    );
  }