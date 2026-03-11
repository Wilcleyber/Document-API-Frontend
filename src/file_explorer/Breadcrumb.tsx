import React from "react";

interface BreadcrumbProps {
  path: string[];
  onNavigate: (index: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate }) => {
  return (
    <nav style={{ marginBottom: "10px" }}>
      {path.map((folder, index) => (
        <span key={index}>
          <button onClick={() => onNavigate(index)}>{folder}</button>
          {index < path.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
