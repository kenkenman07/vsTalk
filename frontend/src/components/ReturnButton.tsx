import { ArrowLeftToLine } from "lucide-react";
import { Link } from "react-router-dom";

const ReturnButton = () => {
  return (
    <Link
      to="/"
      className="absolute left-7 top-6 sm:left-20 sm:top-10 flex gap-2"
    >
      <ArrowLeftToLine />
      戻る
    </Link>
  );
};
export default ReturnButton;
