import PilotList from './PilotList';
interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <main className="-mt-32">
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <PilotList />
    </main>
  )
}


export default Main;

