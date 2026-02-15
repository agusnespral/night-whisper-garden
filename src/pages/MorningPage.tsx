import MorningScreen from '@/components/MorningScreen';
import BottomNav from '@/components/BottomNav';
import { useDreams } from '@/hooks/useDreams';

const MorningPage = () => {
  const { addDream } = useDreams();

  return (
    <>
      <MorningScreen onSave={addDream} />
      <BottomNav />
    </>
  );
};

export default MorningPage;
