import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import { useLoading } from "@/context/LoadingContext";

const Loading = () => {
  const navigate = useNavigate();
  const { setInitialLoadComplete } = useLoading();

  const handleComplete = () => {
    setInitialLoadComplete(true);
    navigate("/");
  };

  return <LoadingScreen onComplete={handleComplete} />;
};

export default Loading;