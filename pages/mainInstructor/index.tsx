import MainInstructor from "./MainInstructor";
import ToasterProvider from '../providers/ToasterProvider';
const Index = () => {
  return (
    <div>
      <ToasterProvider />
      <MainInstructor title="Instructor" />
    </div>
  )
}

export default Index;
