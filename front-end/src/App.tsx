import { Header } from './components/Header';
import { MainSection } from './components/MainSection';

export function App() {
  return (
    <div className="font-custom bg-main h-screen">
      <Header />
      <div className="grid grid-cols-aside-main gap-4 ">
        <MainSection />
      </div>
    </div>
  );
}
